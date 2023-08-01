import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faUsers, faPlus, faMinus, faTrash, faMapLocationDot, faPlusCircle, faClipboardList } from "@fortawesome/free-solid-svg-icons"
import "../styles/pagesStyles/GestionAdmin.css"
import { useNavigate } from "react-router"

const GestionAdmin = () => {
const navegar = useNavigate()

  return (
    <div className='container-gestion'>
      <br />
      <div className="container-gestion-ppal">

        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/add")}}>
        <FontAwesomeIcon className="gestion-icon" icon={faUtensils} />
            <h2 className="container-gestion-title"> Agregar Restaurante</h2>
        </div>
        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/todosLosRestaurantes")}}>
        <FontAwesomeIcon className="gestion-icon" icon={faTrash}  />
            <h2 className="container-gestion-title"> Eliminar Restaurante</h2>
        </div>
        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/gestion/categorias")}}>
        <FontAwesomeIcon className="gestion-icon" icon={faPlus} />
            <h2 className="container-gestion-title"> Agregar Categoría</h2>
        </div>
        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/gestion/eliminarCategoria")}}>
          <FontAwesomeIcon className="gestion-icon" icon={faMinus} />
          <h2 className="container-gestion-title"> Eliminar Categoría</h2>
        </div>
        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/gestion/addCiudad")}}>
          <FontAwesomeIcon className="gestion-icon" icon={faPlusCircle} />
          <h2 className="container-gestion-title"> Añadir Ciudad</h2>
        </div>
        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/gestion/ciudades")}}>
          <FontAwesomeIcon className="gestion-icon" icon={faMapLocationDot} />
          <h2 className="container-gestion-title"> Gestionar Ciudades</h2>
        </div>
        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/gestion/politicas")}}>
        <FontAwesomeIcon  className="gestion-icon" icon={faClipboardList} />
            <h2 className="container-gestion-title"> Normas y Políticas</h2>
        </div>
        <div className="container-gestion-ppal-card" onClick={()=>{navegar("/gestion/usuarios")}}>
          <FontAwesomeIcon  className="gestion-icon" icon={faUsers} />
            <h2 className="container-gestion-title"> Gestionar Roles</h2>
        </div>
      </div>

    </div>
  )
}

export default GestionAdmin