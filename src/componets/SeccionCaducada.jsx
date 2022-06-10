import React from 'react'

import { Acceso } from './Acceso'
function SeccionCaducada() {
   
    function clear(e){
        e.preventDefault()
        localStorage.clear('Token')
        window.location.href='/login'
    }
  return (
    <div className="-ml-2 pr-4 -mt-4 w-10/12 h-5/6 flex flex-col absolute  overflow-hidden ">
      <div className=" bg-white my-auto  mx-auto opacity-100  overflow-hidden h-auto ">
        <div className="text-center bg-blue-primary  text-white p-3">
          <h3 className="text-center font-semibold">Session Caducada</h3>
        </div>
        <div className='w-5/6 mx-auto my-5'>La Session ha caducado vuelva a Ingresas las Credenciales para Continuar</div>
        <Acceso/>
        <button className='w-3/6 button ml-32 my-4 text-center' onClick={clear}>Aceptar</button>
      </div>
    </div>
  )
}

export default SeccionCaducada