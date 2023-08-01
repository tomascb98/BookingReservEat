import React, { useState } from 'react';
import "../styles/pagesStyles/NewCategory.css";
import { Alert } from "../components/alert";

const NewCategory = () => {
  const [categoria, setCategoria] = useState({
    name: "",
    description: "",
    fileImage: [],
  });

  const createCategoria = async () => {
    const formData = new FormData();
    formData.append("name", categoria.name);
    formData.append("description", categoria.description);
    formData.append("fileImage", categoria.fileImage);

    try {
      const response = await fetch("http://18.222.87.247:8080/Categories", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Categoria agregada");
        Alert('success', "Categoria agregada exitosamente! 👌");
        setTimeout(()=>window.location.reload(), 2100)
        console.log("categoria agregada")
      } else {
        throw new Error("Error al agregar la categoría");
      }
    } catch (err) {
      console.log(err.message);
      Alert('error', 'Error al realizar el registro! 😒');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoria.name.trim().length < 3) {
      Alert('warning', "El nombre es muy corto");
      return;
    }
    if (categoria.description.trim().length < 6) {
      Alert('warning', "La descripción es muy corta");
      return;
    }
    if (categoria.fileImage === null) {
      Alert('warning', "Ingrese una fileImage");
      return;
    }

    createCategoria();
    setCategoria({
      name: "",
      description: "",
      fileImage: [],
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fileImage") {
      if (files && files.length > 0) {
        setCategoria({ ...categoria, fileImage: files[0] });
      } else {
        setCategoria({ ...categoria, fileImage: null });
      }
    } else {
      setCategoria({ ...categoria, [name]: value });
    }
  };
  

    return (
      <div className='container-Newcategory'>
      {/*<div className='registrarCategoria'>*/}
          <form className='form-category' onSubmit={handleSubmit}>
            <h2>Agregar Categoría</h2>
            <p className="parrafoRegistro">
              Recuerda que ningún campo debe quedar vacío
            </p>
            <div className='labels'>
              <label htmlFor="name">Nombre
              <input
                id="name"
                className="inputNombre"
                type="text"
                name="name"
                value={categoria.name}
                onChange={handleChange}
              /></label>
            {/*</div>*/}
            {/*<div className='labels'>*/}
              <label htmlFor="description">Descripción
              <textarea
                id="description"
                rows={1}
                className="inputDescripcion"
                type="text"
                name="description"
                value={categoria.description}
                onChange={handleChange}
              /></label>
            </div>
            {/*<div className='labels'>*/}
              <label htmlFor="fileImage">Adjuntar imagen
              <input
                id="fileImage"
                type="file"
                className='inputImagen'
                name="fileImage"
                onChange={handleChange}
              /></label>
            {/*</div>*/}
            <button type="submit">Enviar</button>
          </form>
        {/*</div>*/}
    </div>
    
  );
}

export default NewCategory;
