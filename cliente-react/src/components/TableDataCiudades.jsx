import Table from "react-bootstrap/Table";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Alert } from "./alert";
import { useContextGlobal } from "../utils/global.context";
import "../styles/componentStyle/TableDataCiudades.css"
import Swal from "sweetalert2";

const TableDataCiudades = () => {

  const { cities , setCities, restaurants} = useContextGlobal();
  const [city, setCity] = useState({
    id : 1,
    name: "",
    department: "",
    country: ""
})
const [showForm, setShowForm] = useState(false);

const handleSubmit = (event) => {
  event.preventDefault();
};

const handleUpdate = (initialCity) => {
    setCity({
      id : initialCity.id,
      name: initialCity.name,
      department: initialCity.department,
      country: initialCity.country
    })
    setShowForm(!showForm);
};
  
  const deleteCity = (name, id) => {

    // restaurants.includes(restaurants.category_id);
    const hasRestaurantsAssigned = restaurants.find(
      (res) => res.city_id == id)?.id;
    
    console.log(hasRestaurantsAssigned);
    

    const payload = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    };

    hasRestaurantsAssigned
    ?
      Alert('error', "La ciudad tiene restaurantes asignados")
    :
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta ciudad?',
      text: "Se eliminará de manera permanente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://18.222.87.247:8080/Cities/${name}`, payload)
          .then((response) => {
            console.log(response)
            if (response.ok) {
              Swal.fire(
                'Eliminado!',
                'La ciudad ha sido eliminada.',
                'success'
              )
              // Eliminación exitosa, actualizar el estado de las ciudades
              console.log("Ciudad eliminado correctamente");
              //Alert("success", "Eliminado correctamente");

              const updatedCities = cities.filter((item) => item.name !== name);
              setCities(updatedCities);
              setTimeout(()=>window.location.reload(), 2100)
            } else {
              // Manejar el caso de error en la eliminación
              console.log("Error al eliminar la ciudad");
              Alert("error", "No se ha podido eliminar la ciudad 😒");
            }
          })
          .catch((error) => {
            // Manejar el caso de error en la solicitud
            console.log("Error al eliminar la ciudad");
            Alert("error", "No se ha podido eliminar la ciudad 😒");
          });
      }
    })
      
  };

  const updateCity = () => {

    const payload = {
      method: "PUT",
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
          console.log("Ciudad actualizada correctamente");
          Alert("success", "Actualizada correctamente");

          const updatedCities = cities.filter((item) => item.name !== name);
          setCities(updatedCities);
          setTimeout(()=>window.location.reload(), 2100)
        } else {
          // Manejar el caso de error en la eliminación
          console.log("Error al actualizar la ciudad");
          Alert("error", "No se ha podido actualizar la ciudad 😒");
        }
      })
      .catch((error) => {
        // Manejar el caso de error en la solicitud
        console.log("Error al actualizar la ciudad ");
        Alert("error", "No se ha podido actualizar la ciudad 😒");
      });
  };


  return (
    <div className="city-container" style={{marginTop: '90px', height: '80vh'}}>
      <h2>Gestion de Ciudades</h2>
    <Table className="ppal_container" striped bordered hover>
      <thead className="encabezado">
        <tr className="items_tabla">
          {/*<th>#</th>*/}
          <th>Ciudad</th>
          <th>Departamento</th>
          <th>Pais</th>
          <th>Eliminar</th>
          <th>Editar</th>
        </tr>
      </thead>

      <tbody>
        {cities.map((city, i) => {
          return (
              <tr key={i}>
                {/*<td>{city.id}</td>*/}
                <td>{city.name}</td>
                <td>{city.department}</td>
                <td>{city.country}</td>

                <td>
                  <button className="boton-eliminar" onClick={() => deleteCity(city.name, city.id)}>
                    Eliminar
                  </button>
                </td>

                <td>
                  <button className="boton-editar" onClick={() => handleUpdate(city)}>
                    Editar
                  </button>
                </td>
              </tr>
              )})
          }
        </tbody>
    </Table>
  
  {showForm && (<form onSubmit={handleSubmit}>
    {/*<label >
      Id
      <input 
      type="text" 
      name="id" 
      className="input-id"
      value={city.id}
      readOnly
      // onChange={(e) =>
      //   setCity({...city, id: e.target.value})}
      />
    </label>*/}
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
    className = "boton-actualizar"
    >
      Actualizar</button>
  </form>)}
</div>
  );
}

export default TableDataCiudades;
