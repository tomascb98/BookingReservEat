package ProyectoIntegrador.BookingRestaurantes.repository;

import ProyectoIntegrador.BookingRestaurantes.domain.Rule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRuleRepository extends JpaRepository<Rule, Long> {
    boolean existsByDescription(String description);
}
