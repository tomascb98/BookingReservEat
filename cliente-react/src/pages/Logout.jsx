import {useContext} from 'react'
import { AuthContext } from '../utils/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "../styles/pagesStyles/Logout.css";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faUtensils } from "@fortawesome/free-solid-svg-icons";

export const Logout = () => {

  const { user, setUser, setIsLoggedin, userData, setUserData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user')
      //setIsLoggedin(false);
      setUser({ email:'', password: '' });
    }    

    /**/const valores = JSON.parse(localStorage.getItem('user'))
    // const name = valores.firstname;
    // const lastname = valores.lastname;

    const navegar = useNavigate()
    
    const handleClick = () => {
      navegar("/gestion")
      if (userData.role !== "ROLE_ADMIN") {
        setIsOpen(!isOpen)
      }
    }
    const handleReserve = () =>{
      navegar("/Reserves")
    }

  return (

    
    <div className='profile'>
      <div className={`dark__when__opening ${isOpen ? 'open' : 'close'}`}></div>
      <div className={`profile__panel ${isOpen ? 'open' : 'close'}`}>
        <ul className='profile__panel--options' >
          <Link><FontAwesomeIcon icon={faUser} style={{color: "#ff441f",}} />Mi Perfil</Link>
          <Link onClick={() => setIsOpen(!isOpen)} to={'/favoritos'}><FontAwesomeIcon icon={faHeart} style={{color: "#ff441f",}}/>Mis Favoritos</Link>
          <Link onClick={() => setIsOpen(!isOpen)} to={'/Reserves'}><FontAwesomeIcon icon={faUtensils} style={{color: "#ff441f"}}  />Mis Reservas</Link>
        </ul>
      </div>
      
      <div className='profile_avatar'>
        <button onClick={()=> handleClick()} className='avatar'> {//userData.firstname.charAt(0).toUpperCase() + userData.lastname.charAt(0).toUpperCase()
        // name.charAt(0).toUpperCase() +''+lastname.charAt(0).toUpperCase()
        localStorage.getItem('user')!=null ? (valores.firstname.charAt(0).toUpperCase() +''+valores.lastname.charAt(0).toUpperCase()) : ""
      }</button>
      </div>
      <p className='profile_name'>{//userData.firstname +' '+userData.lastname
      //name +' '+ lastname
      localStorage.getItem('user')!=null ? (valores.firstname +' '+valores.lastname) : ""
      }</p>
        
      <Link to='/' className='font_logout' onClick={handleLogout}>
        Cerrar sesión
      </Link>
  </div>
  )
}
