
import logo from "../assets/logo.png";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <img src={logo} alt="logo" />
        <div className="texto">
        <p> Copyright <FontAwesomeIcon className="copyright" icon={faCopyright}/> 2023 Equipo 1 - DH. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
