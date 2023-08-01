package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.domain.Rule;

import java.util.List;
import java.util.Optional;

public interface RuleService {
    Rule saveRule(Rule rule);
    public  Optional<Rule> getRuleById(Long id);
    void deleteRuleById(Long id);
    List<Rule> getAllRules();

}
