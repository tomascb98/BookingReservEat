package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.converters.RestaurantToRestaurantDTOConverter;
import ProyectoIntegrador.BookingRestaurantes.domain.Restaurant;
import ProyectoIntegrador.BookingRestaurantes.domain.User;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.RestaurantNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.UserNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.repository.IRestaurantRepository;
import ProyectoIntegrador.BookingRestaurantes.repository.IUserRepository;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.xml.transform.Result;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FavoriteServiceImpl implements FavoritosService {

    public static final Logger logger= Logger.getLogger(RestaurantServiceImpl.class);

    private IUserRepository userRepository;
    private IRestaurantRepository restaurantRepository;
    private RestaurantToRestaurantDTOConverter converterToDTO;

    @Override
    public void agregarRestauranteFavorito(Long userId, Long restaurantId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(restaurantId);
        if(userOptional.isPresent() && restaurantOptional.isPresent()){
            User user = userOptional.get();
            Restaurant restaurant = restaurantOptional.get();
            user.addRestaurant(restaurant);
            logger.info("restaurant added as favorite");
            userRepository.save(user);
            logger.info("user favorites updated");
        }else {
            logger.error("restaurant or user not found");
            throw new RestaurantNotFoundException();
        }
    }

    @Override
    public List<RestaurantDTO> listFavorites(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        List<RestaurantDTO> restaurantDTOs = new ArrayList<>();
        for (Restaurant restaurant : user.get().getFavorites()) {
            restaurantDTOs.add(converterToDTO.convert(restaurant));
        }
        logger.info(user.get().getFirstname() + " favoritos: " + restaurantDTOs);

        return restaurantDTOs;
    }

    @Override
    public void deleteFromFavorite(Long userId, Long restaurantId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(restaurantId);

        if (userOptional.isPresent() && restaurantOptional.isPresent()) {
            User user = userOptional.get();
            Restaurant restaurant = restaurantOptional.get();

            user.removeRestaurant(restaurant); // Utilizamos el método removeRestaurant definido en la clase User

            userRepository.save(user);
        } else {
            throw new UserNotFoundException(); // Lanza una excepción si no se encuentran el usuario o el restaurante
        }
    }


}