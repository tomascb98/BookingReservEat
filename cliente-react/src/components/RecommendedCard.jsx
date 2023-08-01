import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/componentStyle/RecommendedCard.css';
import { AuthContext } from '../utils/AuthContext';

const RecommendedCard = ({ res }) => {
  const { toggleFavorite, userData, favorites } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favorites.some((favorite) => favorite.id === res.id));
  }, [favorites, res.id]);

  const handleCategoria = (id) => {
    navigate(`product/${id}`);
  };

  const handleToggleFavorite = async (productId) => {
    if (userData.role === 'ROLE_USER') {
      console.log('Toggling favorite for product ID:', productId);
      try {
        await toggleFavorite(productId);
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      } catch (error) {
        console.error('Error al marcar como favorito:', error);
      }
    } else {
      console.log(userData);
      console.error(
        'El usuario debe estar autenticado como usuario para marcar un producto como favorito.'
      );
    }
  };

  console.log('userData:', userData);
  console.log('favorites:', favorites);
  console.log('isFavorite:', isFavorite);

  return (
    <div className="restaurantCard" onClick={() => handleCategoria(res.id)}>
      <img src={res.urlImages[0]} alt="" />
      <div className='restaurantCard--content'>
        <p>$$-$$$</p>
        <h3 className="nameCard">{res.name}</h3>
        <div className='restaurantCard--info'>
        <h4 className="categoryCard">{res.category}</h4>
        <h4 className="cityCard">Ciudad: {res.city}</h4>
        </div>
        <button
          className={`favoriteButton ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite(res.id);
          }}
        >
          <span className="heartIcon">{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>
    </div>
  );
};

export default RecommendedCard;
