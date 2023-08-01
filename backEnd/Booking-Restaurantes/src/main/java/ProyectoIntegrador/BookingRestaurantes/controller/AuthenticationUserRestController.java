package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.domain.AuthenticationResponse;
import ProyectoIntegrador.BookingRestaurantes.domain.Role;
import ProyectoIntegrador.BookingRestaurantes.domain.User;
import ProyectoIntegrador.BookingRestaurantes.dto.RoleDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.AuthenticationUserService;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class AuthenticationUserRestController {

    private final AuthenticationUserService authenticationUserService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> userRegister(@RequestBody @Valid @NonNull User user){
        return ResponseEntity.ok(authenticationUserService.register(user));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> userAuthenticate(@RequestBody @Valid User user){
        return ResponseEntity.ok(authenticationUserService.authenticate(user));
    }

   @GetMapping("/all")
    public ResponseEntity<List<AuthenticationResponse>> getAllUsers (){
        return ResponseEntity.ok(authenticationUserService.findAllUsers());
    }
    @PutMapping("/role/{id}/{role}")
    public ResponseEntity<Map<String, String>> changeUserRole(@PathVariable Long id, @PathVariable String role) {
        authenticationUserService.changeUserRole(id, role);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.USER_UPDATED_MESSAGE));
    }
    @PostMapping("/role/create")
    public ResponseEntity<Map<String, String>> createRole(@RequestBody Role role){
        authenticationUserService.createRole(role);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY,Constants.ROLE_CREATED_MESSAGE));
    }
    @GetMapping("/role/all")
    public ResponseEntity<List<RoleDTO>> getAllRoles(){
        List<RoleDTO> rolesList = authenticationUserService.getAllRoles();
        return ResponseEntity.ok(rolesList);
    }

    @GetMapping("/users/email/{userId}")
    public ResponseEntity<Map<String, String>> confirmEmail(@PathVariable Long userId) {
        authenticationUserService.confirmEmail(userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.USER_UPDATED_MESSAGE));
    }


}
