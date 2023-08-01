package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.dto.ReservationDTO;

import java.util.List;
import java.util.Optional;

public interface ReservationService {
    ReservationDTO saveReservation(ReservationDTO reservationDTO);
    Optional<ReservationDTO> getReservationById(Long id);
    void deleteReservationById(Long id);
    ReservationDTO updatedReservation(ReservationDTO reservationDTO);
    List<ReservationDTO> getAllReserves();
}
