
import React from "react";

const DeleteMesagge = ({ salir,  eliminando }) => {

  const eliminar=(params) => {
    eliminando()
    salir()
  }
  
  return (
    <div className="flex flex-col bg-white w-auto p-4 justify-between">
        <p className="text-black text-center text-2xl font-bold">¿Seguro de Eliminar?</p>
        <span className="m-auto w-10/12 text-left text-sm text-red-400 font-extrabold">Si elimina estó se perderán los resgistro en los que este valor se encuentre</span>
        <div className="flex justify-evenly mt-5">
          <button className="w-6/12 bg-green-primary rounded-lg p-2 text-base text-white" onClick={salir}>No, Cancelar</button>
          <button className="border-2 w-4/12 border-red-700 rounded-lg p-3 text-base text-red-700" onClick={eliminar} >Sí, Eliminar</button>
        </div>
    </div>
  );
};

export default DeleteMesagge;
