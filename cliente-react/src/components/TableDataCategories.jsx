import { useContextGlobal } from "../utils/global.context";
import { Table } from "react-bootstrap";
import { Alert } from "./alert";
import Swal from "sweetalert2";

const TableDataCategories = () => {
  const { categories, setCategories, restaurants } = useContextGlobal();

  // restaurants.includes(restaurants.category_id);

  const deleteCategory = (name, id) => {
    const hasRestaurantsAssigned = restaurants.find(
      (res) => res.category_id == id)?.id;

    if (hasRestaurantsAssigned > 0) {
      Alert(
        "error",
        "No se puede eliminar la categoria, ya que tiene restaurantes asignados"
      );
    } else {
      Swal.fire({
        title: "¿Está seguro que desea eliminar esta categoría?",
        text: "Se eliminará de manera permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText:"Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://18.222.87.247:8080/Categories/${name}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire(
                  "Eliminado!",
                  "La categoría ha sido eliminada.",
                  "success"
                );
                console.log("Categoría eliminada correctamente");
                //Alert("success", "Categoría eliminada correctamente");
                const updatedCategories = categories.filter(
                  (item) => item.name !== name
                );
                setCategories(updatedCategories);
              } else {
                console.log("Error al eliminar la categoría");
                Alert("error", "No se ha podido eliminar la categoría 😒");
              }
            })
            .catch((error) => {
              Alert("error", "No se ha podido eliminar la categoría 😒");
              console.log("Error en la solicitud de eliminación", error);
            });
        }
      });
    }
  };

  return (
    <div style={{minHeight:'100vh' , marginTop: '90px'}} className='categoria-container'>
      <h2 className='eliminar-title-categoria'>Eliminar Categoria</h2>
      <Table className="ppal_container" striped bordered hover>
        <thead className="encabezado">
          <tr className="items_tabla">
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="boton-eliminar"
                    onClick={() => deleteCategory(item.name, item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableDataCategories;
