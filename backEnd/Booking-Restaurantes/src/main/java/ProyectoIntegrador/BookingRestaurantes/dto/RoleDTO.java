package ProyectoIntegrador.BookingRestaurantes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RoleDTO {
    private Long id;
    private String role;
}
