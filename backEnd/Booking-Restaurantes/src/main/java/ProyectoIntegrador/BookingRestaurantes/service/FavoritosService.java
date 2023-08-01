package ProyectoIntegrador.BookingRestaurantes.service;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;

import java.util.List;

public interface FavoritosService {
    void agregarRestauranteFavorito(Long userId, Long restaurantId);
    // Otros métodos relacionados con los favoritos
    List<RestaurantDTO> listFavorites(Long userId);
    void deleteFromFavorite(Long userId, Long restaurantId);

}

