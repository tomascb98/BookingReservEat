package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Reservation;
import ProyectoIntegrador.BookingRestaurantes.domain.Restaurant;
import ProyectoIntegrador.BookingRestaurantes.domain.User;
import ProyectoIntegrador.BookingRestaurantes.dto.ReservationDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.ExceededReservationLimitException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.ReservationNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.RestaurantNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.UserNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.repository.IReservationRepository;
import ProyectoIntegrador.BookingRestaurantes.repository.IRestaurantRepository;
import ProyectoIntegrador.BookingRestaurantes.repository.IUserRepository;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService{
    public static final Logger logger= Logger.getLogger(ReservationServiceImpl.class);
    private final IReservationRepository reservationRepository;
    private final IRestaurantRepository restaurantRepository;
    private final IUserRepository userRepository;
    private final EmailService emailService;

    @Override
    public ReservationDTO saveReservation(ReservationDTO reservationDTO) {
        logger.info("Saving reservation");
        Optional<Restaurant> restaurantFind = restaurantRepository.findById(reservationDTO.getRestaurant_id());
        if(!restaurantFind.isPresent()){
            logger.warn("Restaurant not exists");
            throw new RestaurantNotFoundException();
        }
        Restaurant restaurant = restaurantFind.get();
        String restaurantName = restaurant.getName();
        LocalDateTime dateTime = reservationDTO.getDateTime();
        LocalDateTime startDateTime = dateTime.withMinute(0).withSecond(0);
        LocalDateTime endDateTime = startDateTime.plusHours(1);

        List<Reservation> existingReservations = reservationRepository.findByDateTimeBetweenAndRestaurantName(startDateTime, endDateTime, restaurantName);

        if (existingReservations.size() >= 2) {
            logger.warn("Exceeded the limit of reservations for this hour");
            throw new ExceededReservationLimitException();
        }
        logger.info("Reservation Stored");

        ReservationDTO rs = changeReservationToReservationDTO(reservationRepository.save(changeReservationDTOToReservation(reservationDTO)));
        Optional<User> userFound = userRepository.findById(reservationDTO.getUser_id());
        User user = userFound.get();
        emailService.sendMail(user.getEmail(), "Reserva exitosa", "Su reserva ha sido exitosa, "+"fecha: " + reservationDTO.getDateTime()+ " en el restaurante "+ rs.getRestaurant_name()+ " gracias por elegirnos");
        return rs;
    }

    @Override
    public Optional<ReservationDTO> getReservationById(Long id) {
        logger.info("Search reservation by id");
        Optional<Reservation> reservationFound = reservationRepository.findById(id);
        if(!reservationFound.isPresent()){
            logger.warn("Reservation not exists");
            throw new ReservationNotFoundException();
        }
        logger.info("Reservation Found");
        return Optional.of(changeReservationToReservationDTO(reservationFound.get()));
    }

    @Override
    public void deleteReservationById(Long id) {
        logger.info("Search reservation");
        Optional<Reservation> reservationFound = reservationRepository.findById(id);
        if(reservationFound.isPresent()){
            logger.info("Reservation Removed");
            reservationRepository.deleteById(id);
        }else {
            logger.warn("Reservation not exists");
            throw new ReservationNotFoundException();
        }
    }

    @Override
    public ReservationDTO updatedReservation(ReservationDTO reservationDTO) {
        logger.info("Update reservation");
        Optional<Reservation> reservationFound = reservationRepository.findById(reservationDTO.getId());
        if(!reservationFound.isPresent()){
            logger.warn("Restaurant not exists");
            throw new ReservationNotFoundException();
        }
        logger.info("Updated reservation");
        Reservation existingReservation = reservationFound.get();
        if (reservationDTO.getUser_id()!= null) {
            Long userId = reservationDTO.getUser_id();
            Optional<User> user = userRepository.findById(userId);
            User userFound = user.get();
            existingReservation.setUser(userFound);
        }else
            throw new UserNotFoundException();
        existingReservation.setNumberPhone(reservationDTO.getNumberPhone());
        existingReservation.setDateTime(reservationDTO.getDateTime());
        if (reservationDTO.getRestaurant_id()!= null) {
            Long restaurantId = reservationDTO.getRestaurant_id();
            Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
            Restaurant restaurantFound = restaurant.get();
            existingReservation.setRestaurant(restaurantFound);
        }else
            throw new RestaurantNotFoundException();
        Reservation updatedReservation = reservationRepository.save(existingReservation);
        return changeReservationToReservationDTO(updatedReservation);
    }

    @Override
    public List<ReservationDTO> getAllReserves() {
        logger.info("Search all reserves");
        List<ReservationDTO> allReservesDto = new ArrayList<>();
        List<Reservation> allReserves = reservationRepository.findAll();
        if(allReserves==null) {
            logger.info("Reservation not Found");
            throw new ReservationNotFoundException();
        }
        for (Reservation reservation : allReserves) {
            allReservesDto.add(changeReservationToReservationDTO(reservation));
            logger.warn("Reservation Found");
        }
        return allReservesDto;
    }
    public List<ReservationDTO> getReservationDTOByUser(Long idUser){
        logger.info("Search reservations by User");
        Optional<User> userFound = userRepository.findById(idUser);
        if(userFound.isPresent()){
            logger.info("Reserves Found");
            User user = userFound.get();
            List<ReservationDTO> reservationDTOS = new ArrayList<>();
            List<Reservation> allReserves = reservationRepository.findByUserId(user.getId());
            for (Reservation reservation : allReserves) {
                reservationDTOS.add(changeReservationToReservationDTO(reservation));
                logger.warn("Reservation Found");
            }
            return reservationDTOS;
        }
        logger.warn("Reservation not exists");
        throw new ReservationNotFoundException();
    }

    private Reservation changeReservationDTOToReservation(ReservationDTO reservationDTO){
        Reservation reservation = new Reservation();

        reservation.setId(reservationDTO.getId());
        reservation.setUser(userRepository.findById(reservationDTO.getUser_id()).get());
        reservation.setNumberPhone(reservationDTO.getNumberPhone());
        reservation.setDateTime(reservationDTO.getDateTime());
        reservation.setRestaurant(restaurantRepository.findById(reservationDTO.getRestaurant_id()).get());

        return reservation;
    }

    private ReservationDTO changeReservationToReservationDTO(Reservation reservation){

        ReservationDTO reservationDTO = new ReservationDTO();

        reservationDTO.setId(reservation.getId());
        reservationDTO.setUser_id(reservation.getUser().getId());
        reservationDTO.setFirstName(reservation.getUser().getFirstname());
        reservationDTO.setLastName(reservation.getUser().getLastname());
        reservationDTO.setNumberPhone(reservation.getNumberPhone());
        reservationDTO.setDateTime(reservation.getDateTime());
        reservationDTO.setRestaurant_id(reservation.getRestaurant().getId());
        reservationDTO.setRestaurant_name(reservation.getRestaurant().getName());

        return reservationDTO;
    }
}
