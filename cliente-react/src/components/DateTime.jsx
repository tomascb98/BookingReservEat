import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/componentStyle/DateTime.css'
import { useNavigate } from "react-router";
import { useContextGlobal } from "../utils/global.context";


const DateTime = ({product}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(startDate)

  const { horarioReserva, setHorarioReserva} = useContextGlobal()
  console.log(product)


  const navegar = useNavigate()

  const getAvailableTimes = () => {
    const availableTimes = [];
    const startHour = 11;
    const endHour = 23;
     // Intervalo en minutos

    for (let hour = startHour; hour <= endHour; hour++) {
      availableTimes.push(setHours(setMinutes(new Date(), 0), hour));
    }

    return availableTimes;
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    {localStorage.getItem('jwt') ? navegar('/Reserva/'+ product) : navegar('/login')}
    // setHorarioReserva(date)
   
  }
  console.log(horarioReserva)
 

  return (
    <>
    <div className="containerDateMap">
    <h2 className="date-title">Reserveat una fecha</h2> 
    
    
    <div className="date-container">  
    <form action="">
      <div  className="dateAndTime">
      
        
        <DatePicker
        selected={horarioReserva}
        onChange={(time) => setHorarioReserva(time)}
        showTimeSelect
        timeIntervals={120}
        timeCaption="Time"
        dateFormat="yyyy-MM-dd h:mmaa"
        filterTime={filterPassedTime}
        includeTimes={getAvailableTimes()}
        minDate={new Date()}
        inline
        />
      </div>
      <button className="btnReserv" onClick={handleSubmit}>Reserveat una fecha</button>
      </form>
    </div>
    
    </div>
    </>
    
    
  );
};

export default DateTime;