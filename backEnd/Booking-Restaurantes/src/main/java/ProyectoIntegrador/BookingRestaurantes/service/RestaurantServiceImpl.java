package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.*;
import ProyectoIntegrador.BookingRestaurantes.dto.PageResponseDTO;
import ProyectoIntegrador.BookingRestaurantes.dto.RequestRestaurantDTO;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.RestaurantAlreadyExistsException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.RestaurantNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.RestaurantWithoutRatingException;
import ProyectoIntegrador.BookingRestaurantes.repository.*;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RestaurantServiceImpl implements RestaurantService  {
    public static final Logger logger= Logger.getLogger(RestaurantServiceImpl.class);
    private final IRestaurantRepository restaurantRepository;
    private final ICategoryRepository categoryRepository;
    private final ICityRepository cityRepository;
    private final IRuleRepository ruleRepository;
    private final IPolicyRepository policyRepository;
    private final IFeatureRepository featureRepository;
    private final IReservationRepository reservationRepository;
    private final ConversionService conversionService;

    public RestaurantDTO saveRestaurant(RestaurantDTO restaurantDTO){
        logger.info("Saving restaurant");
        boolean restaurantFind = restaurantRepository.existsByName(restaurantDTO.getName());
        if(restaurantFind){
            logger.warn("Restaurant already exists");
            throw new RestaurantAlreadyExistsException();
        }
        logger.info("Restaurant Stored");
        return changeRestaurantToRestaurantDTO(restaurantRepository.save(changeRestaurantDTOaRestaurant(restaurantDTO)));
    }
    public Optional<RestaurantDTO> getRestaurantByName(String name){
        logger.info("Search restaurant by name");
        Optional<Restaurant> restaurantFound = restaurantRepository.findByName(name);
        if(!restaurantFound.isPresent()){
            logger.warn("Restaurant not exists");
            throw new RestaurantNotFoundException();
        }
        logger.info("Restaurant Found");
        return Optional.of(changeRestaurantToRestaurantDTO(restaurantFound.get()));
    }
    @Override
    public List<RestaurantDTO> getRestaurantsDTOByCity(Long idCity){
        logger.info("Search restaurants by city id");
        Optional<City> cityFound = cityRepository.findById(idCity);
        if(cityFound.isPresent()){
            logger.info("Restaurants Found");
            City city = cityFound.get();
            List<RestaurantDTO> restaurantDTOS = new ArrayList<>();
            List<Restaurant> allRestaurants = restaurantRepository.findByCityId(city.getId());
            for (Restaurant restaurant:allRestaurants) {
                restaurantDTOS.add(changeRestaurantToRestaurantDTO(restaurant));
                logger.warn("Restaurant Found");
            }
            return restaurantDTOS;
        }
        logger.warn("Restaurant not exists");
        throw new RestaurantNotFoundException();
    }
    @Override
    public List<RestaurantDTO> getRestaurantDTOByCategory(Long idCategory){
        logger.info("Search restaurants by category");
        Optional<Category> categoryFound = categoryRepository.findById(idCategory);
        if(categoryFound.isPresent()){
            logger.info("Restaurants Found");
            Category category = categoryFound.get();
            List<RestaurantDTO> restaurantDTOS = new ArrayList<>();
            List<Restaurant> allRestaurants = restaurantRepository.findByCategoryId(category.getId());
            for (Restaurant restaurant:allRestaurants) {
                restaurantDTOS.add(changeRestaurantToRestaurantDTO(restaurant));
                logger.warn("Restaurant Found");
            }
            return restaurantDTOS;
        }
        logger.warn("Restaurant not exists");
        throw new RestaurantNotFoundException();
    }

    public void deleteRestaurantByName(String name){
        logger.info("Search restaurant");
        Optional<Restaurant> restaurantFound = restaurantRepository.findByName(name);
        if(restaurantFound.isPresent()){
            logger.info("Restaurant Removed");
            restaurantRepository.deleteByName(name);
        }else {
            logger.warn("Restaurant not exists");
            throw new RestaurantNotFoundException();
        }
    }
    public RestaurantDTO updateRestaurant(RestaurantDTO restaurantDTO){
        logger.info("Update restaurant");
        Optional<Restaurant> restaurantFound = restaurantRepository.findById(restaurantDTO.getId());
        if(!restaurantFound.isPresent()){
            logger.warn("Restaurant not exists");
            throw new RestaurantNotFoundException();
        }
        logger.info("Updated restaurant");
        restaurantRepository.deleteById(restaurantDTO.getId());
        return changeRestaurantToRestaurantDTO(restaurantRepository.save(changeRestaurantDTOaRestaurant(restaurantDTO)));
    }
    public List<RestaurantDTO> getAllRestaurants(){
        logger.info("Search all restaurants");
        List<RestaurantDTO> allRestaurantsDto = new ArrayList<>();
        List<Restaurant> allRestaurants = restaurantRepository.findAll();
        if(allRestaurants==null) {
            logger.info("Restaurants not Found");
            throw new RestaurantNotFoundException();
        }
        for (Restaurant restaurant:allRestaurants) {
            allRestaurantsDto.add(changeRestaurantToRestaurantDTO(restaurant));
            logger.warn("Restaurant Found");
        }
        return allRestaurantsDto;
    }
    public List<RestaurantDTO> getRestaurantWithOutReserves(RequestRestaurantDTO requestRestaurantDTO){
        logger.info("Search all restaurants");
        List<RestaurantDTO> allRestaurantsDto = new ArrayList<>();
        List<Restaurant> allRestaurants = restaurantRepository.getRestaurantWithOutReservation(requestRestaurantDTO.getDateTime());
        if(allRestaurants==null) {
            logger.info("Restaurants not Found");
            throw new RestaurantNotFoundException();
        }
        for (Restaurant restaurant:allRestaurants) {
            allRestaurantsDto.add(changeRestaurantToRestaurantDTO(restaurant));
            logger.warn("Restaurant Found");
        }
        return allRestaurantsDto;
    }
    @Override
    public PageResponseDTO<RestaurantDTO> getRestaurantsByPage(Pageable pageable) {
        Page<Restaurant> restaurantPage = restaurantRepository.findAll(pageable);
        return new PageResponseDTO<>(
                restaurantPage.getContent().stream()
                        .map(restaurant -> conversionService.convert(restaurant, RestaurantDTO.class)).toList()
                , restaurantPage.getPageable()
                , restaurantPage.getTotalElements());
    }
    public void rateRestaurant(Long idRestaurant, Integer rating){
        logger.info("Rate restaurant");
        Optional<Restaurant> restaurantFind = restaurantRepository.findById(idRestaurant);
        if(restaurantFind.isPresent()){
            Restaurant restaurant = restaurantFind.get();
            restaurant.getRatings().add(rating);
            restaurantRepository.save(restaurant);
        }else
            throw new RestaurantNotFoundException();
        logger.info("Restaurant not Found");
    }
    public Double getAverageRating(Long idRestaurant){
        logger.info("Get Average Rating of Restaurant");
        Optional<Restaurant> restaurantFound = restaurantRepository.findById(idRestaurant);
        if(!restaurantFound.isPresent()){
            logger.info("Restaurants not Found");
            throw new RestaurantNotFoundException();
        }else {
            Restaurant restaurant = restaurantFound.get();
            List<Integer> ratings = restaurant.getRatings();
            if (ratings.isEmpty()){
                logger.info("Restaurants without rating");
                throw new RestaurantWithoutRatingException();
            }else{
                logger.info("Average Found");
                return ratings.stream()
                        .mapToInt(Integer::intValue)
                        .average()
                        .orElse(0.0);
            }
        }
    }
    private Restaurant changeRestaurantDTOaRestaurant(RestaurantDTO restaurantDTO){
        Restaurant restaurant= new Restaurant();

        restaurant.setId(restaurantDTO.getId());
        restaurant.setName(restaurantDTO.getName());
        restaurant.setDescription(restaurantDTO.getDescription());
        restaurant.setAddress(restaurantDTO.getAddress());
        restaurant.setCity(cityRepository.findById(restaurantDTO.getCity_id()).get());
        restaurant.setCategory(categoryRepository.findById(restaurantDTO.getCategory_id()).get());
        List<RestaurantImage> restaurantImages = new ArrayList<>();
        for (String imageUrl: restaurantDTO.getUrlImages()) {
            RestaurantImage restaurantImage = new RestaurantImage();
            restaurantImage.setUrl(imageUrl);
            restaurantImage.setRestaurant(restaurant);
            restaurantImages.add(restaurantImage);
        }
        restaurant.setRestaurantImages(restaurantImages);
        List<Rule> rules = ruleRepository.findAllById(restaurantDTO.getRule_ids());
        List<Policy> policies = policyRepository.findAllById(restaurantDTO.getPolicy_ids());
        restaurant.setRules(rules);
        restaurant.setPolicies(policies);
        List<Integer> ratings = new ArrayList<>(restaurantDTO.getRatings());
        restaurant.setRatings(ratings);
        List<Feature> features = featureRepository.findAllById(restaurantDTO.getFeature_ids());
        restaurant.setFeatures(features);
        List<Reservation> reservations = reservationRepository.findAllById(restaurantDTO.getReservations());
        restaurant.setReserves(reservations);

        return restaurant;
    }

    private RestaurantDTO changeRestaurantToRestaurantDTO(Restaurant restaurant){

        RestaurantDTO restaurantDTO = new RestaurantDTO();
        List<String> imagesUrl = new ArrayList<>();
        for (RestaurantImage restaurantImage: restaurant.getRestaurantImages()) {
            imagesUrl.add(restaurantImage.getUrl());
        }

        restaurantDTO.setId(restaurant.getId());
        restaurantDTO.setName(restaurant.getName());
        restaurantDTO.setDescription(restaurant.getDescription());
        restaurantDTO.setAddress(restaurant.getAddress());
        restaurantDTO.setCity_id(restaurant.getCity().getId());
        restaurantDTO.setCategory_id(restaurant.getCategory().getId());
        restaurantDTO.setCity(restaurant.getCity().getName());
        restaurantDTO.setCategory(restaurant.getCategory().getName());
        restaurantDTO.setUrlImages(imagesUrl);
        List<Long> ruleIds = restaurant.getRules().stream()
                .map(Rule::getId)
                .collect(Collectors.toList());
        List<String> ruleNames = restaurant.getRules().stream()
                .map(Rule::getName)
                .collect(Collectors.toList());
        List<String> ruleDescription = restaurant.getRules().stream()
                .map(Rule::getDescription)
                .collect(Collectors.toList());
        List<Long> policyIds = restaurant.getPolicies().stream()
                .map(Policy::getId)
                .collect(Collectors.toList());
        List<String> policyNames = restaurant.getPolicies().stream()
                .map(Policy::getName)
                .collect(Collectors.toList());
        List<String> policyDescription = restaurant.getPolicies().stream()
                .map(Policy::getDescription)
                .collect(Collectors.toList());
        List<Integer> ratings = new ArrayList<>(restaurant.getRatings());
        List<Long> featureIds = restaurant.getFeatures().stream()
                .map(Feature::getId)
                .collect(Collectors.toList());
        List<Long> reservations = restaurant.getReserves().stream()
                .map(Reservation::getId)
                .collect(Collectors.toList());

        List<LocalDateTime> reserves = restaurant.getReserves().stream()
                .map(Reservation::getDateTime)
                .collect(Collectors.toList());

        restaurantDTO.setRule_ids(ruleIds);
        restaurantDTO.setRule_name(ruleNames);
        restaurantDTO.setRule_description(ruleDescription);
        restaurantDTO.setPolicy_ids(policyIds);
        restaurantDTO.setPolicy_name(policyNames);
        restaurantDTO.setPolicy_description(policyDescription);
        restaurantDTO.setRatings(ratings);
        restaurantDTO.setFeature_ids(featureIds);
        restaurantDTO.setReservations(reservations);
        restaurantDTO.setReserves(reserves);

        return restaurantDTO;
    }
}
