package ProyectoIntegrador.BookingRestaurantes.controller;

import ProyectoIntegrador.BookingRestaurantes.domain.Policy;
import ProyectoIntegrador.BookingRestaurantes.exceptions.Constants;
import ProyectoIntegrador.BookingRestaurantes.service.PolicyServiceImpl;
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
@RequestMapping("/Policies")
@AllArgsConstructor
public class PolicyRestController {

    private final PolicyServiceImpl policyService;

    @Operation(security = { @SecurityRequirement(name = "bearer-key") },
            summary = "Add a new policy",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Policy created", content = @Content),
                    @ApiResponse(responseCode = "409", description = "Policy already exists", content = @Content),
                    @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})

    @PostMapping()
    public ResponseEntity<Map<String, String>> saveRule (@RequestBody Policy policy) {
        policyService.savePolicy(policy);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.POLICY_CREATED_MESSAGE));
    }
    @Operation(summary = "Get a policy by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Policy returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Policy not found with id provided", content = @Content)})

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Policy>> getPolicyById(@PathVariable Long id){
        return ResponseEntity.ok(policyService.getPolicyById(id));
    }
    @Operation(summary = "Delete a policy by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Policy removed successfully", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Policy not found with id provided", content = @Content),
                    @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePolicyById(@PathVariable Long id) {
        policyService.deletePolicyById(id);
        return ResponseEntity.ok(Collections.singletonMap(Constants.RESPONSE_MESSAGE_KEY, Constants.POLICY_DELETED_MESSAGE));
    }

    @Operation(summary = "Get all policies",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Policies returned", content = @Content),
                    @ApiResponse(responseCode = "404", description = "Policies not found", content = @Content)})

    @GetMapping()
    public ResponseEntity<List<Policy>> getAllPolicies(){
        return ResponseEntity.ok(policyService.getAllPolicies());
    }
}
