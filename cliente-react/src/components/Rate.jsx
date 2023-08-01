import { useEffect, useState } from 'react';
import { useContextGlobal } from '../utils/global.context';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Rate = ({product}) => {
  const [value, setValue] = useState(0)
  const { rating, setRating } = useContextGlobal();


  useEffect(()=>{ 
      fetch(`http://18.222.87.247:8080/Restaurants/rating/${product.id}`)
      .then((res) => {
          // console.log(res);
          if(res.ok){
            return res.json();
          }
      })
      .then((data) => {
          if(!isNaN(data)){
            setRating(Number(data).toFixed(2))
            console.log("data "+ data)
          }
          //esto da error si el restaurante no tiene rating
          //setRating(data)
      })
      .catch((err) => {
          console.log("error: "+err.message);
      });
  })
 

  const ratingRestaurant = (valor) => {
    fetch(`http://18.222.87.247:8080/Restaurants/${product.id}/${valor}`, { method: "POST"})
      .then((res) => {
        if (res.ok == true) {
          console.log("Puntaje "+valor+" registrado 👌");
          res.json();
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Promedio: {rating}</Typography>
      {localStorage.getItem('jwt')?
        // usuario logueado => puede puntuar restaurante. usuario no logueado => no puede

      <Rating
        name="simple-controlled"
        value={rating} 
        precision={0.1}
        onChange={(event, newValue) => {
          /**/setValue(Math.round(newValue));
          console.log("value onChange:"+Math.round(value))
          console.log("newValue: "+ Math.round(newValue))
          if(newValue>=1){
            ratingRestaurant(Math.round(newValue))
          }
        } }    
      /> 
      :
      <Rating name="read-only" value={rating} precision={0.1} readOnly />
    }
    </Box>
  )
}

export default Rate