package ProyectoIntegrador.BookingRestaurantes.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
    private Long id;
    private String jwt;
    private String userName;
    private String userLastname;
    private String email;
    private String role;
}
