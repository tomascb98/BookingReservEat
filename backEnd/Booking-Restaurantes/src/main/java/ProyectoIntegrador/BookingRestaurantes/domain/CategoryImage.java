package ProyectoIntegrador.BookingRestaurantes.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "category_images")
@NoArgsConstructor
public class CategoryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String url;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    public CategoryImage(String url, Category category) {
        this.url = url;
        this.category = category;
    }
}

