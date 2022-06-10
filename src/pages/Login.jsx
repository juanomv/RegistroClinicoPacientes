import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import {Url, headers} from '../config'
import axios from 'axios';
import {useForm} from 'react-hook-form';
const Login = () => {
  const history= useHistory()
  const {register,handleSubmit,formState:{errors}} = useForm();
  const [menssage, setmenssage] = useState("")
  const [carga, setcarga] = useState(false)
  const logear = (data) => {
    setcarga(true)
    axios.post(Url+'auth/login',{email:data.email,password:data.password},headers)
    .then(res=>{
      if(res.data.Token){
        const {Token} = res.data
        localStorage.setItem('Token',Token)
        history.push('/Dashboard/1')
      }else{
        setcarga(false)
        setmenssage(res.data.msg)
      }
      
    }).catch(err=>console.log(err))
  };
  return (
    <div className="flex  h-screen bg-gradient-to-t from-green-primary  to-white">
      
      <div className=" flex flex-col bg-blue-primary w-5/6 sm:w-2/6 m-auto rounded-3xl shadow-2xl">
      
        <h1 className="text-center text-4xl font-extrabold p-1 sm:p-6 text-green-primary">
          Iniciar Session
        </h1>
        {carga?<div class="animate-spin rounded-full h-32 w-32 border-b-4 border-white  m-auto "></div>:null}
        <span className="text-red-500 text-center text-2xl">
        {menssage&&menssage}
        </span>
        <form
          onSubmit={handleSubmit(logear)}
          className="flex flex-col p-5 pb-10 justify-between"
        >
          <label
            className="text-green-primary font-semibold text-3xl"
            htmlFor="correo"
          >
            Correo:
          </label>
          <input
            className="m-4 my-2  bg-transparent border-b border-green-primary focus:outline-white text-white"
            type="text"
            id="correo"
            placeholder="Ingrese su Correo"
            autoFocus
            
            {...register('email',{
              required:{value:true,message:'El Email es obligatorio'},
             
              
            })}
            onChange={()=>setmenssage(null)}
          />
         <span className="Warring"> {errors.email&&'email es requerido'}</span>
          <label
            className="mt-6 text-green-primary font-semibold text-3xl"
            htmlFor="password"
          >
            Contraseña:
          </label>
          <input
            className="m-4 my-2 bg-transparent border-b border-green-primary focus:outline-white text-white"
            type="password"
            id="password"
            placeholder="Ingrese su Contraseña"
            onChange={()=>setmenssage(null)}
            {...register('password',{
              required:{value:true,message:'El password es obligatorio'}
            })}
          />
          <span className="Warring">{errors.password&&'contraseña es obligatoria'}</span>
          <input
            className="mt-16 w-2/3 sm:w-1/2 m-auto rounded-3xl sm:h-14 border bg-green-primary text-lg sm:text-3xl font-bold uppercase text-white  hover:bg-white hover:text-green-primary hover:border-green-primary focus:bg-gray-400"
            type="submit"
            value="Ingresar"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
