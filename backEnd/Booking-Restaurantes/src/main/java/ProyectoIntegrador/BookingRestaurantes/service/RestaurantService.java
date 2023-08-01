package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.dto.PageResponseDTO;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RestaurantService {
    List<RestaurantDTO> getRestaurantDTOByCategory(Long idCategory);
    List<RestaurantDTO> getRestaurantsDTOByCity(Long idCity);
    PageResponseDTO<RestaurantDTO> getRestaurantsByPage(Pageable pageable);
}
