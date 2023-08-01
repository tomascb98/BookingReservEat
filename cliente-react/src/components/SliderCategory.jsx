import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/componentStyle/SliderCategory.css";
import CategoryCard from "./CategoryCard.jsx";
import { useContextGlobal } from "../utils/global.context";

const SliderCategory = ({ filterCity, horarioReserva }) => {
  const { categories, restaurants } = useContextGlobal();

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
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 2000, min: 1450 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1450, min: 1100 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1100, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  const findRestaurant = restaurants.filter(
    (res) =>
      res.city_id === filterCity &&
      !res.reserves.includes(formatDate(horarioReserva))
  );
  const select = findRestaurant.map((restaur) => restaur.category_id);
  const newArr = [...new Set(select)];

  return (
    <div>
      <h2 className="container-title">Categorías</h2>
      <div className="container-slider">
        <Carousel responsive={responsive} className="container-slider-carousel">
          {filterCity === undefined
            ? categories.map((category, i) => (
                <CategoryCard key={i} category={category} />
              ))
            : categories.map((cat, i) =>
                newArr.includes(cat.id) ? (
                  <CategoryCard key={i} category={cat} />
                ) : null
              )}
        </Carousel>
      </div>
    </div>
  );
};

export default SliderCategory;
