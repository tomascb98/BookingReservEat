import React from 'react'
import '../styles/componentStyle/Paginacion.css'

const Paginacion = ({nPages, page, setPage}) => {

    const next = () =>{
        if(page < nPages) setPage(page + 1)
    }
    const previous = () =>{
        if(page > 1) setPage(page-1)
    }
  return (
    <div className='pag-container'>
        <button className='pag-boton' onClick={previous}>anterior</button>
        <h3 className='pag-numbers'>{page } de { nPages}</h3>
        <button className='pag-boton' onClick={next}>siguiente</button>
    </div>
  )
}

export default Paginacion
