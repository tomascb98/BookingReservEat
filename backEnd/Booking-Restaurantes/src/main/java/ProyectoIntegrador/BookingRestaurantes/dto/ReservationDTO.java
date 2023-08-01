package ProyectoIntegrador.BookingRestaurantes.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ReservationDTO {
    private Long id;
    private Long user_id;
    private String firstName;
    private String lastName;
    private String numberPhone;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateTime;
    private Long restaurant_id;
    private String restaurant_name;
}
