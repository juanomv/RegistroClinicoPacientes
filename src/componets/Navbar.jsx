import React from 'react'

import logo from '../assets/img/Imagen1.jpeg';
function Navbar() {
   
    const salir =()=> {
       
        localStorage.removeItem('Token')
        window.location.href='/login'
      }
  return (
    <div className="sm:w-auto flex flex-row justify-between px-10 bg-blue-primary bg-opacity-80 border-b-4 border-blue-primary p-3 text-xl uppercase sticky top-0 z-50">
        
        <img onClick={()=>window.location.href='/'} className="w-28  cursor-pointer hover:shadow-2xl hover:bg-white h-14" src={logo} alt="" />
        <button
          className="uppercase text-green-primary  hover:text-white "
          onClick={salir}
        >
          cerrar sesion
        </button>
      </div>
  )
}

export default Navbar