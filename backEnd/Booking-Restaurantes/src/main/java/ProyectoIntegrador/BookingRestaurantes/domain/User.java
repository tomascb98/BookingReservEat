package ProyectoIntegrador.BookingRestaurantes.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String firstname;
    @Column
    private String lastname;
    @Column
    @Email
    private String email;
    @Column
    @NotBlank
    private String password;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "role_id")
    private Role role;
    private boolean confirmed;
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "user_restaurants_favorites",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "restaurant_id") })
    @JsonIgnore
    private List<Restaurant> favorites = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Reservation> reserves = new ArrayList<>();

    public User(String firstname, String lastname, String email, String password, Role role, boolean confirmed, List<Restaurant> favorites) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.confirmed = confirmed;
        this.favorites = favorites;
    }

    public void addRestaurant(Restaurant restaurant) {
        this.favorites.add(restaurant);
        restaurant.getUsers().add(this);
    }

    public void removeRestaurant(Restaurant restaurant) {
        this.favorites.remove(restaurant);
        restaurant.getUsers().remove(this);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getRole()));
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
