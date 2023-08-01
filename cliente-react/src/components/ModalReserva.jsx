import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { width } from '@mui/system';
import '../styles/componentStyle/ModalReserva.css'
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalReserva = ({isOpen, reserva, restaurant}) => {
    const [open, setOpen] = useState(isOpen);
    const handleClose = () => setOpen(false);
    const navegate = useNavigate();
  
    const handleReserva = () => {
        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reserva),
        };
  
        fetch(`http://18.222.87.247:8080/Reserves/add`, payload)
        .then((response) => {
          if(response.ok){
            navegate("/Reservas/true")
          } else {
            navegate("/Reservas/false")
          }  
        })
        .catch((error) => {
          console.log("Error al hacer la reserva");
        });
      console.log('Reserva confirmada:');
    }
  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='modalReserva-container'>
              <h2>Resumen de la Reserva:</h2>
              <p>Fecha y hora: <span>{reserva.dateTime}</span></p>
              <p>Restaurante: <span>{restaurant.name}</span></p>
              <p>Dirección: <span>{restaurant.address}</span></p>
              <button onClick={handleReserva} className={"boton-reserva"}>RESERVEAT</button>
            </div>
          </Box>
        </Modal>
      </div>
    );
}

export default ModalReserva