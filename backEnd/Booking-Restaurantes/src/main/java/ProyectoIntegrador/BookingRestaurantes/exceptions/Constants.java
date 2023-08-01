package ProyectoIntegrador.BookingRestaurantes.exceptions;

public class Constants {

    private Constants() {
        throw new IllegalStateException("Utility class");
    }

    public static final Long CLIENT_ROLE_ID = 1L;
    public static final Long EMPLOYEE_ROLE_ID = 2L;
    public static final Long PROVIDER_ROLE_ID = 3L;
    public static final int MAX_PAGE_SIZE = 2;
    public static final String RESPONSE_MESSAGE_KEY = "message";
    public static final String EXCEEDED_RESERVATION_LIMIT_MESSAGE = "No more bookings allowed at this time";
    public static final String RESTAURANT_CREATED_MESSAGE = "Restaurant created successfully";
    public static final String FEATURE_CREATED_MESSAGE = "Restaurant created successfully";
    public static final String RESTAURANT_RATED_MESSAGE = "Successfully rated Restaurant";
    public static final String RESERVATION_CREATED_MESSAGE = "Reservation created successfully";
    public static final String CATEGORY_CREATED_MESSAGE = "Category created successfully";
    public static final String CITY_CREATED_MESSAGE = "City created successfully";
    public static final String ROLE_CREATED_MESSAGE = "Role created successfully";
    public static final String ACCOUNT_CREATED_MESSAGE = "Account created successfully";
    public static final String USER_CREATED_MESSAGE = "User created successfully";
    public static final String RULE_CREATED_MESSAGE = "Rule created successfully";
    public static final String POLICY_CREATED_MESSAGE = "Policy created successfully";
    public static final String RESTAURANT_DELETED_MESSAGE = "Restaurant deleted successfully";
    public static final String CATEGORY_DELETED_MESSAGE = "Category deleted successfully";
    public static final String CITY_DELETED_MESSAGE = "City deleted successfully";
    public static final String ROLE_DELETED_MESSAGE = "Role deleted successfully";
    public static final String USER_DELETED_MESSAGE = "User deleted successfully";
    public static final String POLICY_DELETED_MESSAGE = "Policy deleted successfully";
    public static final String RULE_DELETED_MESSAGE = "Rule deleted successfully";
    public static final String FEATURE_DELETED_MESSAGE = "Rule deleted successfully";
    public static final String RESTAURANT_UPDATED_MESSAGE = "Restaurant updated successfully";
    public static final String RESTAURANT_WITHOUT_RATING_MESSAGE = "This restaurant has no rating";
    public static final String CATEGORY_UPDATED_MESSAGE = "Category updated successfully";
    public static final String RESERVATION_UPDATED_MESSAGE = "Reservation updated successfully";
    public static final String CITY_UPDATED_MESSAGE = "City updated successfully";
    public static final String ROLE_UPDATED_MESSAGE = "Role updated successfully";
    public static final String USER_UPDATED_MESSAGE = "User updated successfully";
    public static final String RESPONSE_ERROR_MESSAGE_KEY = "error";
    public static final String WRONG_CREDENTIALS_MESSAGE = "Wrong credentials";
    public static final String NO_DATA_FOUND_MESSAGE = "No data found for the requested petition";
    public static final String RESTAURANT_ALREADY_EXISTS_MESSAGE = "A restaurant already exists with the name provided";
    public static final String CATEGORY_ALREADY_EXISTS_MESSAGE = "A category already exists with the name provided";
    public static final String CITY_ALREADY_EXISTS_MESSAGE = "A city already exists with the name provided";
    public static final String MAIL_ALREADY_EXISTS_MESSAGE = "A person with that mail already exists";
    public static final String DESCRIPTION_ALREADY_EXISTS_MESSAGE = "A rule already exists with the description provided";
    public static final String RESTAURANT_NOT_FOUND_MESSAGE = "No restaurant found with the id provided";
    public static final String FEATURE_NOT_FOUND_MESSAGE = "No feature found with the id provided";
    public static final String CATEGORY_NOT_FOUND_MESSAGE = "No category found with the id provided";
    public static final String CITY_NOT_FOUND_MESSAGE = "No city found with the id provided";
    public static final String ROLE_ALREADY_EXISTS_MESSAGE = "A role already exists with the name provided";
    public static final String ROLE_NOT_FOUND_MESSAGE = "No role found with the id provided";
    public static final String RULE_NOT_FOUND_MESSAGE = "No rule found with the id provided";
    public static final String POLICY_NOT_FOUND_MESSAGE = "No policy found with the id provided";
    public static final String RESERVATION_NOT_FOUND_MESSAGE = "No reservation found with the id provided";
    public static final String ROLE_NOT_ALLOWED_MESSAGE = "No permission granted to update users with this role";
    public static final String USER_ALREADY_EXISTS_MESSAGE = "A user already exists with the role provided";
    public static final String USER_NOT_FOUND_MESSAGE = "No user found with the role provided";
    public static final String SWAGGER_TITLE_MESSAGE = "User API Pragma Power Up";
    public static final String SWAGGER_DESCRIPTION_MESSAGE = "User microservice";
    public static final String SWAGGER_VERSION_MESSAGE = "1.0.0";
    public static final String SWAGGER_LICENSE_NAME_MESSAGE = "Apache 2.0";
    public static final String SWAGGER_LICENSE_URL_MESSAGE = "http://springdoc.org";
    public static final String SWAGGER_TERMS_OF_SERVICE_MESSAGE = "http://swagger.io/terms/";
}
