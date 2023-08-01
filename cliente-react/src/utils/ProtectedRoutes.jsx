import { useContext } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState } from "react";


const ProtectedRoutes = () => {
  const {userData } = useContext(AuthContext);
  const navigate = useNavigate()

const valores = JSON.parse(localStorage.getItem('user'))
console.log(valores)
//const role = valores.role;
//console.log(role)
  if( valores == null || valores.role !== "ROLE_ADMIN"){
    
    return <Navigate to="/" />
    //navigate("/")
  }

  return <Outlet />
};

export default ProtectedRoutes;
