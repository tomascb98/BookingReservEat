package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Policy;
import ProyectoIntegrador.BookingRestaurantes.exceptions.DescriptionAlreadyExistsException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.PolicyNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.repository.IPolicyRepository;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class PolicyServiceImpl implements PolicyService{

    public static final Logger logger= Logger.getLogger(PolicyServiceImpl.class);

    private final IPolicyRepository policyRepository;

    @Override
    public Policy savePolicy(Policy policy) {
        logger.info("Saving policy");
        boolean policyFind = policyRepository.existsByDescription(policy.getDescription());
        if (policyFind) {
            logger.warn("Policy already exists with description provided");
            throw new DescriptionAlreadyExistsException();
        }
        logger.info("Policy Stored");
        return policyRepository.save(policy);
    }

    @Override
    public Optional<Policy> getPolicyById(Long id) {
        logger.info("Search policy");
        Optional<Policy> policyFound = policyRepository.findById(id);
        if(!policyFound.isPresent()){
            logger.warn("Policy not exists");
            throw new PolicyNotFoundException();
        }
        logger.info("Policy Found");
        return policyFound;
    }

    @Override
    public void deletePolicyById(Long id) {
        logger.info("Search policy");
        Optional<Policy> policyFound = policyRepository.findById(id);
        if(policyFound.isPresent()){
            logger.info("Policy Removed");
            policyRepository.deleteById(id);
        }else {
            logger.warn("Policy not exists");
            throw new PolicyNotFoundException();
        }
    }

    @Override
    public List<Policy> getAllPolicies() {
        logger.info("Search all policies");
        List<Policy> allPolicies = new ArrayList<>();
        allPolicies = policyRepository.findAll();
        if(allPolicies!=null) {
            logger.info("Policies Found");
            return allPolicies;
        }
        logger.warn("Policy not Found");
        throw new PolicyNotFoundException();
    }
}

