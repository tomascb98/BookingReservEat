import "../styles/componentStyle/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faWifi,
  faPaw,
  faCar,
  faLocationDot,
  faSmoking,
  faSnowflake
} from "@fortawesome/free-solid-svg-icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";
import { useNavigate } from "react-router-dom";
import Galery from "./Galery";
import Policies from "./Policies";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import DateTime from "./DateTime";
import Rate from "./Rate";
import { useContext } from "react";
import { useContextGlobal } from "../utils/global.context";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "250px",
};


const ProductDetail = ({ product }) => {
  const navegar = useNavigate();
  const back = () => navegar("/");
  console.log(product)

  const { featureIds } = useContextGlobal();
  console.log(featureIds);

  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDsJ3oNaIm0jW1cJGUGho9v_FWo6Se_EYQ",
    libraries: libraries,
  });

  // Capturamos los ids dentro de featuresIds
  // const arr = [];
  // const idsFeatures = featureIds.filter((feature) => feature.id == product.feature_ids[feature.id]);
  // console.log(idsFeatures);

  useEffect(() => {
    if (isLoaded && product.address) {
      // Geocodificación de la dirección para obtener las coordenadas
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { address: `${(product.city, product.address)}` },
        (results, status) => {
          if (status === "OK" && results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            setMapCenter({ lat: lat(), lng: lng() });
          }
        }
      );
    }
  }, [isLoaded, product.address]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const urlSite = window.location.href;
  console.log(urlSite);

  
  const getFacilityIcon = (featureIds) => {
    let icon;
    switch (featureIds.name) {
      case "Estacionamiento":
        icon = faCar;
        break;
      case "Mascotas":
        icon = faPaw;
        break;
      case "Fumadores":
        icon = faSmoking;
        break;
      case "Wi-Fi Libre":
        icon = faWifi;
        break;
      case "Aire Acondicionado":
      icon = faSnowflake;
      break;
      default:
        break;
    }
    return icon;
  };
  

  return (
    <div style={{minHeight:'100vh'}}>
      <div className="product__details">
        <div className="product__details_top">
          <h1 className="product__details_title">
            Restaurante <br />
            {product.name}
          </h1>
          <FontAwesomeIcon
            className="icon-left"
            icon={faCircleArrowLeft}
            onClick={back}
          />
        </div>
        <div className="product__details-stars">
          <div className="left-side-stars">
            <FontAwesomeIcon icon={faLocationDot} color="#ffffff" />
            {product.city + ", " + product.address}
          </div>

          <Rate product={product} />
        </div>

        <div className="product__details--desc">
          <div className="img-ppal-container">
            <img
              className="product__details-img-ppal"
              src={product.urlImages[0]}
              alt="imagen del producto"
            />
          </div>

          <div className="img-second">
            {product.urlImages.map((img, i) => {
              if (product.urlImages.indexOf(img) < 4) {
                return <img src={img} alt={img.name} className="img" key={i} />;
              }
              return null;
            })}
          </div>
        </div>

        <div className="product-more">
          <Galery product={product} />
        </div>

        <div className="aboutUs-share">
          <div className="leftSide-share">
            <div className="socialMediaSharing-container">
              <WhatsappShareButton
                url={urlSite}
                title={
                  "¡Mira este restaurante que he encontrado en ReservEat!, reservamos en " +
                  product.name.toUpperCase() +
                  "?"
                }
              >
                <WhatsappIcon size={50} round={true} />
              </WhatsappShareButton>
              <FacebookShareButton
                url={urlSite}
                quote={
                  "¡Mira este restaurante que he encontrado en ReservEat!, reservamos en " +
                  product.name.toUpperCase() +
                  "?"
                }
              >
                <FacebookIcon size={50} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                url={urlSite}
                title={
                  "¡Mira este restaurante que he encontrado en ReservEat!, reservamos en " +
                  product.name.toUpperCase() +
                  "?"
                }
              >
                <TwitterIcon size={50} round={true} />
              </TwitterShareButton>
            </div>   

            <div className="product__details--address">
              <h2>Sobre nosotros</h2>
              <p>{product.description}
                {/*Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                voluptatem necessitatibus, laboriosam error dolore minima repellat,
                pariatur est quibusdam cum quam rerum vel, inventore quasi fuga
                cumque beatae architecto. Aspernatur.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit accusantium ea 
                7perferendis, sequi odio dolores voluptatem perspiciatis. Perferendis 
                ab repellat reprehenderit magni, recusandae fugit in explicabo quibusdam necessitatibus 
                eveniet. Error.
                cumque beatae architecto. Aspernatur.*/}
              </p>
            </div>
          </div>

          <DateTime product={product.name}/>
        </div>
      </div>
      
      

      <div className="information-container">
      <div className="caracteristicas">
        <h2 className="caracteristic-title">Este lugar cuenta con...</h2>
        <div className="contenedorCaracteristicas">
          {product.feature_ids.map((feature, i) => {
            return (
              <div className="caracteristic" key={i}>
                <FontAwesomeIcon icon={getFacilityIcon(featureIds[feature - 1])}  />
            
                {feature.id}
                <p >{featureIds[feature - 1].name}</p>
              </div>
            );
          })}
        </div>
        
      </div>
      
      
        <div className="dateTime">
          <h2>Donde puedes encontranos</h2>
          {isLoaded && (
            
            <GoogleMap className="map-restaurant"
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              center={mapCenter}
              height={200}
              
            >
              
              <Marker position={mapCenter} />
            </GoogleMap>
          )}{" "}
        </div>
      </div>
      <Policies product={product} />
    </div>
  );
};

export default ProductDetail;
