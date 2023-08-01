import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import AddRestaurant from "./pages/AddRestaurant";
import ProductDetail from "./components/ProductDetail";
import ProductPage from "./pages/ProductPage";
import TodosLosRestaurantes from "./pages/TodosLosRestaurantes.jsx";
import AllRestaurantes from "./pages/AllRestaurants";
import Login from "./pages/Login";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import Category from "./pages/Category";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GestionAdmin from "./pages/GestionAdmin";
import NewCategory from "./pages/NewCategory";
import Confirmacion from "./pages/Confirmacion";
import GestionUsuarios from "./pages/GestionUsuarios";
import TableDataCiudades from "./components/TableDataCiudades";
import AddCity from "./pages/AddCity";
import Favoritos from "./components/Favoritos";
import TableDataCategories from "./components/TableDataCategories";
import TableDataPolicies from "./components/TableDataPolicies";
import ReserveResponse from "./pages/ReserveResponse";
import ReserveUser from "./pages/ReserveUser";
import Reserva from './pages/Reserva';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrarUsuario />} />
        {/* <Route path='/categoria' element={<NewCategory/>}/> */}
        <Route path="/users/users/email/:id" element={<Confirmacion />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/add" element={<AddRestaurant />} />
          <Route path="/gestion" element={<GestionAdmin />} />
          <Route path="/gestion/categorias" element={<NewCategory />} />
          <Route
            path="/gestion/eliminarCategoria"
            element={<TableDataCategories />}
          />
          <Route path="/gestion/ciudades" element={<TableDataCiudades />} />
          <Route path="/gestion/addCiudad" element={<AddCity />} />
          <Route path="/gestion/usuarios" element={<GestionUsuarios />} />
          <Route path="/gestion/politicas" element={<TableDataPolicies />} />
        </Route>

        <Route path="/Reserves" element={<ReserveUser />} />
        <Route
          path="/todosLosRestaurantes"
          element={<TodosLosRestaurantes />}
        />
        <Route path="/product" element={<ProductPage />}>
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="/Reserva/:restaurantName" element={<Reserva/>} />
        <Route path="/reservas/:response" element={<ReserveResponse />} />
        <Route path="/restaurantes" element={<AllRestaurantes />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
