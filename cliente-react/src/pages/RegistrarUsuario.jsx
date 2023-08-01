import React from "react";
import { useState } from "react";
import "../styles/pagesStyles/RegistrarUsuario.css";
import { Alert } from "../components/alert";

const RegistrarUsuario = () => {
  let [passValidation, setPassValidation] = useState("");

  const [usuario, setUsuario] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  console.log(usuario);
  console.log(passValidation);

  const createUsuario = () => {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    };

    try {
      fetch("http://18.222.87.247:8080/users/register", payload)
        .then((res) => {
          res.json()
          res.ok == true ? Alert('success', "Ha sido registrado correctamente"):Alert('error', "Error al registrarse, intente mas tarde! 😒");
          console.log(res.ok);
        })
        .then((data) => {
          //const jwt = JSON.stringify(data);
          //localStorage.setItem("jwt", jwt);
          //console.log(jwt);
        })
    }
    catch{
      ((err) => {
        console.log(err.message);
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Requisitos contraseña: al menos 8 caracteres, al menos una letra mayúscula, al menos una letra minúscula y al menos un número
    const regexContra = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (usuario.firstname.trim().length < 3) {
      Alert('warning', "El nombre es muy corto");
    } else if (usuario.lastname.trim().length < 3) {
      Alert('warning', "El apellido es muy corto");
    } else if (!regex.test(usuario.email)) {
      Alert('warning', "Ingresa un correo válido");
    } else if (!regexContra.test(usuario.password)) {
      Alert('warning', "Ingresa una contraseña válida");
    } else if (usuario.password !== passValidation) {
      Alert('warning', "Ingrese dos contraseñas iguales");
    } else {
      // Con esto reseteamos el form
      createUsuario();
      setUsuario({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      setPassValidation("");
    }
  };

  return (
    <div className="register-container">
      <br />
      <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Registrate</h2>
      <p className="parrafoRegister">
        Recuerda que ningún campo debe quedar vacío
      </p>
        <div className="nombreApellido">
          <div className="labelName">
            <label className="parrafoLabel">Nombre</label>
            <input
              className="inputName"
              type="text"
              value={usuario.firstname}
              onChange={(e) =>
                setUsuario({ ...usuario, firstname: e.target.value })
              }
            />
          </div>
          <div className="labelApellido">
            <label className="parrafoLabel">Apellido</label>
            <input
              className="inputApellido"
              type="text"
              value={usuario.lastname}
              onChange={(e) =>
                setUsuario({ ...usuario, lastname: e.target.value })
              }
            />
          </div>
        </div>
        <div className="label">
          <label className="parrafoLabel">Correo electrónico</label>
          <input
            className="restoInputs"
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </div>
        <div className="label">
          <label className="parrafoLabel">Contraseña</label>
          <input
            className="restoInputs"
            type="password"
            value={usuario.password}
            onChange={(e) =>
              setUsuario({ ...usuario, password: e.target.value })
            }
          />
        </div>
        <div className="label">
          <label className="parrafoLabel">Confirmar Contraseña</label>
          <input
            className="restoInputs"
            type="password"
            value={passValidation}
            onChange={(e) =>
              setPassValidation((passValidation = e.target.value))
            }
          />
        </div>
        <span className="condicion">
          La contraseña debe contener al menos 8 caracteres de los cuales al
          menos una letra mayúscula, una letra minúscula y un número
        </span>
        <button className="form-button">Enviar</button>
      </form>
      
    
    </div>
  );
};

export default RegistrarUsuario;
