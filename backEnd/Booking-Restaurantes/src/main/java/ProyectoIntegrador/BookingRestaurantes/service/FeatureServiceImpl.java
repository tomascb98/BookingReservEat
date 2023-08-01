package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Feature;
import ProyectoIntegrador.BookingRestaurantes.exceptions.DescriptionAlreadyExistsException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.FeatureNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.repository.IFeatureRepository;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class FeatureServiceImpl implements FeatureService {
    public static final Logger logger= Logger.getLogger(FeatureServiceImpl.class);
    private final IFeatureRepository featureRepository;

    @Override
    public Feature saveFeature(Feature feature) {
        logger.info("Saving feature");
        boolean featureFind = featureRepository.existsByName(feature.getName());
        if (featureFind) {
            logger.warn("Feature already exists with name provided");
            throw new DescriptionAlreadyExistsException();
        }
        logger.info("Feature Stored");
        return featureRepository.save(feature);
    }

    @Override
    public Optional<Feature> getFeatureById(Long id) {
        logger.info("Search feature");
        Optional<Feature> featureFound = featureRepository.findById(id);
        if(!featureFound.isPresent()){
            logger.warn("Feature not exists");
            throw new FeatureNotFoundException();
        }
        logger.info("Feature Found");
        return featureFound;
    }

    @Override
    public void deleteFeatureById(Long id) {
        logger.info("Search feature");
        Optional<Feature> featureFound = featureRepository.findById(id);
        if(featureFound.isPresent()){
            logger.info("Feature Removed");
            featureRepository.deleteById(id);
        }else {
            logger.warn("Feature not exists");
            throw new FeatureNotFoundException();
        }
    }

    @Override
    public List<Feature> getAllFeatures() {
        logger.info("Search all features");
        List<Feature> allFeatures = new ArrayList<>();
        allFeatures = featureRepository.findAll();
        if(allFeatures!=null) {
            logger.info("Features Found");
            return allFeatures;
        }
        logger.warn("Feature not Found");
        throw new FeatureNotFoundException();
    }
}
