import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useContextGlobal } from '../utils/global.context';
import '../styles/pagesStyles/Restaurantes.css';
import Paginacion from '../components/Paginacion';
import { useNavigate, useParams } from 'react-router-dom';

const Favoritos = () => {
  const { favorites, userData, toggleFavorite } = useContext(AuthContext);
  const { restaurants } = useContextGlobal();
  const [data, setData] = useState(6);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const [favoriteMap, setFavoriteMap] = useState({});

  useEffect(() => {
    if (userData && favorites) {
      const favoriteMap = {};
      favorites.forEach((favorite) => {
        favoriteMap[favorite.id] = true;
      });
      setFavoriteMap(favoriteMap);
    }
  }, [favorites, userData]);

  const indexFinal = page * data;
  const indexInicial = indexFinal - data;

  const filteredRestaurants = restaurants.filter((restaurant) => favoriteMap[restaurant.id]);
  const nRestaurants = filteredRestaurants.slice(indexInicial, indexFinal);
  const nPages = Math.ceil(filteredRestaurants.length / data);

  const navigate = useNavigate();

  const handleToggleFavorite = (productId) => {
    if (userData.role === 'ROLE_USER') {
      toggleFavorite(productId);
      setFavoriteMap((prevFavoriteMap) => {
        const updatedFavoriteMap = { ...prevFavoriteMap };
        delete updatedFavoriteMap[productId];
        return updatedFavoriteMap;
      });
    } else {
      console.error('El usuario debe estar autenticado como usuario para marcar un producto como favorito.');
    }
  };

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={{minHeight: '100vh'}} className='container-favoritos'>
      <div style={{ marginTop: 90, display: 'flex', justifyContent: 'center' }} className='title-container'>
        <h1 className='favoritos-title'>Tus restaurantes favoritos</h1>
      </div>
      <div className='all-container' style={{minHeight: '90vh'}}>
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

export default Favoritos;
