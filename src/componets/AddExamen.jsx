import axios from "axios";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Url, headers } from "../config";
const AddExamen = ({ salir, reload, accion, valores }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [Update, setUpdate] = useState({Nombre:null,Descripcion:null,Id:null});
  headers.Authorization = "Bearer " + localStorage.getItem("Token");
  useEffect(() => {
    if (accion === "Update") {
      setUpdate(valores);
      reset({Nombre:valores.Nombre},{Descripcion:valores.Descripcion})
     
    }
    
  }, []);
  
  const addExamen = async (data) => {
    try {
      let res;
      if (accion === "New") {
        res = await axios.post(Url + "Examen/New", data, { headers });
      } else if (accion === "Update") {
        data.Id = valores.Id;
        res = await axios.put(Url + "Examen/Update/", data, { headers });
      }
      if (res.data.ok) {
        salir();
        reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(addExamen)}
      className="flex flex-col bg-white w-auto p-4 justify-between"
    >
      <label className="mt-4 mb-1" htmlFor="Nombre">
        Examen
      </label>
      <input
        className="w-96 border-b border-gray-600"
        type="text"
        name="Nombre"
        id="Nombre"
        defaultValue={Update.Nombre}
        minLength={1}
        maxLength={50}
        placeholder="Nombre de Examen"
        {...register("Nombre", {
          required: { value: true, message: "Nombre de examen es obligatorio" },
          maxLength: {
            value: 50,
            message: "Nombre no debe tener mas 50 caracteres",
          },
        })}
      />
      <span className="Warring">{errors.Nombre && errors.Nombre.message}</span>
      <label className="mt-4 mb-1" htmlFor="Nombre">
        Descripcion
      </label>
      <textarea
        className="w-96 border-b p-2"
        minLength={1}
        maxLength={200}
        defaultValue={Update.Descripcion}
        placeholder="Breve Descripcion"
        {...register("Descripcion", {
          required: { value: true, message: "La Descripcion es obligatoria" },
          maxLength: {
            value: 200,
            message: "Descripcion no debe tener mas 200 caracteres",
          },
          minLength: {
            value: 1,
            message: "Descripcion no debe tener almenos 1 caracter",
          },
        })}
      />      <span className="Warring">
        {errors.Descripcion && errors.Descripcion.message}
      </span>
      <input className="m-auto w-2/3 my-6" type="submit" value="Agregar" />
    </form>
  );
};

export default AddExamen;
