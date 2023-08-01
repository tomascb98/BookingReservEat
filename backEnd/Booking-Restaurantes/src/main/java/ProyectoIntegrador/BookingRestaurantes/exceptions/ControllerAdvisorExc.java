package ProyectoIntegrador.BookingRestaurantes.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.Map;

import static ProyectoIntegrador.BookingRestaurantes.exceptions.Constants.*;

@ControllerAdvice
public class ControllerAdvisorExc {
    @ExceptionHandler(RestaurantAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> restaurantAlreadyExistsException(
            RestaurantAlreadyExistsException restaurantAlreadyExistsException) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, RESTAURANT_ALREADY_EXISTS_MESSAGE));
    }
    @ExceptionHandler(RestaurantNotFoundException.class)
    public ResponseEntity<Map<String, String>> restaurantNotFoundException(
            RestaurantNotFoundException restaurantNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, RESTAURANT_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> categoryAlreadyExistsException(
            CategoryAlreadyExistsException categoryAlreadyExistsException) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, CATEGORY_ALREADY_EXISTS_MESSAGE));
    }
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<Map<String, String>> categoryNotFoundException(
            CategoryNotFoundException categoryNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, CATEGORY_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(CityAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> cityAlreadyExistsException(
            CityAlreadyExistsException cityAlreadyExistsException) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, CITY_ALREADY_EXISTS_MESSAGE));
    }
    @ExceptionHandler(CityNotFoundException.class)
    public ResponseEntity<Map<String, String>> cityNotFoundException(
            CityNotFoundException cityNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, CITY_NOT_FOUND_MESSAGE));
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<Map<String, String>> roleNotFoundException(
            RoleNotFoundException roleNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, ROLE_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> userAlreadyExistsException(
            UserAlreadyExistsException userAlreadyExistsException) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, USER_ALREADY_EXISTS_MESSAGE));
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> userNotFoundException(
            UserNotFoundException userNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, USER_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(RoleNotAllowedForUpdate.class)
    public ResponseEntity<Map<String, String>> roleNotAllowedForUpdate(
            RoleNotAllowedForUpdate roleNotAllowedForUpdate) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, ROLE_NOT_ALLOWED_MESSAGE));
    }
    @ExceptionHandler(DescriptionAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> descriptionAlreadyExistsException(
            DescriptionAlreadyExistsException descriptionAlreadyExistsException) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, DESCRIPTION_ALREADY_EXISTS_MESSAGE));
    }
    @ExceptionHandler(RuleNotFoundException.class)
    public ResponseEntity<Map<String, String>> ruleNotFoundException(
            RuleNotFoundException ruleNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, RULE_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(PolicyNotFoundException.class)
    public ResponseEntity<Map<String, String>> policyNotFoundException(
            PolicyNotFoundException policyNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, POLICY_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(RestaurantWithoutRatingException.class)
    public ResponseEntity<Map<String, String>> restaurantWithoutRatingException(
            RestaurantWithoutRatingException restaurantWithoutRatingException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, RESTAURANT_WITHOUT_RATING_MESSAGE));
    }
    @ExceptionHandler(FeatureNotFoundException.class)
    public ResponseEntity<Map<String, String>> featureNotFoundException(
            FeatureNotFoundException featureNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, FEATURE_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(ReservationNotFoundException.class)
    public ResponseEntity<Map<String, String>> reservationNotFoundException(
            ReservationNotFoundException reservationNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, RESERVATION_NOT_FOUND_MESSAGE));
    }
    @ExceptionHandler(ExceededReservationLimitException.class)
    public ResponseEntity<Map<String, String>> exceededReservationLimitException(
            ExceededReservationLimitException exceededReservationLimitException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap(RESPONSE_ERROR_MESSAGE_KEY, RESERVATION_NOT_FOUND_MESSAGE));
    }
}
