package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Rule;
import ProyectoIntegrador.BookingRestaurantes.exceptions.DescriptionAlreadyExistsException;
import ProyectoIntegrador.BookingRestaurantes.exceptions.RuleNotFoundException;
import ProyectoIntegrador.BookingRestaurantes.repository.IRuleRepository;
import lombok.AllArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class RuleServiceImpl implements RuleService{
    public static final Logger logger= Logger.getLogger(RuleServiceImpl.class);
    private final IRuleRepository ruleRepository;

    @Override
    public Rule saveRule(Rule rule) {
        logger.info("Saving rule");
        boolean ruleFind = ruleRepository.existsByDescription(rule.getDescription());
        if (ruleFind) {
            logger.warn("Rule already exists with description provided");
            throw new DescriptionAlreadyExistsException();
        }
        logger.info("Rule Stored");
        return ruleRepository.save(rule);
    }

    @Override
    public Optional<Rule> getRuleById(Long id) {
        logger.info("Search rule");
        Optional<Rule> ruleFound = ruleRepository.findById(id);
        if(!ruleFound.isPresent()){
            logger.warn("Rule not exists");
            throw new RuleNotFoundException();
        }
        logger.info("Rule Found");
        return ruleFound;
    }

    @Override
    public void deleteRuleById(Long id) {
        logger.info("Search rule");
        Optional<Rule> ruleFound = ruleRepository.findById(id);
        if(ruleFound.isPresent()){
            logger.info("Rule Removed");
            ruleRepository.deleteById(id);
        }else {
            logger.warn("Rule not exists");
            throw new RuleNotFoundException();
        }
    }

    @Override
    public List<Rule> getAllRules() {
        logger.info("Search all rules");
        List<Rule> allRules = new ArrayList<>();
        allRules = ruleRepository.findAll();
        if(allRules!=null) {
            logger.info("Rules Found");
            return allRules;
        }
        logger.warn("Rules not Found");
        throw new RuleNotFoundException();
    }
}

