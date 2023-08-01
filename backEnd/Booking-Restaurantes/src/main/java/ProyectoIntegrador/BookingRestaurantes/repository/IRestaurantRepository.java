package ProyectoIntegrador.BookingRestaurantes.repository;

import ProyectoIntegrador.BookingRestaurantes.domain.Restaurant;
import ProyectoIntegrador.BookingRestaurantes.dto.PageResponseDTO;
import ProyectoIntegrador.BookingRestaurantes.dto.RestaurantDTO;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface IRestaurantRepository extends JpaRepository<Restaurant, Long> {
    boolean existsByName(String name);
    Optional<Restaurant> findByName(String name);
    List<Restaurant> findByCityId(Long idCity);
    List<Restaurant> findByCategoryId(Long idCategory);
    @Transactional
    void deleteByName(String name);
    @Query(value = "select * from restaurants r where r.id not in (select distinct rs.restaurant_id from reserves rs where rs.date_time = ?1)", nativeQuery = true)
    List<Restaurant> getRestaurantWithOutReservation(LocalDateTime dateTime);

}
