import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../utils/AuthContext";
import { Logout } from "../pages/Logout";
import logo from "../assets/logo.png";
import "../styles/componentStyle/Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState(true);

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user, isLoggedin } = useContext(AuthContext);

  return (
    <>
      <div className="navbar">
        <div className="up">
          <Link className="navbar_left" to="/">
            <img src={logo} alt="logo" className="logo" />
            <p className="navbar_slogan">Una vida sin filas</p>
          </Link>
          <div className="botones">
            <FontAwesomeIcon
              icon={faBars}
              onClick={showMenu}
              className="menu_hamburger"
              style={{ color: "#fd7155" }}
            />

            {!localStorage.getItem('jwt') ? (
              <>
                <Link to="/login">
                  <button className="button_session">Ingresar</button>
                </Link>
                <Link to="/register">
                  <button className="button_session">Registrarse</button>
                </Link> 
              </>
            ) : (
              <Logout />
            )}
          </div>
        </div>

        <div className={`${!menu && "bg-open"}` }></div>
        <div className={`menu_mobile ${menu && "open"} `}>
        {!localStorage.getItem('jwt') ? <>
            <div className="menu_mobile-login">
              <FontAwesomeIcon
                className="menu_mobile-icons"
                icon={faRightToBracket}
                style={{ color: "#ff441f" }}
              />
              <Link to="/login">
                <button className="button_session">Ingresar</button>
              </Link>
            </div>
            <div className="menu_mobile-register">
              <FontAwesomeIcon
                className="menu_mobile-icons"
                icon={faUserPlus}
                style={{ color: "#ff441f" }}
              />
              <Link to="/register">
                <button className="button_session">Registrarse</button>
              </Link>
            </div>
          </> :
            "Perfil"
            }
        </div>
      </div>
    </>
  );
};

export default Navbar;
