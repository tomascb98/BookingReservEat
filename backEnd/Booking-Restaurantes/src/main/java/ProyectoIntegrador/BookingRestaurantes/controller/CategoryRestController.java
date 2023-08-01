package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.domain.Category;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.CategoryService;
import ProyectoIntegrador.BookingRestaurantes.service.ImagesS3Service;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/Categories")
@AllArgsConstructor
//@CrossOrigin(origins = "*")

public class CategoryRestController {
    private CategoryService categoryService;
    private ImagesS3Service imagesS3Service;

    @PostMapping()
    public ResponseEntity<Map<String, String>> saveCategory(@RequestParam("fileImage") MultipartFile fileImage,
                                                            @RequestParam("name") String name,
                                                            @RequestParam("description") String description) {
        String imageUrl = imagesS3Service.uploadSingleFile(fileImage);
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        category.setUrlImage(imageUrl);

        categoryService.saveCategory(category);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.CATEGORY_CREATED_MESSAGE));
    }

    @GetMapping("/{name}")
    public ResponseEntity<Optional<Category>> getCategoryByName(@PathVariable String name){
        return ResponseEntity.ok(categoryService.getCategoryByName(name));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Map<String, String>> deleteCategoryByName(@PathVariable String name) {
        categoryService.deleteCategoryByName(name);
        return ResponseEntity.ok(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.CATEGORY_DELETED_MESSAGE));
    }
    @PutMapping()
    public ResponseEntity<Map<String, String>> updateCategory(@RequestBody Category category) {
        categoryService.updateCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.CATEGORY_UPDATED_MESSAGE));
    }
    @GetMapping()
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
}