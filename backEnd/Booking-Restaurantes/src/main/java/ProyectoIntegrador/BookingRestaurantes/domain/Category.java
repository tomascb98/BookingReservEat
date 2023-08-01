package ProyectoIntegrador.BookingRestaurantes.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String urlImage;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private Set<Restaurant> restaurants = new HashSet<>();

    public Category(String name, String description, String urlImage, Set<Restaurant> restaurants) {
        this.name = name;
        this.description = description;
        this.urlImage = urlImage;
        this.restaurants = restaurants;
    }
}
