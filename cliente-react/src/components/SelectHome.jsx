// import React, { useState } from 'react'
// // import 'bootstrap/dist/css/bootstrap.min.css'
// import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
// import { useContextGlobal }   from '../utils/global.context'
// import '../styles/componentStyle/SelectHome.css'


// const SelectHome = () => {

//     const { restaurants, cities} = useContextGlobal()

//     const [dropDown, setDropDown] = useState(false)

//     const abrirCerrarDD = () =>{
//         setDropDown(!dropDown)
//     }



//   return (
//     <div className='dropDown-container'>
//         <Dropdown className='dropDown-main' isOpen={dropDown} toggle={abrirCerrarDD}>
//             <DropdownToggle>
//                 <input type="text" className='input-city' placeholder='ciudad' />
//             </DropdownToggle>

//             <DropdownMenu>
//                 {cities.map(city => {dropDown ? <DropdownItem className='item-DD' key={city.id}>{city.name}</DropdownItem> : ""}
//                 )}
//             </DropdownMenu>

//         </Dropdown>
//     </div>
//   )
// }

// export default SelectHome

//recuerda eliminar la libreria reactstrap

import  Select  from 'react-select'
import { useContextGlobal } from '../utils/global.context'
import '../styles/componentStyle/SelectHome.css'
import { useState } from 'react'

const SelectHome = ({filterCity, setFilterCity}) => {

const {cities} = useContextGlobal()
const cityOptions = ['Todos', ...cities]


const handleSelectChange = ({value}) =>{
    setFilterCity(value)
}
console.log(filterCity)

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

  return (
    <div className='select-city-container'>
        <Select className='select-main'
            defaultValue={ {label: "Elije una ciudad", value: "default"}}
            options={cityOptions.map(city => ({label: city.name, value: city.id}))}
            styles={{customStyles}}
            onChange={ handleSelectChange }
        />
          
    </div>
  )
}

export default SelectHome