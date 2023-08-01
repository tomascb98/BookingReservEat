import React from 'react'
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';
import '../styles/pagesStyles/ReserveUser.css'
import { Table } from 'react-bootstrap'

const ReserveUser = () => {

const { reserves } = useContext(AuthContext);

const sortedReserves = reserves.sort((a, b) => {
    return new Date(b.dateTime) - new Date(a.dateTime);
  });

  const currentTime = new Date()

console.log(reserves);
  return (
    <div className='container-reserve'>
        <h2>Tus Reservas</h2>

        <Table className="ppal_container" striped bordered hover>
      <thead className="encabezado">
        <tr className="items_tabla">
          
          <th>fecha</th>
          <th>Nombre Restaurante</th>
          <th>Contacto</th>
          <th>Telefono</th>
          
        </tr>
      </thead>
      <tbody>
        {sortedReserves.map((reserva)=>{
            return( 
            <tr key={reserva.id}>
                
                {new Date(reserva.dateTime) < currentTime ? <td className='past' >{reserva.dateTime}</td> : <td className='future'  >{reserva.dateTime}</td>}
                <td>{reserva.restaurant_name}</td>
                <td>{reserva.firstName}</td>
                <td>{reserva.numberPhone}</td>
            </tr>
            );
        })}
        </tbody>
      </Table>
    </div> 
  )
}

export default ReserveUser