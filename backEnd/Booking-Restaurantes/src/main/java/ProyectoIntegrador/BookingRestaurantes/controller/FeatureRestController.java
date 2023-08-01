package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.domain.Feature;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.FeatureServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/Features")
@AllArgsConstructor
public class FeatureRestController {

    private final FeatureServiceImpl featureService;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },
            summary = "Add a new feature",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Feature created", content = @Content),
                    @ApiResponse(responseCode = "409", description = "Feature already exists", content = @Content),
                    @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})

    @PostMapping()
    public ResponseEntity<Map<String, String>> saveFeature(@RequestBody Feature feature) {
        featureService.saveFeature(feature);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.FEATURE_CREATED_MESSAGE));
    }
    @Operation(summary = "Get a feature by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Feature returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Feature not found with id provided", content = @Content)})

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Feature>> getFeatureById(@PathVariable Long id){
        return ResponseEntity.ok(featureService.getFeatureById(id));
    }
    @Operation(summary = "Delete a feature by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Feature removed successfully", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Feature not found with id provided", content = @Content),
                    @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteFeatureById(@PathVariable Long id) {
        featureService.deleteFeatureById(id);
        return ResponseEntity.ok(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.FEATURE_DELETED_MESSAGE));
    }

    @Operation(summary = "Get all Features",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Features returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Features not found", content = @Content)})

    @GetMapping("/all")
    public ResponseEntity<List<Feature>> getAllFeatures(){
        return ResponseEntity.ok(featureService.getAllFeatures());
    }
}
