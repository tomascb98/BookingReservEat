package ProyectoIntegrador.BookingRestaurantes.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class RestaurantDTO {
    private Long id;
    private String name;
    private String description;
    private String address;
    private Long city_id;
    private String city;
    private Long category_id;
    private String category;
    private List<String> urlImages;
    private List<Long> rule_ids;
    private List<String> rule_name;
    private List<String> rule_description;
    private List<Long> policy_ids;
    private List<String> policy_name;
    private List<String> policy_description;
    private List<Integer> ratings;
    private List<Long> feature_ids;
    private List<Long> reservations;
    private List<LocalDateTime> reserves;

}

