
import React from "react";
import { useParams ,useHistory } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Navegation from "../componets/Navegation";
import { Examenes } from "./Examenes";
import { Pacientes } from "./Pacientes";
import { Registro } from "./Registro";
const Main = () => {
  const location = useParams()
  const history = useHistory()
  let accion =  parseInt(location.id)
  if(isNaN(accion)) accion=-1
  function section() {
    switch (accion) {
      case 1:
        return <Examenes/>;
      case 2:
        return <Pacientes/>;
      case 3:
        return <Registro/>;
      case -1:
        return <div className="container  min-h-screen"></div>;
      default: 
        history.push('/NoPage')
        break;
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-row bg-gray-300 max-h-full overflow-hidden  ">
        <Navegation />

        <div className="flex-1 overflow-y-auto ">
          {section()}
          
        </div>
      </div>
    </div>
  );
};

export default Main;
