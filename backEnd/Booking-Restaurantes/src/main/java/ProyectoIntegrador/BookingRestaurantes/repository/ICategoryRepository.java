package ProyectoIntegrador.BookingRestaurantes.repository;

import ProyectoIntegrador.BookingRestaurantes.domain.Category;
import ProyectoIntegrador.BookingRestaurantes.domain.Restaurant;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
    Optional<Category> findByName(String name);
    @Transactional
    void deleteByName(String name);
}
