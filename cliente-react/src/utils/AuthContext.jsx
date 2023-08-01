import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [reserves, setReserves] = useState([])

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch(`http://18.222.87.247:8080/favorites/all/${userData.id}`);
        const info = await response.json();
        setFavorites(info);
        console.log(info);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }
    if (userData) {
      fetchFavorites();
    }
  }, [userData]);

  const toggleFavorite = async (productId) => {
    try {
      const isFavorite = favorites.some((favorite) => favorite.id === productId);

      if (isFavorite) {
        await fetch(`http://18.222.87.247:8080/favorites/delete/${userData.id}/${productId}`, {
          method: 'DELETE',
        });
        setFavorites(favorites.filter((favorite) => favorite.id !== productId));
      } else {
        await fetch(`http://18.222.87.247:8080/favorites/${userData.id}/${productId}`, {
          method: 'POST',
        });
        setFavorites([...favorites, { id: productId }]);
      }
    } catch (error) {
      console.error('Error al marcar como favorito:', error);
    }
  };

  useEffect(() => {
    async function fetchReserves() {
      try {
        const response = await fetch(`http://18.222.87.247:8080/Reserves/reserves/${userData.id}`);
        const info = await response.json();
        setReserves(info);
        console.log(info);
      } catch (error) {
        console.error('Error fetching Reserves:', error);
      }
    }
    if (userData) {
      fetchReserves();
    }
  }, [userData]);

  const data = {
    user,
    setUser,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    favorites,
    toggleFavorite,
    reserves
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
