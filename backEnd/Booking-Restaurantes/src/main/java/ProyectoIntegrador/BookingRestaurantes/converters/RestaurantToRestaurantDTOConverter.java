package ProyectoIntegrador.BookingRestaurantes.converters;

import ProyectoIntegrador.BookingRestaurantes.domain.Restaurant;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class RestaurantToRestaurantDTOConverter implements Converter<Restaurant, RestaurantDTO> {


    @Override
    public RestaurantDTO convert(Restaurant source) {
        RestaurantDTO restaurantDTO = new RestaurantDTO();

        restaurantDTO.setId(source.getId());
        restaurantDTO.setName(source.getName());
        restaurantDTO.setDescription(source.getDescription());
//        restaurantDTO.setUrlImage(source.getUrlImage());
        restaurantDTO.setAddress(source.getAddress());
        restaurantDTO.setCity_id(source.getCity().getId());
        restaurantDTO.setCategory_id(source.getCategory().getId());
        restaurantDTO.setCity(source.getCity().getName());
        restaurantDTO.setCategory(source.getCategory().getName());

        return restaurantDTO;
    }
}


