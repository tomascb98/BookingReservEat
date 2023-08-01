package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.domain.Rule;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.RuleServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/Rules")
@AllArgsConstructor
public class RuleRestController {

    private final RuleServiceImpl ruleService;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },
            summary = "Add a new rule",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Rule created", content = @Content),
                    @ApiResponse(responseCode = "409", description = "Rule already exists", content = @Content),
                    @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})

    @PostMapping()
    public ResponseEntity<Map<String, String>> saveRule (@RequestBody Rule rule) {
        ruleService.saveRule(rule);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RULE_CREATED_MESSAGE));
    }
    @Operation(summary = "Get a rule by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Rule returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Rule not found with id provided", content = @Content)})

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Rule>> getRuleById(@PathVariable Long id){
        return ResponseEntity.ok(ruleService.getRuleById(id));
    }
    @Operation(summary = "Delete a rule by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Rule removed successfully", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Rule not found with id provided", content = @Content),
                    @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRuleById(@PathVariable Long id) {
        ruleService.deleteRuleById(id);
        return ResponseEntity.ok(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.RULE_DELETED_MESSAGE));
    }

    @Operation(summary = "Get all rules",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Rules returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Rules not found", content = @Content)})

    @GetMapping()
    public ResponseEntity<List<Rule>> getAllRules(){
        return ResponseEntity.ok(ruleService.getAllRules());
    }
}
