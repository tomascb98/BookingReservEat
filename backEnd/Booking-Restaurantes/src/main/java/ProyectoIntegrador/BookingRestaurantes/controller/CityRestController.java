package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.domain.City;
import ProyectoIntegrador.BookingRestaurantes.domain.Restaurant;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.CityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/Cities")
@AllArgsConstructor
public class CityRestController {
    private CityService cityService;

    @PostMapping()
    public ResponseEntity<Map<String, String>> saveCity(@RequestBody City city) {
        cityService.saveCity(city);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.CITY_CREATED_MESSAGE));
    }

    @GetMapping("/{name}")
    public ResponseEntity<Optional<City>> getCityByName(@PathVariable String name){
        return ResponseEntity.ok(cityService.getCityByName(name));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Map<String, String>> deleteCityByName(@PathVariable String name) {
        cityService.deleteCityByName(name);
        return ResponseEntity.ok(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.CITY_DELETED_MESSAGE));
    }
    @PutMapping()
    public ResponseEntity<Map<String, String>> updateCity(@RequestBody City city) {
        cityService.updateCity(city);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.CITY_UPDATED_MESSAGE));
    }
    @GetMapping()
    public ResponseEntity<List<City>> getAllCities(){
        return ResponseEntity.ok(cityService.getAllCities());
    }
}
