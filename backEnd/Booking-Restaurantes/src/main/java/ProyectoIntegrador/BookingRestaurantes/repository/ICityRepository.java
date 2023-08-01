package ProyectoIntegrador.BookingRestaurantes.repository;

import ProyectoIntegrador.BookingRestaurantes.domain.Category;
import ProyectoIntegrador.BookingRestaurantes.domain.City;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICityRepository extends JpaRepository<City, Long> {
    boolean existsByName(String name);
    Optional<City> findByName(String name);
    @Transactional
    void deleteByName(String name);
}
