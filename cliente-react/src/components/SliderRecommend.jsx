import React from 'react';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router';
import { useContextGlobal } from '../utils/global.context';
import RecommendedCard from './RecommendedCard';
import '../styles/componentStyle/RecommendStyle.css';

const SliderRecommend = ({ filterCity, horarioReserva }) => {
  const { restaurants } = useContextGlobal();

  const formatDate = (date) => {
    const fecha = new Date(date);
    const anio = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    const dia = ("0" + fecha.getDate()).slice(-2);
    const hora = ("0" + fecha.getHours()).slice(-2);
    const minutos = ("0" + fecha.getMinutes()).slice(-2);
    const segundos = ("0" + fecha.getSeconds()).slice(-2);
    
    const formatoISO8601 = `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
    
    return formatoISO8601;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const navegar = useNavigate();

  const verTodos = () => {
    navegar('/restaurantes');
  };

  const ramdomRestaurant = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const random = ramdomRestaurant(restaurants);
      
  return (
    <div>
      <h2 className='container-title'>Recomendados</h2>
      <button className='allProducts' onClick={verTodos}>Ver todos los Restaurantes</button>
      <div className='container-slider'>
        <Carousel responsive={responsive} className='container-slider-carousel'>
          {random.map((res) => {
            if (!filterCity && !horarioReserva) {
              return <RecommendedCard key={res.id} res={res} />;
            } else if (filterCity === res.city_id && !res.reserves.includes(formatDate(horarioReserva))) {
              return <RecommendedCard key={res.id} res={res} />;
            } else if (!filterCity && horarioReserva && !res.reserves.includes(formatDate(horarioReserva))) {
              return <RecommendedCard key={res.id} res={res} />;
            }
            
            return null;
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default SliderRecommend;
