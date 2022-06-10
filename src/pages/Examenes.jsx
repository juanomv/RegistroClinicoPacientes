import axios  from "axios";
import React, { useEffect, useState } from "react";
import AddExamen from "../componets/AddExamen";
import Modal from "../componets/Modal";
import Basura from '../componets/Basura';
import {Url,headers} from '../config'
import SeccionCaducada from "../componets/SeccionCaducada";
import EditIcon from "../componets/EditIcon";
import DeleteMesagge from "../componets/DeleteMesagge";
export function Examenes(props) {
    const [AcitveModal,setAcitveModal] = useState(false);
    const [AcitveModalDelete,setAcitveModalDelete] = useState(false);
    const [session,setsession] = useState(false);
    const [data,setdata] = useState([]);
    const [refresh,setrefresh] = useState(false);
    const [Accion, setAccion] = useState(null)
    const [edit, setEdit] = useState(null)
    const [id, setId] = useState(null)
    headers.Authorization = 'Bearer ' + localStorage.getItem('Token')
    useEffect(() => {
     
      axios.get(Url+"Examen/Gets",{headers}).then(res=>{
        if(res.data.ok){setdata(res.data.data)}
        else{
          console.log(res.data)
          if(res.data.code==='CAD01') setsession(true)
        }
      }).catch(error=>console.log(error))
      
    }, [refresh,setrefresh])

    async function eliminar() {
      try {
        const res= await axios.delete(Url+`Examen/Delete/${id}`,{headers}) 
        if(res.data.ok) setrefresh(!refresh)
     
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
      {AcitveModal&&<Modal cerrar={()=>setAcitveModal(false) } titulo={'Agregar Paciente'} ><AddExamen salir={()=>setAcitveModal(false)} reload={()=>setrefresh(!refresh)} accion={Accion} valores={edit}/></Modal>}
      {AcitveModalDelete&&<Modal cerrar={()=>setAcitveModalDelete(false) } titulo={'Eliminar Examen'}> <DeleteMesagge salir={()=>setAcitveModalDelete(!AcitveModalDelete)} eliminando={eliminar}/></Modal>}
      <button onClick={agregar} className="m-4 bg-green-primary py-2 px-4 rounded-lg text-white text-lg"> + Agregar Examen</button>

      <table className="bg-white w-8/12 mx-auto mt-6 rounded-t-lg">
        <thead className="bg-blue-primary text-white rounded-t-lg">
          <tr className="text-xl rounded-t-lg">
            <th className="rounded-tl-lg">Examen</th>
            <th className="">Descripcion</th>
            <th className="w-10"></th>
            <td className="w-10 rounded-tr-lg"></td>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((element,i) => {
              let color ="bg-gray-400"
              if(i%2===0) color ="bg-white"
              return (
                  <tr className={`${color} `}>
                    <td className='py-2'>{element.Nombre}</td>
                    <td className='py-2'>{element.Descripcion}</td>
                    <td onClick={()=>editar(element)} className={`py-2 border-l cursor-pointer ${color} `}>{<EditIcon/>}</td>
                    <td onClick={()=>elin(element.Id)} className='py-2 bg-red-500 cursor-pointer'><Basura/></td>
                  </tr>
                );
            })}
          
        </tbody>
      </table>
    </div>
  );
}
