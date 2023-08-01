package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Policy;

import java.util.List;
import java.util.Optional;

public interface PolicyService {
    Policy savePolicy(Policy policy);
    Optional<Policy> getPolicyById(Long id);
    void deletePolicyById(Long id);
    List<Policy> getAllPolicies();

}
