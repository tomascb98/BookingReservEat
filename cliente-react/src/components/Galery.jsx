
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import "../styles/componentStyle/Galery.css"





const Galery = ({product}) => {
  const [open, setOpen] = useState(false);
  const arr = []
  console.log(arr)

  return (
    <>
      <button className="boton-verMas" type="button" onClick={() => setOpen(true)}>
        Ver mas
      </button>
      {product.urlImages.map((img)=>{
        arr.push({src:img, width: 500, height: 500})
      }
)}

      <Lightbox className="images-galery"
        open={open}
        close={() => setOpen(false)}
        slides={arr}
        
        
        
      />
    </>
  );
};

export default Galery;