package ProyectoIntegrador.BookingRestaurantes.repository;

import ProyectoIntegrador.BookingRestaurantes.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByDateTimeBetweenAndRestaurantName(LocalDateTime startDateTime, LocalDateTime endDateTime, String restaurantName);

    @Query(value = "select COUNT(*) from reserves r where r.dateTime >= :startDateTime and r.dateTime < :endDateTime", nativeQuery = true)
    int countByDateTimeBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
    List<Reservation> findByUserId(Long idUser);

}
