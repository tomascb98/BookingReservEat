package ProyectoIntegrador.BookingRestaurantes.domain;

import jakarta.persistence.*;
import jakarta.websocket.server.ServerEndpoint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "urlImageRestaurants")
@NoArgsConstructor
public class RestaurantImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String url;
    @ManyToOne
    @JoinColumn(name = "restaurant_id" , referencedColumnName = "id")
    private Restaurant restaurant;
}
