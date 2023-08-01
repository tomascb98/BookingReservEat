import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/pagesStyles/ProductPage.css';
import ProductDetail from '../components/ProductDetail';
import { useContextGlobal } from "../utils/global.context";



const ProductPage = () => {

  const { id } = useParams();
  const { restaurants } = useContextGlobal();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(restaurants.length > 0){
      setLoading(false);
    }
  }, [restaurants])

  const selected = restaurants.find((item) => item.id == id)

  return (
    <div className='product__container'>
      
      
      
      <section className="product__info">
        {
        !loading && <ProductDetail product={selected} /> 
        
        }
        
      </section>

    </div>
  )
}

export default ProductPage