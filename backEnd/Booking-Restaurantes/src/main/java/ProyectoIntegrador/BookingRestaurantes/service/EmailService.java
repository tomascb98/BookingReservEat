package ProyectoIntegrador.BookingRestaurantes.service;

public interface EmailService {
    void sendMail(String to, String subject, String body);
}
