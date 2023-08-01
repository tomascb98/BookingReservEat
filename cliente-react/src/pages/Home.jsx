import "../styles/pagesStyles/Home.css";
import SliderCategory from "../components/SliderCategory";
import SliderRecommend from "../components/SliderRecommend";
import { useState } from "react";
import SelectHome from "../components/SelectHome";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useContextGlobal } from "../utils/global.context";

const urlSite = window.location.href;

const Home = () => {
  const [filterCity, setFilterCity] = useState();

  const { horarioReserva, setHorarioReserva } = useContextGlobal();

  console.log("horario reserva: " + horarioReserva);

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

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="home-container-first">
        <div className="home-container_buscador">
          <div className="socialMediaSharing-container">
            <WhatsappShareButton
              url={urlSite}
              title={
                "¡Mira este portal para hacer reservas en restaurantes sin hacer filas RESERVEAT, ¡Echale un vistazo!"
              }
            >
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton
              url={urlSite}
              quote={
                "¡Mira este portal para hacer reservas en restaurantes sin hacer filas RESERVEAT, ¡Echale un vistazo!"
              }
            >
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={urlSite}
              title={
                "¡Mira este portal para hacer reservas en restaurantes sin hacer filas RESERVEAT, ¡Echale un vistazo!"
              }
            >
              <TwitterIcon size={30} round={true} />
            </TwitterShareButton>
          </div>
          <h2 className="home-container_buscador_h2">
            Haz tu reserva en tan solo 5 minutos
          </h2>
          <h3 className="home-container_buscador_h3">
            Encuentra los mejores restaurantes a un solo click
          </h3>
          <form className="form-home">
            <SelectHome className="filter" filterCity={filterCity} setFilterCity={setFilterCity} />
            <DatePicker
              className="datepicker-home"
              placeholderText="Selecciona una fecha"
              selected={horarioReserva}
              onChange={(date) => {
                setHorarioReserva(date);
              }}
              showTimeSelect
              timeIntervals={120}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd h:mmaa"
              filterTime={filterPassedTime}
              includeTimes={getAvailableTimes()}
              minDate={new Date()}
            />

            <button
              className="home-container_buscador_boton"
              onClick={handleClick}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <SliderCategory filterCity={filterCity} horarioReserva={horarioReserva} />
      <SliderRecommend
        filterCity={filterCity}
        horarioReserva={horarioReserva}
      />
    </div>
  );
};

export default Home;
