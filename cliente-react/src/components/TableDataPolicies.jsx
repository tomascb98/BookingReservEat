
import { Alert } from "./alert";
import { useContextGlobal } from "../utils/global.context";
import "../styles/componentStyle/TableDataPolicies.css";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import Swal from "sweetalert2";


const TableDataPolicies = () => {
  const { rules, setRules, policies, setPolicies, restaurants } =
    useContextGlobal();
  const [newRule, setRule] = useState({
    name: "",
    description: "",
  });
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    description: "",
  });

  // Crear norma de un restaurante
  const handleSubmitCreateRule = (e) => {
    e.preventDefault();
    createRule();
  };

  const createRule = () => {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRule),
    };

    fetch("http://18.222.87.247:8080/Rules", payload)
      .then((res) => {
        if (res.ok) {
          Alert("success", "Norma creada correctamente");
          setTimeout(() => window.location.reload(), 2100);
        } else {
          Alert("error", "No se ha podido crear norma 😒");
        }
      })
      .catch((error) => {
        Alert("error", "Error al crear norma 😒");
        console.log(error);
      });
  };

  //Crear política de un restaurante
  const handleSubmitCreatePolicy = (e) => {
    e.preventDefault();
    createPolicy();
  };

  const createPolicy = () => {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPolicy),
    };

    fetch("http://18.222.87.247:8080/Policies", payload)
      .then((res) => {
        if (res.ok) {
          Alert("success", "Política creada correctamente");
          setTimeout(() => window.location.reload(), 2100);
        } else {
          Alert("error", "No se ha podido crear política 😒");
        }
      })
      .catch((error) => {
        Alert("error", "Error al crear política 😒");
        console.log(error);
      });
  };

  // Eliminar norma de un restaurante
  const deleteRule = (id) => {
    const hasRestaurantsAssigned = restaurants.find(
      (res) => res.rule_ids.includes(id)
    );

    console.log(hasRestaurantsAssigned);

    hasRestaurantsAssigned
      ? Alert("error", "Hay restaurantes que hacen uso de esta norma")
      : Swal.fire({
          title: "¿Está seguro que desea eliminar esta norma?",
          text: "Se eliminará de manera permanente.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar!",
          cancelButtonText:"Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://18.222.87.247:8080/Rules/${id}`, { method: "DELETE" })
              .then((res) => {
                console.log(res);
                if (res.ok) {
                  Swal.fire(
                    "Eliminado!",
                    "La norma ha sido eliminada.",
                    "success"
                  );
                  //Alert("success", "Norma eliminada correctamente");
                  const updatedRules = rules.filter((item) => item.id !== id);
                  setRules(updatedRules);
                } else {
                  Alert("error", "No se ha podido eliminar norma 😒");
                }
              })
              .catch((error) => {
                console.log("Error al eliminar la norma: " + error);
                Alert("error", "No se ha podido eliminar norma 😒");
              });
          }
        });
  };

  // Eliminar política de un restaurante
  const deletePolicy = (id) => {
    const hasRestaurantsAssigned = restaurants.find(
        (res) => res.policy_ids.includes(id)
      );
  
      console.log(hasRestaurantsAssigned);
  
      hasRestaurantsAssigned

    console.log(hasRestaurantsAssigned);

    hasRestaurantsAssigned
      ? Alert("error", "Hay restaurantes que hacen uso de esta politica")
      : Swal.fire({
          title: "¿Está seguro que desea eliminar esta política?",
          text: "Se eliminará de manera permanente.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar!",
          cancelButtonText:"Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://18.222.87.247:8080/Policies/${id}`, {
              method: "DELETE",
            })
              .then((res) => {
                console.log(res);
                if (res.ok) {
                  Swal.fire(
                    "Eliminado!",
                    "La política ha sido eliminada.",
                    "success"
                  );
                  //Alert("success", "Política eliminada correctamente");
                  const updatedPolicies = policies.filter(
                    (item) => item.id !== id
                  );
                  setPolicies(updatedPolicies);
                } else {
                  Alert("error", "No se ha podido eliminar política 😒");
                }
              })
              .catch((error) => {
                console.log("Error al eliminar política: " + error);
                Alert("error", "No se ha podido eliminar la política 😒");
              });
          }
        });
  };

  return (
    <div className="policies-container">
        {/*Form crear norma */}
        <form onSubmit={handleSubmitCreateRule} className="form-rule">
            <p>Crear norma</p>
            <label >
                Nombre
                <input type="text" value={newRule.name} onChange={(e)=>setRule({...newRule, name:e.target.value} )}/>
            </label>    
            <label>
                Descripción
                <textarea name="" id="" value={newRule.description} onChange={(e)=>setRule({...newRule, description: e.target.value})}></textarea>
            </label>
            <button className='boton-crear'>Crear</button>
        </form>

      {/*Table normas */}
      <Table className="table-policies">
        <thead className="encabezado">
          <tr>
            <td>Nombre</td>
            <td>Descripción</td>
            <td>Eliminar</td>
          </tr>
        </thead>
        <tbody>
          {rules.map((newRule, i) => {
            return (
              <tr key={i}>
                <td>{newRule.name} </td>
                <td>{newRule.description} </td>
                <td>
                  <button
                    className="boton-eliminar"
                    onClick={() => deleteRule(newRule.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/*Form crear política */}
      <form className="form-rule" onSubmit={handleSubmitCreatePolicy}>
        <p>Crear política</p>
        <label>
          Nombre
          <input
            type="text"
            value={newPolicy.name}
            onChange={(e) =>
              setNewPolicy({ ...newPolicy, name: e.target.value })
            }
          />
        </label>
        <label>
          Descripción
          <textarea
            name=""
            id=""
            value={newPolicy.description}
            onChange={(e) =>
              setNewPolicy({ ...newPolicy, description: e.target.value })
            }
          ></textarea>
        </label>
        <button className="boton-crear">Crear</button>
      </form>

      {/*Table políticas */}
      <Table className="table-policies">
        <thead className="encabezado">
          <tr className="items_tabla">
            <td>Nombre</td>
            <td>Descripción</td>
            <td>Eliminar</td>
          </tr>
        </thead>
        <tbody>
          {policies.map((newPolicy, i) => {
            return (
              <tr key={i}>
                <td>{newPolicy.name} </td>
                <td>{newPolicy.description} </td>
                <td>
                  <button
                    className="boton-eliminar"
                    onClick={() => deletePolicy(newPolicy.id)}
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

export default TableDataPolicies;
