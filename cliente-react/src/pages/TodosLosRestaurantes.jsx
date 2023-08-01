
// import '../styles/pagesStyles/ProductPage.css';
// import ProductDetail from '../components/ProductDetail';
import { useContextGlobal } from "../utils/global.context";
import TableData from '../components/TableData';
import '../styles/pagesStyles/TodosLosRestaurantes.css'


const TodosLosRestaurantes = () => {

  const { restaurants, setRestaurants } = useContextGlobal();

  return (
    <div style={{minHeight: '100vh'}} className='container-eliminar'>
      <h2 className='eliminar-title'>Elimina un Restaurante</h2>
    <TableData restaurants={restaurants} setRestaurants={setRestaurants} />

    </div>
  )
}

export default TodosLosRestaurantes;