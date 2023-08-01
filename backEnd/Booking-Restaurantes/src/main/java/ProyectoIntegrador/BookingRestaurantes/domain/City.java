package ProyectoIntegrador.BookingRestaurantes.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cities")
@NoArgsConstructor
@Getter
@Setter
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String department;
    private String country;
    @JsonIgnore
    @OneToMany(mappedBy = "city")
    private Set<Restaurant> restaurants = new HashSet<>();

    public City(String name, String department, String country) {
        this.name = name;
        this.department = department;
        this.country = country;
    }
}
