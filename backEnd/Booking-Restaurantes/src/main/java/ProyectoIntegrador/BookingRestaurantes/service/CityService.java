package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.City;
import ProyectoIntegrador.BookingRestaurantes.exceptions.CityAlreadyExistsException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.CityNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.repository.ICityRepository;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class CityService {
    public static final Logger logger= Logger.getLogger(CityService.class);
    private ICityRepository cityRepository;

    public City saveCity(City city){
        logger.info("Saving city");
        boolean cityFind = cityRepository.existsByName(city.getName());
        if(cityFind){
            logger.warn("City already exists");
            throw new CityAlreadyExistsException();
        }
        logger.info("City Stored");
        return cityRepository.save(city);
    }
    public Optional<City> getCityByName(String name){
        logger.info("Search city");
        Optional<City> cityFound = cityRepository.findByName(name);
        if(!cityFound.isPresent()){
            logger.warn("City not exists");
            throw new CityNotFoundException();
        }
        logger.info("City Found");
        return cityFound;
    }
    public void deleteCityByName(String name){
        logger.info("Search city");
        Optional<City> cityFound = cityRepository.findByName(name);
        if(cityFound.isPresent()){
            logger.info("City Removed");
            cityRepository.deleteByName(name);
        }else {
            logger.warn("City not exists");
            throw new CityNotFoundException();
        }
    }
    public City updateCity(City city){
        logger.info("Update city");
        Optional<City> cityFound = cityRepository.findById(city.getId());
        if(!cityFound.isPresent()){
            logger.warn("City does not exists");
            throw new CityNotFoundException();
        }
        logger.info("Updated city");
        city.setId(cityFound.get().getId());
        return cityRepository.save(city);
    }
    public List<City> getAllCities(){
        logger.info("Search all cities");
        List<City> allCities = new ArrayList<>();
        allCities = cityRepository.findAll();
        if(allCities!=null) {
            logger.info("Cities Found");
            return allCities;
        }
        logger.warn("Cities not Found");
        throw new CityNotFoundException();
    }
}
