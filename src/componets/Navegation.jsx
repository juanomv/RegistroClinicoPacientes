import React from 'react'
import {NavLink,useLocation} from 'react-router-dom'
function Navegation({change,valor}) {
  const list=['Examenes','Pacientes','Registro']
  const location = useLocation()
  const accion =  parseInt(new URLSearchParams(location.search).get('action'))
  return (
    <div className='flex-col w-2/12 bg-gray-300 border-r-2  border-gray-500 my-2 border-opacity-20 max-h-60" sticky left-0'>
        <ol className='flex-col p-2  '>
            {list.map((elemet,i)=>{
                    
                    if(accion!==i+1){
                       return( <NavLink  activeClassName='color:white' to={`/Dashboard/${i+1}`}><li className="p-2 text-center text-xl text-gray-700 rounded-md bg-green-primary bg-opacity-80 mb-1 uppercase  hover:bg-opacity-40 cursor-pointer hover:text-white" >{elemet}</li></NavLink>)
                     }else{
                        return( <NavLink  activeClassName='color:white' to={`/Dashboard/${i+1}`}><li className="p-2 text-center text-xl text-white rounded-md bg-blue-primary bg-opacity-80 mb-1 uppercase  hover:bg-opacity-60 cursor-pointer hover:text-white" >{elemet}</li></NavLink>)
                     }
                    })
                }
        </ol>
    </div>
  )
}

export default Navegation