package ProyectoIntegrador.BookingRestaurantes.Service;

import ProyectoIntegrador.BookingRestaurantes.domain.City;
import ProyectoIntegrador.BookingRestaurantes.exceptions.CityNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.service.CityService;
import lombok.AllArgsConstructor;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class CityServiceTest {
/*    @Autowired
    private CityService cityService;

    @Test
    @Order(1)
    public void saveCityTest(){
        City cityToSave= new City("Sincelejo", "Sucre", "Colombia");
        City citySaved=cityService.saveCity(cityToSave);
        assertEquals(7L,citySaved.getId());
    }
    @Test
    @Order(2)
    public void findCityByNameTest(){
        String cityName="MedelliN";
        Optional<City> cityFind=cityService.getCityByName(cityName);
        assertNotNull(cityFind.get());
    }
    @Test
    @Order(3)
    public void getAllCitiesTest(){
        List<City> cities=cityService.getAllCities();
        assertEquals(6,cities.size());
    }

    @Test
    @Order(4)
    public void deleteCityByNameTest(){
        String cityName="Cartagena";
        cityService.deleteCityByName(cityName);
        Optional<City> cityDeleted=cityService.getCityByName(cityName);
        assertFalse(cityDeleted.isPresent());
    }*/
}
