import React,{ useEffect, useState } from 'react'
import AddPaciente from '../componets/AddPaciente';
import Modal from '../componets/Modal';
import axios from 'axios';
import { headers, Url} from '../config'
import Basura from '../componets/Basura';
import SeccionCaducada from '../componets/SeccionCaducada'
import EditIcon from '../componets/EditIcon';
import DeleteMesagge from '../componets/DeleteMesagge';
export  function Pacientes() {
  
    const [AcitveModal,setAcitveModal] = useState(false);
    const [AcitveModalDelete,setAcitveModalDelete] = useState(false);
    const [data,setdata] = useState([]);
    const [session,setsession] = useState(false);
    const [refresh,setrefresh] = useState(false);
    const [Accion, setAccion] = useState(null)
    const [edit, setEdit] = useState(null)
    const [id, setId] = useState(null)
    headers.Authorization = 'Bearer ' + localStorage.getItem('Token')
    useEffect(() => {
     
      axios.get(Url+"Paciente/Gets",{headers}).then(res=>{
        if(res.data.ok){setdata(res.data.data)}
        else{
          console.log(res.data)
          if(res.data.code==='CAD01') setsession(true)
        }
      }).catch(error=>console.log(error))
      
    }, [refresh,setrefresh])
    
    async function eliminar() {
      try {
        const res= await axios.delete(Url+`Paciente/Delete/${id}`,{headers}) 
        if(res.data.ok) setrefresh(!refresh)
        else console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    function agregar() {
      setAcitveModal(true)
      setAccion('New')
    }
    function editar(valor) {
      setAcitveModal(true)
      setAccion('Update')
      setEdit(valor)
    }
    function elin(id){
      setId(id);
      setAcitveModalDelete(true)
    }
    return (
      <div className="container  min-h-screen">
        {session&&<SeccionCaducada/>}
        {AcitveModal&&<Modal cerrar={()=>setAcitveModal(false) } titulo={'Agregar Paciente'}><AddPaciente salir={()=>setAcitveModal(!Modal)} reload={()=>setrefresh(!refresh)} accion={Accion} valores={edit}/></Modal>}
        {AcitveModalDelete&&<Modal cerrar={()=>setAcitveModalDelete(false) } titulo={'Eliminar Paciente'}> <DeleteMesagge salir={()=>setAcitveModalDelete(!AcitveModalDelete)} eliminando={eliminar}/></Modal>}
        <button onClick={agregar} className="m-4 bg-green-primary py-2 px-4 rounded-lg text-white text-lg"> + Agregar Paciente</button>
  
        <table className="bg-white w-8/12 mx-auto mt-6 rounded-t-lg mb-6">
          <thead className="bg-blue-primary text-white rounded-t-lg">
            <tr className="text-xl rounded-t-lg">
              <th className="rounded-tl-lg">Nº Cedula</th>
              <th className="">Nombre</th>
              <th className="w-10"></th>
              <th className='rounded-tr-lg w-10'></th>
            </tr>
          
          </thead>
          <tbody className="text-center">
            {data.map((element,i) => {
              let color ="bg-gray-400"
              if(i%2===0) color ="bg-white"
              return (
                  <tr className={`${color} `}>
                    <td className='py-2'>{element.Cedula}</td>
                    <td className='py-2'>{element.Nombre}</td>
                    <td onClick={()=>editar(element)} className={`py-2 border-l cursor-pointer ${color} `}>{<EditIcon/>}</td>
                    <td onClick={()=>elin(element.Cedula)} className='py-2 bg-red-500 cursor-pointer'><Basura/></td>
                  </tr>
                );
            })}
          </tbody>

        </table>
      </div>
  )
}

 