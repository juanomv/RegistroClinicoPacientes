import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import app from "../firebase.config";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { headers, Url as lru } from "../config";
import Loading from "./Loading";
import Check from "./Check";
import moment from "moment";

const AddRegistro = ({reload,salir,accion, valores}) => {
  
  const storage = getStorage(app);
  const [pacientes, setPacientes] = useState([]);
  const [examenes, setExamenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Update, setUpdate] = useState({ExaName: null , Examen:  null,Fecha: null , Id:  null, Nombre:  null, Paciente:  null, url:  null});
  const [data, setData] = useState({
    Examen: null,
    Paciente: null,
    Url: null,
    Fecha: null,
  });
  const [file, setFile] = useState(false);
  const [errorExamen, setErrorExamen] = useState(null);
  const [errorPaciente, setErrorPaciente] = useState(null);
  const [errorUrl, setErrorUrl] = useState(null);
  const [errorFecha, setErrorFecha] = useState(null);
  
  headers.Authorization = "Bearer " + localStorage.getItem("Token");
  useEffect(() => {
    axios
      .get(lru + "Registro/GetAll", { headers })
      .then((res) => {
        
        if(res.data.code==='CAD01')  {salir();reload()}
        setPacientes(res.data.Paciente);
        setExamenes(res.data.Examen);
      })
      .catch((error) => console.log(error));
    if (data.Url) setFile(true);
    
    if (accion === "Update") {
      data.Examen=valores.Examen
      data.Paciente=valores.Paciente
      data.Url=valores.url
      data.Fecha=formatDate(valores.Fecha)
      setData(data)
      
      for (const key in valores) {
        Update[key]=valores[key]
      }
      Update.Fecha=formatDate(valores.Fecha)
      setUpdate(Update);
     

    }else{ Update.Fecha = formatDate(new Date()); setUpdate(Update);data.Fecha=formatDate(new Date());setData(data)}
  }, []);

  function formatDate(date){
    moment.locale('en');
      
      return(moment(date).format('YYYY-MM-DD'))
  }
  const handleChange = async (e) => {
    e.preventDefault();
    if (data.Url) {
      setFile(false);
      
      const desertRef = ref(storage, data.Url);
      deleteObject(desertRef)
        .then(() => {
          data.Url = null;
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    let pdf = e.target.files[0];
  
    if (pdf) {
      const minuto = new Date().getMinutes();
      const seconds = new Date().getMilliseconds();
      const sec = new Date().getSeconds();
      const archivo = ref(
        storage,
        `documentos/${
          pdf.name.split(".pdf")[0]
        }-${seconds}-${minuto}-${sec}.pdf`
      );
      
      try {
        await uploadBytes(archivo, pdf);
        const res = await getDownloadURL(archivo);
        data.Url = res;
        
        setData(data);
        setFile(true);
      } catch (error) {
        console.log(error)
      }
    }

    setErrorUrl(null);
  };

  const addRegistro = async () => {
    if (!data.Paciente) setErrorPaciente("el Paciente es obligatorio");
    if (!data.Examen) setErrorExamen("el Examen obligatorio");
    if (!data.Fecha) setErrorFecha("Fecha obligatorio");
    if (!data.Url) setErrorUrl("Debe subir un Documento");

    
    let subir = true;
    for (const key in data) {
      if (!data[key]) subir = false;
    }
    if (subir) {
      setLoading(true);
      let res;
      
      if(accion=='New') res = await axios.post(lru + "Registro/New", data, { headers });
      else if(accion=='Update'){data.Id=Update.Id ;res = await axios.put(lru + "Registro/Update", data, { headers })}
     
      if(res.data.ok){
      setTimeout(() => {
        setLoading(false);
      }, 500);
      salir();
      reload()
    }
    }
  };

  const handleChangeD = (param) => (e) => {
    if (param !== "Fecha") data[param] = e.value;
    else data[param] = e.target.value;
    setData(data);
    switch (param) {
      case "Paciente":
        setErrorPaciente(null);
        break;
      case "Examen":
        setErrorExamen(null);
        break;
      case "Fecha":
        setErrorFecha(null);
        break;
      default:
        break;
    }
   
  };

  

  const switchPaciente =()=>{
    switch (accion) {
      case 'Update':
        
        return(
          <Select
          id="Paciente"
          options={pacientes}
          defaultValue={{ value: valores.Paciente ,label: valores.Paciente+ " - " + valores.Nombre }}
          onChange={handleChangeD("Paciente")}
        />
        )
        
      default:
        return(
          <Select
          id="Paciente"
          options={pacientes}
          onChange={handleChangeD("Paciente")}
        />
        );
    }
  }

  const switchExamen =()=>{
    switch (accion) {
      case 'Update':
        
        return(
          <Select
          id="Examen"
          options={examenes}
          defaultValue={{ value: valores.Examen ,label:  valores.ExaName }}
          onChange={handleChangeD("Examen")}
        />
        )
        
      default:
        return(
          <Select
          id="Examen"
          options={examenes}
          onChange={handleChangeD("Examen")}
        />
        );
    }
  }
  return (
    <form className="flex flex-col  bg-white w-auto p-4 justify-between ">
      {loading && <Loading />}
      <label className="mt-4 mb-1" htmlFor="Paciente">
        Paciente
      </label>
      {!loading && switchPaciente()}

      <span className="Warring">{errorPaciente && errorPaciente}</span>

      <label className="mt-4 mb-1" htmlFor="Examen">
        Examen
      </label>
      {!loading && switchExamen()}

      <span className="Warring">{errorExamen && errorExamen}</span>
      <label className="mt-4 mb-1" htmlFor="Archivo">
        Subir Pdf
      </label>
     
      <div className="flex flex-row justify-between">
      
        <input
          onChange={handleChange}
          type="file"
          name="Archivo"
          id="Archivo"
          accept="application/pdf "
        />
        {  !file ? (
          <Check size={5} color={"gray"} />
        ) : (
          <Check size={5} color={"green"} />
        )}
      </div>

      <span className="Warring">{errorUrl && errorUrl}</span>
      <label className="mt-4 mb-1" htmlFor="Fecha">
        Fecha
      </label>
      <input
        type="date"
        name="Fecha"
        id="Fecha"
        defaultValue={Update.Fecha}
        onChange={handleChangeD("Fecha")}
      />
      <span className="Warring">{errorFecha && errorFecha}</span>
      <input
        onClick={() => addRegistro()}
        className="w-2/3 my-6 ml-16"
        type="button"
        value="Agregar"
      />
    </form>
  );
};

export default AddRegistro;
