import { useContext, useState } from "react";
import "../styles/pagesStyles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { Alert } from "../components/alert";

const Login = () => {
  const { user, setUser, setIsLoggedin, userData, setUserData } = useContext(AuthContext);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const doLogin = () => {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch("http://18.222.87.247:8080/users/authenticate", payload)
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json();
          
        } else {
          Alert("error", "Algunos de los datos es incorrecto! 😒")
          //alert("Alguno de los datos es incorrecto.");
        }
        
      })
      .then((data) => {
        console.log(data);
        if(data.jwt){
          setUserData({firstname: data.userName, lastname: data.userLastname, role: data.role, id: data.id})
          console.log(userData);
          const jwt = JSON.stringify(data.jwt);
          const userr = JSON.stringify({firstname: data.userName, lastname: data.userLastname, role: data.role, id: data.id, user: data.email});
          localStorage.setItem("user", userr);
          localStorage.setItem("jwt", jwt);
          //setIsLoggedin(true);
          //console.log(userData);
          navigate("/");

        }/**/
        
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    doLogin();
    
  };

  return (
    <div className="login" >
      
      <form className="formulario" onSubmit={handleSubmit}>
      <h2>Ingresa tus datos</h2>
      <p className="rules-reserve">Para reservar debes estar logueado, sino tienes cuenta <Link className="rule-link" to='/register'><span>Registrate</span></Link> ahora !</p>
        <label>
          <p>Correo electrónico </p>{" "}
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />{" "}
        </label>
        <label>
          <p>Contraseña</p>{" "}
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />{" "}
        </label>
        <div className="remember">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember" className="">Recordame</label>
        </div>

        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Login;
