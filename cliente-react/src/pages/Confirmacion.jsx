import "../styles/pagesStyles/Confirmacion.css"



const Confirmacion = () => {
    
  
    return (
    <div className="confirmation-container">
        <h1>¡Registro exitoso!</h1>
        <p>Tu cuenta ha sido verificada correctamente. Ahora puedes disfrutar de una vida sin filas con ReservEat.</p>
        <a href="http://reserveat-client.s3-website.us-east-2.amazonaws.com/login" className="login-confirmation-button">Vamos</a>
    </div>
    )
  }
  
  export default Confirmacion;