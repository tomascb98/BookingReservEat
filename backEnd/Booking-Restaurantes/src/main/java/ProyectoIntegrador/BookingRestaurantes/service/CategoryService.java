package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Category;
import ProyectoIntegrador.BookingRestaurantes.exceptions.CategoryAlreadyExistsException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.CategoryNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.repository.ICategoryRepository;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    public static final Logger logger= Logger.getLogger(CategoryService.class);
    private ICategoryRepository categoryRepository;

    public Category saveCategory(Category category){
        logger.info("Saving category");
        boolean categoryFind = categoryRepository.existsByName(category.getName());
        if(categoryFind){
            logger.warn("Category already exists");
            throw new CategoryAlreadyExistsException();
        }
        logger.info("Category Stored");
        return categoryRepository.save(category);
    }
    public Optional<Category> getCategoryByName(String name){
        logger.info("Search category");
        Optional<Category> categoryFound = categoryRepository.findByName(name);
        if(!categoryFound.isPresent()){
            logger.warn("Category not exists");
            throw new CategoryNotFoundException();
        }
        logger.info("Category Found");
        return categoryFound;
    }
    public void deleteCategoryByName(String name){
        logger.info("Search category");
        Optional<Category> categoryFound = categoryRepository.findByName(name);
        if(categoryFound.isPresent()){
            logger.info("Category Removed");
            categoryRepository.deleteByName(name);
        }else {
            logger.warn("Category not exists");
            throw new CategoryNotFoundException();
        }
    }
    public Category updateCategory(Category category){
        logger.info("Update category");
        Optional<Category> categoryFound = categoryRepository.findById(category.getId());
        if(!categoryFound.isPresent()){
            logger.warn("Category not exists");
            throw new CategoryNotFoundException();
        }
        logger.info("Updated category");
//        categoryRepository.deleteById(category.getId());
        return categoryRepository.save(category);
    }
    public List<Category> getAllCategories(){
        logger.info("Search all categories");
        List<Category> allCategories = new ArrayList<>();
        allCategories = categoryRepository.findAll();
        if(allCategories!=null) {
            logger.info("Categories Found");
            return allCategories;
        }
        logger.warn("Categories not Found");
        throw new CategoryNotFoundException();
    }
}