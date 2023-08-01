import { useEffect, useState, useContext } from "react"
import { useContextGlobal } from "../utils/global.context"
import { useParams } from "react-router"
import '../styles/pagesStyles/Category.css'
import { AuthContext } from '../utils/AuthContext';




const Category = () => {

    const { restaurants } = useContextGlobal()
    const [product, setProduct]= useState([])
    const { id } = useParams() 

    
    useEffect(() => {
        const selectedRestaurants = restaurants.filter((r) => r.category_id == id)
        restaurants.length > 0 && setProduct(selectedRestaurants)
      }, [restaurants, id])

  console.log(product)
  return (
    <div className="container-category">
        <h1 className="container-category-title">{product.length>0 ? product[0].category : "No hay productos en esta categoría"} </h1>
        <div className="container-product">
        {product.map((product) => (
            <div key={product.id} className="container-product-ppal">
                <img src={product.urlImages[0]} alt="" className="container-product-img"/>
                <h1 className="container-product-title">{product.name}</h1>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Category