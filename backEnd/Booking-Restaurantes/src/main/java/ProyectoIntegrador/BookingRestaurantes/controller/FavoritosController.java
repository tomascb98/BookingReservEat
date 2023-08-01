package ProyectoIntegrador.BookingRestaurantes.controller;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import ProyectoIntegrador.BookingRestaurantes.service.FavoritosService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/favorites")
public class FavoritosController {

    private final FavoritosService favoritosService;

    @GetMapping("/all/{userId}")
    public List<RestaurantDTO> listFavorites(@PathVariable Long userId){
        return favoritosService.listFavorites(userId);
    }

    @PostMapping("/{userId}/{restaurantId}")
    public ResponseEntity<String> agregarRestauranteFavorito(@PathVariable Long userId, @PathVariable Long restaurantId) {
        favoritosService.agregarRestauranteFavorito(userId, restaurantId);
        return ResponseEntity.ok("Restaurant added to favorites!");
    }

    @DeleteMapping("/delete/{userId}/{restaurantId}")
    public ResponseEntity<String> deleteFromFavorites(@PathVariable Long userId, @PathVariable Long restaurantId){
        favoritosService.deleteFromFavorite(userId, restaurantId);
        return ResponseEntity.ok("Restaurant deleted from favorites");
    }

}

