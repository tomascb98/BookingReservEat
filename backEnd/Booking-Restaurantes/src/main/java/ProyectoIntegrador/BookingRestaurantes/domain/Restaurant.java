package ProyectoIntegrador.BookingRestaurantes.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "restaurants")
@NoArgsConstructor
@Getter
@Setter
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<RestaurantImage> restaurantImages ;
    private String address;
    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City city;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;
    @ManyToMany
    @JoinTable(name = "restaurants_rules", joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "rule_id"))
    private List<Rule> rules = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "restaurants_policies", joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "policy_id"))
    private List<Policy> policies = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "favorites")
    @JsonIgnore
    private List<User> users = new ArrayList<>();
    @ElementCollection
    private List<Integer> ratings = new ArrayList<>();
    @ManyToMany
    @JoinTable(name = "restaurants_features", joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private List<Feature> features = new ArrayList<>();
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Reservation> reserves = new ArrayList<>();

    public Restaurant(String name, String description, List<RestaurantImage> restaurantImages, String address, City city, Category category, List<Rule> rules, List<Policy> policies, List<User> users, List<Integer> ratings, List<Feature> features, List<Reservation> reserves) {
        this.name = name;
        this.description = description;
        this.restaurantImages = restaurantImages;
        this.address = address;
        this.city = city;
        this.category = category;
        this.rules = rules;
        this.policies = policies;
        this.users = users;
        this.ratings = ratings;
        this.features = features;
        this.reserves = reserves;
    }
}
