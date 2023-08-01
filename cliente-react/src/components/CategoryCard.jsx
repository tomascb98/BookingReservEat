
import { useNavigate } from 'react-router-dom'


const CategoryCard = ({category}) => {

  // const { id } = useParams()
  
  const navegar = useNavigate()
      const handleCategoria = ( id ) => {
        navegar(`/categories/${id}`);
  }

  // const splitCategory = category.name.split(" ");
  // const url = splitCategory[splitCategory.length - 1];
  

  return ( 
    
    <div className="container-slider-carousel_card"  onClick={() => handleCategoria(category.id)}>
      
      <img src={category.urlImage} alt="imagen de la categoria" />
      <h3 className="container-slaider-carousel_card-h3">{`${category.name}`}</h3>

    </div>

  );
};

export default CategoryCard;
