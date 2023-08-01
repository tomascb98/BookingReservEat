package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.dto.PageResponseDTO;
import ProyectoIntegrador.BookingRestaurantes.dto.RequestRestaurantDTO;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.ImagesS3Service;
import ProyectoIntegrador.BookingRestaurantes.service.RestaurantService;
import ProyectoIntegrador.BookingRestaurantes.service.RestaurantServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/Restaurants")
@AllArgsConstructor
//@CrossOrigin(origins = "*")

public class RestaurantRestController {

    private final RestaurantService restaurantService;
    private final RestaurantServiceImpl restaurantServiceImpl;
    private final ImagesS3Service imagesS3Service;

   // @Operation(summary = "Add a new restaurant",
   //         responses = {
   //                 @ApiResponse(responseCode = "201", description = "Restaurant created",
   //                         content = @Content(mediaType = "application/json", schema = @Schema(ref = "#/components/schemas/Map"))),
   //                 @ApiResponse(responseCode = "409", description = "Restaurant already exists",
   //                         content = @Content(mediaType = "application/json", schema = @Schema(ref = "#/components/schemas/Error")))})
    @PostMapping()
    public ResponseEntity<Map<String, String>> saveRestaurant(@RequestParam("fileImages") List<MultipartFile> fileImages,
                                                              @RequestParam("name") String name,
                                                              @RequestParam("description") String description,
                                                              @RequestParam("address") String address,
                                                              @RequestParam("cityId") Long cityId,
                                                              @RequestParam("categoryId") Long categoryId,
                                                              @RequestParam("ruleIds") List<Long> ruleIds,
                                                              @RequestParam("policyIds") List<Long> policyIds,
                                                              @RequestParam("ratings") List<Integer> ratings,
                                                              @RequestParam("featureIds") List<Long> featureIds,
                                                              @RequestParam("reservations") List<Long> reservations
                                                              ) {
        List<String> imagesUrl=imagesS3Service.uploadFile(fileImages);
        RestaurantDTO restaurantDTO = RestaurantDTO.builder().name(name)
                .description(description)
                        .address(address)
                                .city_id(cityId)
                                        .category_id(categoryId)
                                                .urlImages(imagesUrl)
                                                        .rule_ids(ruleIds)
                                                                .policy_ids(policyIds)
                                                                        .ratings(ratings)
                                                                                .feature_ids(featureIds)
                                                                                    .reservations(reservations)
                                                                                        .build();

        restaurantServiceImpl.saveRestaurant(restaurantDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RESTAURANT_CREATED_MESSAGE));
    }
    @PostMapping("/{idRestaurant}/{rating}")
    public ResponseEntity<Map<String, String>> rateRestaurant(@PathVariable Long idRestaurant, @PathVariable Integer rating) {
        restaurantServiceImpl.rateRestaurant(idRestaurant, rating);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RESTAURANT_RATED_MESSAGE));
    }
    @GetMapping("/{name}")
    public ResponseEntity<Optional<RestaurantDTO>> getRestaurantByName(@PathVariable String name){
        return ResponseEntity.ok(restaurantServiceImpl.getRestaurantByName(name));
    }
    @Operation(summary = "Get average restaurant",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Restaurant returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Restaurant not found id name provided", content = @Content)})
    @GetMapping("/rating/{idRestaurant}")
    public ResponseEntity<Double> getAverageRestaurant(@PathVariable Long idRestaurant) {
        return ResponseEntity.ok(restaurantServiceImpl.getAverageRating(idRestaurant));
    }
    @GetMapping("/city/{idCity}")
    public ResponseEntity<List<RestaurantDTO>> findRestaurantByIdCity(@PathVariable Long idCity) {
        return ResponseEntity.ok(restaurantServiceImpl.getRestaurantsDTOByCity(idCity));
    }
    @GetMapping("/category/{idCategory}")
    public ResponseEntity<List<RestaurantDTO>> findRestaurantByCategory(@PathVariable Long idCategory) {
        return ResponseEntity.ok(restaurantServiceImpl.getRestaurantDTOByCategory(idCategory));
    }
    @GetMapping("/pages")
    public PageResponseDTO<RestaurantDTO> getRestaurants(@PageableDefault(size = 3,page = 0) @ParameterObject Pageable pageable) {
        return restaurantService.getRestaurantsByPage(pageable);
    }
    @DeleteMapping("/{name}")
    public ResponseEntity<Map<String, String>> deleteRestaurantByName(@PathVariable String name) {
        restaurantServiceImpl.deleteRestaurantByName(name);
        return ResponseEntity.ok(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RESTAURANT_DELETED_MESSAGE));
    }
    @PutMapping()
    public ResponseEntity<Map<String, String>> updateRestaurant(@RequestParam("fileImages") List<MultipartFile> fileImages,
                                                                @RequestParam("name") String name,
                                                                @RequestParam("description") String description,
                                                                @RequestParam("address") String address,
                                                                @RequestParam("cityId") Long cityId,
                                                                @RequestParam("categoryId") Long categoryId) {
        List<String> imagesUrl=imagesS3Service.uploadFile(fileImages);
        RestaurantDTO restaurantDTO = RestaurantDTO.builder().name(name)
                .description(description)
                .address(address)
                .city_id(cityId)
                .category_id(categoryId)
                .urlImages(imagesUrl)
                .build();

        restaurantServiceImpl.updateRestaurant(restaurantDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RESTAURANT_UPDATED_MESSAGE));
    }
    @GetMapping()
    public ResponseEntity<List<RestaurantDTO>> getAllRestaurants(){
        return ResponseEntity.ok(restaurantServiceImpl.getAllRestaurants());
    }
    @Operation(summary = "Get all restaurants without reserves",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Restaurants returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Restaurants not found", content = @Content)})
    @GetMapping("/all")
    public ResponseEntity<List<RestaurantDTO>> getAllRestaurantsWithOutReserves(@RequestBody RequestRestaurantDTO requestRestaurantDTO){
        return ResponseEntity.ok(restaurantServiceImpl.getRestaurantWithOutReserves(requestRestaurantDTO));
    }

}
