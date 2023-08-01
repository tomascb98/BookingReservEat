package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Feature;

import java.util.List;
import java.util.Optional;

public interface FeatureService {
    Feature saveFeature(Feature feature);
    Optional<Feature> getFeatureById(Long id);
    void deleteFeatureById(Long id);
    List<Feature> getAllFeatures();
}
