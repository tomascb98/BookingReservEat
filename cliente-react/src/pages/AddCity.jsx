import React, { useEffect, useState } from "react";
import "../styles/pagesStyles/AddCity.css";
import { Alert } from "../components/alert";


const AddCity = () => {
  const [city, setCity] = useState({
    name: "",
    department: "",
    country: ""
})

const addCity = () => {

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(city),
  };

  fetch(`http://18.222.87.247:8080/Cities`, payload)
    .then((response) => {
      console.log(response)
      if (response.ok) {
        // Eliminación exitosa, actualizar el estado de las ciudades
        console.log("Ciudad agregada correctamente");
        Alert("success", "Ciudad agregada correctamente");
        setTimeout(()=>window.location.reload(), 2100)
      } else {
        // Manejar el caso de error en la eliminación
        console.log("Error al agregar la ciudad");
        Alert("error", "No se ha podido agregar la ciudad 😒");
      }
    })
    .catch((error) => {
      // Manejar el caso de error en la solicitud
      console.log("Error al actualizar la ciudad ");
      Alert("error", "No se ha podido agregar la ciudad 😒");
    });
};



  const handleSubmit = (event) => {
    event.preventDefault();
    addCity();
  };

  return (
    <div className="container-register-city">
      <div className="container-add-register">
        <form onSubmit={handleSubmit} className="register__city">
            <h2 className="add_city_title">Agregar Ciudad</h2>
            <label >
              Ciudad
              <input 
              type="text" 
              name="name" 
              className="input-name"
              value={city.name}
              onChange={(e) =>
                setCity({...city, name: e.target.value})}
              />
            </label>
            <label >
              Departamento
              <input 
              type="text" 
              name="department" 
              className="input-department"
              value={city.department}
              onChange={(e) =>
                setCity({...city, department: e.target.value})}
              />
            </label>
            <label >
              Pais
              <input 
              type="text" 
              name="country" 
              className="input-country"
              value={city.country}
              onChange={(e) =>
                setCity({...city, country: e.target.value})}
              />
            </label>
            <button 
            onClick={()=> updateCity()}
            className = "agregar"
            >
              Agregar</button>
      </form>
    </div>
    </div>
  );
};
export default AddCity;
