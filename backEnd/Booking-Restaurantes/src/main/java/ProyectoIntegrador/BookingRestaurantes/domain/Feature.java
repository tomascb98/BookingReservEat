package ProyectoIntegrador.BookingRestaurantes.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "features")
@NoArgsConstructor
@Getter
@Setter
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @JsonIgnore
    @ManyToMany(mappedBy = "features")
    private Set<Restaurant> restaurants = new HashSet<>();

    public Feature(String name, String description, Set<Restaurant> restaurants) {
        this.name = name;
        this.description = description;
        this.restaurants = restaurants;
    }
}
