import { StaticDatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/pagesStyles/Reserva.css'
import { AuthContext } from '../utils/AuthContext';
import { useContextGlobal } from '../utils/global.context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ModalReserva from '../components/ModalReserva';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { esES } from '@mui/x-date-pickers/locales';

dayjs.extend(utc);
dayjs.extend(timezone);

const Reserva = () => {
    const {horarioReserva, setHorarioReserva} = useContextGlobal()
    const fechaLocal = dayjs.utc(horarioReserva).tz('America/Bogota').format('YYYY-MM-DD')
    const horaLocal = dayjs.utc(horarioReserva).tz('America/Bogota').format('HH:mm');

    const {restaurantName} = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [restaurantImage, setRestaurantImage] = useState(null);

    const [fecha, setFecha] = useState(fechaLocal)
    const [hora, setHora] = useState(horaLocal)

    const {user, userData} = useContext(AuthContext)
    
    const [reserva, setReserva] = useState({
        firstName: userData.firstname,
        lastName:userData.lastname,
        user_id: JSON.parse(localStorage.getItem("user")).id,
        numberPhone: "",
        dateTime: "",
        restaurant_id:""
    })
    
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleModal= () => {
        setReserva({...reserva, 
            dateTime: `${fecha} ${hora}`,
            restaurant_id:restaurant.id})
        setIsOpen(true);
    }


    const shouldDisableTime = (value, view) => {
        if (view === 'hours') {
          const selectedDate = dayjs(value).format('YYYY-MM-DD');
          const selectedHour = dayjs(value).format('HH:mm');
          
          // Verificar si el objeto restaurant tiene la propiedad "reserves"
          if (restaurant?.reserves) {
            // Buscar si la fecha y hora seleccionadas coinciden con alguna reserva
            const isReserved = restaurant.reserves.find((reserve) => {
              const reserveDate = dayjs(reserve).format('YYYY-MM-DD');
              const reserveHour = dayjs(reserve).format('HH:mm');
              return reserveDate === selectedDate && reserveHour === selectedHour;
            });
            
            // Devolver true si la hora está reservada, para deshabilitarla
            return isReserved;
          }
        }
        
        return false; // Habilitar todas las demás horas
      };

    const handleNavigate = () => {
        navigate(`/product/${restaurant.id}`);
      };
    const back = () => navegar(`/product/${restaurant.id}`);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`http://18.222.87.247:8080/Restaurants/${restaurantName}`);
                const restaurantJson = await response.json();
                setRestaurant(restaurantJson);
                
                setReserva({...reserva, restaurant_id:restaurant.id})
                console.log(reserva)
                if (restaurantJson.urlImages && restaurantJson.urlImages.length > 0) {
                    setRestaurantImage(restaurantJson.urlImages[0]);
                  }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },[""])
    console.log(restaurant);

    return (
        <div className="product__details">


        <div className="product__details_top">
            <h1 className="product__details_title">
                    Restaurante <br />
                    {restaurant.name}
            </h1>
                <FontAwesomeIcon
                    className="icon-left"
                    icon={faCircleArrowLeft}
                    onClick={handleNavigate}
                />
            </div>


        <div className='reserva-container'>

            <div className='datos-reserva-container'>
                <div className='datos-usuario'>
                    {/* kareeeeen */}
                    <h3>Datos de Reserva</h3>
                    <form onSubmit={"handleSubmit"}>
                    <label >
                            Nombre
                            <input 
                                type="text" 
                                name="nombre" 
                                className="nombre-input"
                                value={userData.firstname}
                                onChange={(e) =>
                                       setReserva({...reserva, firstName: e.target.value})}
                            />
                        </label>
                        <label >
                            Apellido
                            <input 
                                type="text" 
                                name="apellido" 
                                className="apellido-input"
                                value={userData.lastname}
                                onChange={(e) =>
                                    setReserva({...reserva, lasttName: e.target.value})}
                            />
                        </label>
                        <label >
                            Correo
                            <input 
                                type="text" 
                                name="correo" 
                                className="correo-input"
                                value={JSON.parse(localStorage.getItem("user")).user}
                                readOnly
                            />
                        </label>
                        <label >
                            Numero de celular
                            <input 
                                type="text" 
                                name="correo" 
                                className="numero-input"
                                onChange={(e) =>
                                    setReserva({...reserva, numberPhone: e.target.value})}
                            />
                        </label>
                    </form>
                </div>
                <div className='date-picker-reserva-container'>
                    <LocalizationProvider
                        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                            <StaticDatePicker orientation="portrait"
                            defaultValue={dayjs(fecha)}
                            minDate={dayjs()}
                            onChange={(newValue)=> {
                                let date = new Date(newValue.$d)
                                setHorarioReserva(date.toISOString().split('T')[0])
                                setFecha(date.toISOString().split('T')[0])
                            }}
                            />
                    </LocalizationProvider>
                </div>
                <div className='hora-reserva-container'>
                    <LocalizationProvider
                        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                        <TimePicker views={['hours']}
                        value={dayjs(horarioReserva)}
                        shouldDisableTime={shouldDisableTime}
                        onChange={(newValue)=> {
                            let date = new Date(newValue.$d)
                            date.setHours(date.getHours()-5)
                            setHora(date.toISOString().split('T')[1].split('.')[0].slice(0,5))
                        }}
                    />
                    </LocalizationProvider>

                </div>
            </div>    
            <div className='detalle-restaurante-container'>
                {/* kareeeeen */}
                <h3>Detalle de la reserva</h3>

                <div className='wide-card'>
                    <h3>{restaurant.name}</h3>
                    <p>Ubicación: <span>{restaurant.address}</span></p>
                    <p>Ciudad: <span>{restaurant.city}</span></p>
                    

                    <p>Fecha: <span>{fecha}</span></p>
                    <p>Hora: <span>{hora}</span></p>
                    {restaurantImage && <img src={restaurantImage} alt={restaurant.img} />}
                    <button onClick={handleModal} className={"confirmar-btn"}>Confirmar Reserva</button>
                </div>
            </div>
            {isOpen && <ModalReserva isOpen={isOpen} reserva={reserva} restaurant={restaurant}/>}
        </div>
        </div>
    )
}

export default Reserva