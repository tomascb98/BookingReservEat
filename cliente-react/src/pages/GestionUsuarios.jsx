import React, { useState } from "react";
import { useContextGlobal } from "../utils/global.context";
import { Alert } from "../components/alert";
import "../styles/pagesStyles/GestionUsuarios.css";

const GestionUsuarios = () => {
  const { users, roles, setRoles, setUsers } = useContextGlobal();
  const [newRole, setNewRole] = useState({"role":""})

  const [id, setId] = useState(0);
  const [role, setRole] = useState(null);
   /*const [userRole, setUserRole] = useState({
     firstname: "",
     lastname: "",
     role: "",
   });*/
  
  
  //Crear nuevo rol
   const createNewRole = () => {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRole),
    };

    fetch("http://18.222.87.247:8080/users/role/create", payload)
      .then((res) => {
        if (res.ok == true) {
          Alert("success", "Rol registrado correctamente 👌")
          console.log("Rol registrado");
          setTimeout(()=>window.location.reload(), 2100)
          res.json();
        }
      })
      .catch((err) => {
        console.log(err);
        Alert("error", "Error al realizar el registro! 😒");
      });
   }

   const handleCreateNewRole = () => {
    //e.preventDefault()

    //Validación de campo
    // No se permiten espacios, la cadena comienza con "ROLE_", se permiten solo mayusculas (de 4 a 10 letras despues de "ROLE_")
    const regex = /^ROLE_[A-Z]{4,10}$/;
    if(regex.test(newRole)){
      console.log("formato permitido")
      createNewRole()
    } else {
      console.log("formato no permitido")
      return
    }
   }


   // Modificar rol
  const changeRole = (id, role) => {
    
    const payload = {
      method: "PUT",
    };

    fetch(`http://18.222.87.247:8080/users/role/${id}/${role}`, payload)
      .then((res) => {
        if (res.ok == true) {
          Alert("success", "Role actualizado correctamente! 👌");
          console.log("Rol actualizado");
          setTimeout(()=>window.location.reload(), 2100)
          res.json(); 
        }
        
      })
      .catch((err) => {
        Alert("error", "Error al actualizar el rol del usuario 😒");
        console.log(err);
      });
  };

  const saveChanges = () => {
    changeRole(id, role);
  };



  return (
    <div className="users__admin" >
      <label>
        <p>Crear nuevo rol</p>
        <input  type="text" onChange={(e) => setNewRole(e.target.value)} placeholder="ROLE_<NUEVO ROL>" />
        <button onClick={handleCreateNewRole}>Crear</button>
      </label>

      <table className="ppal-container">
        <thead className="encabezado">
          <tr className="items-tabla">
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => {
              return (
                <tr key={i}>
                  <td
                    value={user.firstname}
                    /*onChange={() =>
                      setUserRole({ ...user, firstname: user.firstname })
                    }*/>
                    {user.userName}
                  </td>
                  <td
                    value={user.lastname}
                    /*onChange={() =>
                      setUserRole({ ...user, lastname: user.lastname })
                    }*/>
                    {user.userLastname}
                  </td>
                  <td>
                    <select value={user.role} onChange={(e) =>{
                        /*setUserRole({ ...user, role: e.target.value })*/
                        setId(user.id)
                        setRole(e.target.value)
                        console.log(user.id)
                        console.log("rol: "+e.target.value)}}>

                      {roles.map(rol => <option key={rol.id} value={rol.role} > {rol.role} </option>)} 
                    </select>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button
        className="save__changes"
        onClick={saveChanges}>
        Guardar Cambios
      </button>
    </div>
  );
};

export default GestionUsuarios;