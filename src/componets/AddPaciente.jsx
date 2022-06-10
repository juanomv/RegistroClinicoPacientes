import React, { useEffect, useState } from 'react'
import { useForm} from "react-hook-form";
import Axios from 'axios'
import {Url,headers} from '../config'
import {validarCedula} from '../funtions'
const AddPaciente = ({salir,reload,accion, valores}) => {
  headers.Authorization = 'Bearer ' + localStorage.getItem('Token')
  const [Update, setUpdate] = useState({Cedula:null,Name:null,Id:null});
  const { register, handleSubmit, formState:{errors} ,reset } = useForm();
  const [Mensaje,setMensaje] = useState(null)

  useEffect(() => {
    if (accion === "Update") {
      setUpdate(valores);
      reset({Cedula:valores.Cedula},{Name:valores.Nombre})
     
    }
    
  }, []);
  

  const addPaciente=async (data)=>{
    let datos 
    try {
      let res;
      if(validarCedula(data.Cedula)){
      if (accion === "New") {
        datos = { Cedula:data.Cedula, Nombre:data.Name}
        res = await Axios.post(Url + "Paciente/New", datos, { headers });
      } else if (accion === "Update") {
        datos = { Cedula:data.Cedula, Nombre:data.Name ,Id:Update.Id}
        data.Id = valores.Id;
        res = await Axios.put(Url + "Paciente/Update", datos, { headers });
      }
    }else(setMensaje('El numero de cedula no es valido'))
      if(res.data.ok){
       
        salir()
        reload()
        }
      else{
        
        setMensaje(res.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
    
  }



  return (
    <form onSubmit={handleSubmit(addPaciente)} className='flex flex-col bg-white w-auto p-4 '>
        <label className='mt-4 mb-1' htmlFor="cedula">Cedula</label>
        <input onClick={()=>setMensaje(null)} className='w-96 border-b border-gray-600' type="text" name="Cedula" id="Cedula" pattern='[0-9]{10}' minLength={10} maxLength={10} placeholder='Cedula del Paciente'
        
        value={Update.Cedula}
        {...register('Cedula',{
          required:{
            value:true,
            message:"Numero de Cedula es Obbligatrio"
          }
        })} />  
        <span className='Warring'>{errors.Cedula && errors.Cedula.message }</span>
        {Mensaje&&<span className='Warring'>{Mensaje}</span>}
        <label className='mt-4 mb-1' htmlFor="Nombre">Nombre</label>
        <input defaultValue={Update.Nombre} className='w-96 border-b border-gray-600' type="text" name="Nombre" id="Nombre"  placeholder='Nombre del Paciente'
        {...register('Name',{
          required:{
            value:true,
            message:'Nombre es obligatorio'
        },
          maxLength:{
            value: 90,
            message: 'Numero maximo de Caracteres : 90'
          }
        
      })}
        />
       <span className='Warring'>{errors.Name && errors.Name.message }</span>
        <input className='m-auto w-2/3 my-6' type="submit" value="Agregar" />
    </form>
  )
}

export default AddPaciente