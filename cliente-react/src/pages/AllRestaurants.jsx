import { useContextGlobal } from '../utils/global.context';
import '../styles/pagesStyles/Restaurantes.css';
import Paginacion from '../components/Paginacion';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const AllRestaurantes = () => {
  const { favorites, userData, toggleFavorite } = useContext(AuthContext);
  const { restaurants } = useContextGlobal();
  const [data, setData] = useState(6);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const [favoriteMap, setFavoriteMap] = useState({});

  useEffect(() => {
    const favoriteMap = {};
    favorites.forEach((favorite) => {
      favoriteMap[favorite.id] = true;
    });
    setFavoriteMap(favoriteMap);
  }, []);

  const indexFinal = page * data;
  const indexInicial = indexFinal - data;

  const nRestaurants = restaurants.slice(indexInicial, indexFinal);
  const nPages = Math.ceil(restaurants.length / data);

  const navegar = useNavigate();

  const handleToggleFavorite = (productId) => {
    if (userData.role === 'ROLE_USER') {
      toggleFavorite(productId);
      setFavoriteMap((prevFavoriteMap) => ({
        ...prevFavoriteMap,
        [productId]: !prevFavoriteMap[productId]
      }));
    } else {
      console.error(
        'El usuario debe estar autenticado como usuario para marcar un producto como favorito.'
      );
    }
  };

  const handleProduct = (id) => {
    navegar(`/product/${id}`);
  };

  return (
    <div style={{minHeight:'100vh'}}>
      <div style={{minHeight:'100vh'}} className='all-container' >
        {nRestaurants.map((restaurant) => (
          <div className='all-card' key={restaurant.id} onClick={() => handleProduct(restaurant.id)}>
            <div className='card-style'>
              <img className='card-img' src={restaurant.urlImages[0]} alt={restaurant.name} />
              <h2 className='card-title'>{restaurant.name}</h2>
              <button
                className={`favoriteButton ${favoriteMap[restaurant.id] ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(restaurant.id);
                }}
              >
                {favoriteMap[restaurant.id] ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Paginacion page={page} setPage={setPage} nPages={nPages} />
      </div>
    </div>
  );
};

export default AllRestaurantes;
