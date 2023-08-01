package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.AuthenticationResponse;
import ProyectoIntegrador.BookingRestaurantes.domain.Role;
import ProyectoIntegrador.BookingRestaurantes.domain.User;
import ProyectoIntegrador.BookingRestaurantes.dto.RoleDTO;
import ProyectoIntegrador.BookingRestaurantes.exceptions.*;
import ProyectoIntegrador.BookingRestaurantes.repository.IRoleRepository;
import ProyectoIntegrador.BookingRestaurantes.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationUserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final IRoleRepository roleRepository;

    public AuthenticationResponse register (User user){
        Optional<User> userFind = userRepository.findByEmail(user.getEmail());
        if(userFind.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        User userToSave = User.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .role(roleRepository.findByRole("ROLE_USER").get())
                .build();
        User userSaved = userRepository.save(userToSave);
        String url = "http://reserveat-client.s3-website.us-east-2.amazonaws.com/users/users/email/" + userSaved.getId();
        emailService.sendMail(user.getEmail(),"Gracias por registrarse en la aplicacion", "En el cuerpo del mensaje le dejaremos un link para que pueda confirmar su registro/n para validar su correo ingrese a: <a href='" + url + "'>" + url + "</a>");

        String jwtToken = jwtService.generateToken(userToSave);
        return AuthenticationResponse.builder()
                .jwt(jwtToken)
                .build();
    }
    public AuthenticationResponse authenticate (User user){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        User userToAuthenticate = userRepository.findByEmail(user.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(userToAuthenticate);
        return AuthenticationResponse.builder()
                .jwt(jwtToken)
                .id(userToAuthenticate.getId())
                .userName(userToAuthenticate.getFirstname())
                .userLastname(userToAuthenticate.getLastname())
                .email(userToAuthenticate.getEmail())
                .role(userToAuthenticate.getRole().getRole())
                .build();
    }

    public List<AuthenticationResponse> findAllUsers () throws NoDataFoundException {
        List<User> usersFound = userRepository.findAll();
        if(usersFound.size()>0) {
            List<AuthenticationResponse> usersToSend = new ArrayList<>();
            for (User userFound : usersFound) {
                usersToSend.add(AuthenticationResponse.builder()
                        .id(userFound.getId())
                        .userName(userFound.getFirstname())
                        .userLastname(userFound.getLastname())
                        .email(userFound.getEmail())
                        .role(userFound.getRole().getRole())
                        .build());
            }
            return usersToSend;
        } else {
            throw new NoDataFoundException();
        }
    }

    public void createRole(Role role){
        Optional <Role> roleFound = roleRepository.findByRole(role.getRole());
        if(roleFound.isEmpty()) {
            Role roleSaved = roleRepository.save(role);
            if (roleSaved.getId() <= 0) {
                throw new RoleNotAllowedForCreationException();
            }
        }
    }

    public void changeUserRole(Long id, String role) {
        Optional<User> userFound = userRepository.findById(id);
        if(userFound.isEmpty()){
            throw new RoleNotAllowedForUpdate();
        }

        Optional <Role> roleFound = roleRepository.findByRole(role);
        if(roleFound.isEmpty()) {
            throw new RoleNotAllowedForUpdate();
        }

        User userToSave = userFound.get();
        userToSave.setRole(roleFound.get());
        User userSaved = userRepository.save(userToSave);

        if (!userSaved.getRole().equals(roleFound.get())) {
            throw new RoleNotAllowedForUpdate();
        }
    }

    public List<RoleDTO> getAllRoles() throws RuntimeException{
        List<Role> rolesFound = roleRepository.findAll();
        List<RoleDTO> rolesToSend = new ArrayList<>();
        for (Role role: rolesFound) {
            rolesToSend.add(changeRoleToRoleDTO(role));
        }
        if(rolesFound.size()!=0) {
            return rolesToSend;
        } else{
            throw new RuntimeException();
        }
    }

    public void confirmEmail(Long userId){
        Optional<User> userFind = userRepository.findById(userId);
        User user = userFind.get();
        user.setConfirmed(true);
        userRepository.save(user);
    }

    public RoleDTO changeRoleToRoleDTO(Role role){
        return RoleDTO.builder()
                .id(role.getId())
                .role(role.getRole())
                .build();
    }
}
