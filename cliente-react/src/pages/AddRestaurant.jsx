import { useEffect, useState } from "react";
import { useContextGlobal } from "../utils/global.context";
import "../styles/pagesStyles/AddRestaurant.css";
import { Alert } from "../components/alert";

const AddRestaurant = () => {
  const { categories, cities, policies, rules, featureIds } = useContextGlobal();
  const [ratingsForm, setRatingsForm] = useState([3]);
  const [imageUrls, setImageUrls] = useState([]);
  const [policiesForm, setPoliciesForm] = useState([]);
  const [rulesForm, setRulesForm] = useState([]);
  const [featuresForm, setFeaturesForm] = useState([]);
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    category: "",
    city_id: "",
    category_id: "",
  });

  console.log(featureIds);

  const [name, setName] = useState("");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", restaurant.description);
  formData.append("address", restaurant.address);
  formData.append("categoryId", restaurant.category_id);
  formData.append("cityId", restaurant.city_id);
  formData.append("reservations",0)
  imageUrls.forEach((element) => {
    formData.append("fileImages", element);
  });
  ratingsForm.forEach((element) => {
    formData.append("ratings", element);
  });
  policiesForm.forEach((element) => {
    formData.append("policyIds", element);
  });
  rulesForm.forEach((element) => {
    formData.append("ruleIds", element);
  });
  featuresForm.forEach((element) => {
    formData.append("featureIds", element);
  });

  
  const createRestaurant = () => {
    const payload = {
      method: "POST",
      body: formData,
    };

    fetch("http://18.222.87.247:8080/Restaurants", payload)
      .then((res) => {
        res.json();
        if (res.ok === true) {
          Alert("success", "Restaurante registrado correctamente 👌");
          console.log("Restaurante registrado");
          setTimeout(()=>window.location.reload(), 2100)
        }
      })
      .catch((err) => {
        console.log(err);
        Alert("error", "Error al realizar el registro! 😒");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createRestaurant();
  };

  const handleImageChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImageUrls(selectedFiles);
  };

  const handlePoliciesChange = async (event) => {
    const policy = event.target.value;
    setPoliciesForm((prevPoliciesForm) => [...prevPoliciesForm, policy]);
  };

  const handleFeatureChange = async (event) => {
    const feature = event.target.value;
    setFeaturesForm((prevFeaturesForm) => [...prevFeaturesForm, feature]);
  };

  const handleRulesChange = async (event) => {
    const rule = event.target.value;
    setRulesForm((prevRulesForm) => [...prevRulesForm, rule]);
  };

  const removeImage = (index) => {
    const updatedImageUrl = [...imageUrls];
    updatedImageUrl.splice(index, 1);
    setImageUrls(updatedImageUrl);
  };

  return (
    <div className="container-register">
      {/*<div className="container-add-register">*/}
        <form onSubmit={handleSubmit} className="register__restaurant">
          <h2 className="add_restaurant_title">Agregar restaurante</h2>
          <label>
            Nombre
            <input
              required
              name="nombre"
              className="input-nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Descripción
            <textarea
              required
              name="descripcion"
              className="input-descripcion"
              rows={1}
              type="text"
              value={restaurant.description}
              onChange={(e) => {
                setRestaurant({ ...restaurant, description: e.target.value });
              }}
            />
          </label>
          <br />
          <label>
            Ciudad:
            <select
              required
              value={restaurant.city_id}
              onChange={(e) =>
                setRestaurant({ ...restaurant, city_id: e.target.value })
              }
              className="select-ciudad"
            >
              <option value="">Seleccionar ciudad</option>
              {cities.map((city, index) => (
                <option key={index} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Dirección:
            <input
              required
              name="direccion"
              type="text"
              value={restaurant.address}
              onChange={(e) =>
                setRestaurant({ ...restaurant, address: e.target.value })
              }
              className="input-direccion"
            />
          </label>
          <br />
          <label>
            Categoría:
            <select
              required
              value={restaurant.category_id}
              onChange={(e) =>
                setRestaurant({ ...restaurant, category_id: e.target.value })
              }
              className="select-categoria"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Características:
            <div>
              {featureIds.map((feature) => (
                <label key={feature.id} className="caracteristicLabel">
                  <input
                    type="checkbox"
                    value={feature.id}
                    onChange={handleFeatureChange}
                  />{" "}
                  {feature.name}
                </label>
              ))}
            </div>
          </label>
          <br />

          <label>
            Normas:
            <div>
              {rules.map((rule) => (
                <label key={rule.id} className="caracteristicLabel">
                  <input
                    type="checkbox"
                    value={rule.id}
                    onChange={handleRulesChange}
                  />{" "}
                  <span style={{width:'80%'}}>{rule.description}</span>
                </label>
              ))}
            </div>
          </label>
          <br />

          <label>
            Políticas:
            <div>
              {policies.map((policie) => (
                <label key={policie.id} className="caracteristicLabel">
                  <input
                    type="checkbox"
                    value={policie.id}
                    onChange={handlePoliciesChange} className="checkbox"
                  />{" "}
                  <span style={{width:'80%'}}>{policie.description}</span>
                </label>
              ))}
            </div>
          </label>
          <br />

          <label className="label-img">
            Imágenes:
            <input
              required
              name="imagenes"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="input-url-imagen"
            />
          </label>
          <div className="imagenes">
            {imageUrls.length > 0 &&
              imageUrls.map((url, index) => (
                <img
                  src={URL.createObjectURL(url)}
                  alt={`Imagen ${index}`}
                  key={`imagen-${index}`}
                  width="100"
                  height="100"
                  className="imagen-previa"
                  onClick={() => removeImage(index)}
                />
              ))}
          </div>
          <br />
          <button type="submit" className="enviar">
            Enviar
          </button>
        </form>
      {/*</div>*/}
    </div>
  );
};

export default AddRestaurant;
