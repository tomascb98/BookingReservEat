import React, {useState, useEffect} from 'react';
import '../styles/pagesStyles/ReserveResponse.css';
import { faStar, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';

const ReserveResponse = () => {

  const { response } = useParams();
  // console.log(response)
  const [status, setStatus] = useState();
  const navigate =useNavigate();

  useEffect(() => {
    if (response === 'true') {
      setStatus(true);
    } else {
      setStatus(false);
    }
  },[])

  const handleClick = () => {
    navigate("/")
  }

  return (
    <section className='reserve__response__container'>
      <div className="card">
        <div className="card--icon">
        <FontAwesomeIcon icon={status ? faStar : faCircleExclamation} style={{ color: "#ff441f", width:'80px', height:'80px' }} />
        </div>
        <div className="card--text">
          <h4>{`${status ? '!Muchas Gracias!' : 'Hubo un error'}`}</h4>
          <p></p>
          <p>{`${status ? 'Su reserva ha sido realizada con éxito' : 'Intente de nuevo mas tarde'}`}</p>
        </div>
        <div className="card--button">
          <button onClick={handleClick}>Ok</button>
        </div>
      </div>
    </section>
  )
}

export default ReserveResponse