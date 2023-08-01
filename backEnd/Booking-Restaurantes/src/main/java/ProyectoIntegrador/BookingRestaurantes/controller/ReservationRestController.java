package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.dto.ReservationDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.ReservationServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/Reserves")
@AllArgsConstructor
public class ReservationRestController {
    private final ReservationServiceImpl reservationService;

    @Operation(summary = "Add a new reservation",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Reservation created", content = @Content),
                    @ApiResponse(responseCode = "409", description = "Reservation already exists", content = @Content)})

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> saveReservation(@RequestBody ReservationDTO reservationDTO){
        reservationService.saveReservation(reservationDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RESERVATION_CREATED_MESSAGE));
    }
    @Operation(summary = "Get a reservation by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Reservation returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Reservation not found with id provided", content = @Content)})

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ReservationDTO>> getReservationById(@PathVariable Long id){
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }
    @Operation(summary = "Get a reservation by user id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Reservation returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Reservation not found with user id provided", content = @Content)})

    @GetMapping("/reserves/{idUser}")
    public ResponseEntity<List<ReservationDTO>> findReservationByIdUser(@PathVariable Long idUser) {
        return ResponseEntity.ok(reservationService.getReservationDTOByUser(idUser));
    }

    @Operation(summary = "Updated a reservation",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Restaurant updated successfully", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Restaurant not found with id provided", content = @Content),
                    @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})
    @PutMapping()
    public ResponseEntity<Map<String, String>> updateReservation(@RequestBody ReservationDTO reservationDTO){
        reservationService.updatedReservation(reservationDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RESERVATION_UPDATED_MESSAGE));
    }
    @Operation(summary = "Get all reserves",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Reserves returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Reserves not found", content = @Content)})
    @GetMapping("/all")
    public ResponseEntity<List<ReservationDTO>> getAllReserves(){
        return ResponseEntity.ok(reservationService.getAllReserves());
    }
}
