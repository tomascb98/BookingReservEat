import Table from "react-bootstrap/Table";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Alert } from "../components/alert";
import { useContextGlobal } from "../utils/global.context";
import Swal from "sweetalert2";
import "../styles/componentStyle/TableData.css";

const TableData = ({ restaurants, setRestaurants }) => {
  const deleteRestaurant = (name, reservations) => {
    reservations?.length >= 1
      ? Alert("error", "El restaurante tiene reservas asignadas!")
      : Swal.fire({
          title: "¿Está seguro que desea eliminar este restaurante?",
          text: "Se eliminará de manera permanente.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar!",
          cancelButtonText:"Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://18.222.87.247:8080/Restaurants/${name}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  Swal.fire(
                    "Eliminado!",
                    "El restaurante ha sido eliminado.",
                    "success"
                  );
                  // Eliminación exitosa, actualizar el estado de los restaurantes
                  //console.log("Restaurante eliminado correctamente");
                  //Alert("success", "Eliminado correctamente");
                  const updatedProducts = restaurants.filter(
                    (item) => item.name !== name
                  );
                  setRestaurants(updatedProducts);
                } else {
                  // Manejar el caso de error en la eliminación
                  console.log("Error al eliminar el restaurante");
                  Alert("error", "No se ha podido eliminar el restaurante 😒");
                }
              })
              .catch((error) => {
                // Manejar el caso de error en la solicitud
                console.log("Error en la solicitud de eliminación", error);
                Alert("error", "No se ha podido eliminar el restaurante 😒");
              });
          }
        });
  };

  return (
    <Table className="ppal_container" striped bordered hover>
      <thead className="encabezado">
        <tr className="items_tabla">
          {/*<th>#</th>*/}
          <th>Nombre</th>
          <th>Ciudad</th>
          <th>Categoria</th>
          <th>Eliminar</th>
          {/* <th>Imagen</th> */}
        </tr>
      </thead>
      <tbody>
        {restaurants.map((item, i) => {
          return (
            <tr key={i}>
              {/*<td>{item.id}</td>*/}
              <td>{item.name}</td>
              <td>{item.city}</td>
              <td>{item.category}</td>

              {/* <td>{ item.fileImages[0]}</td> */}
              <td>
                <button
                  className="boton-eliminar"
                  onClick={() => deleteRestaurant(item.name, item.reservations)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableData;
