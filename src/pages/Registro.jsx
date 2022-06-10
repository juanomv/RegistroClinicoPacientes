import React, { useState ,useEffect } from "react";
import Basura from "../componets/Basura";
import PdfIcon from "../componets/PdfIcon";
import QrIcon from "../componets/QrIcon";
import EditIcon from "../componets/EditIcon"
import Modal from "../componets/Modal";
import AddRegistro from "../componets/AddRegistro";
import {headers,Url} from '../config';
import axios from 'axios';
import Moment from 'moment';
import SeccionCaducada from "../componets/SeccionCaducada";
import Qrgenerato from "../componets/QrGenerato";
import app from "../firebase.config";
import {
  getStorage,
  ref,
  deleteObject,
} from "firebase/storage";

import Descendente from "../componets/Descendente";
import Ascendete from "../componets/Ascendete";
export function Registro(props) {
  const storage = getStorage(app)
  const [AcitveModal,setAcitveModal] = useState(false);
  const [session,setsession] = useState(false);
  const [data,setdata] = useState([]);
  
  const [tipeFind,setTipeFind] = useState('Paciente');
  const [size,setsize] = useState(0);
  const [refresh,setrefresh] = useState(false);
  const [modalQr,setModalQr]  = useState(null);
  const [order,setOrder] = useState('desc')
  const [Accion, setAccion] = useState(null)
  const [edit, setEdit] = useState(null)
    headers.Authorization = 'Bearer ' + localStorage.getItem('Token')
    useEffect(() => {
     
      axios.get(Url+`Registro/Gets/${order}`,{headers}).then(res=>{
        if(res.data.ok){setdata(res.data.data)}
        else{
          console.log(res.data)
          if(res.data.code==='CAD01') setsession(true)
        }
      }).catch(error=>console.log(error))
      
    }, [refresh])

    function findPaciente(e){
      
      if((e.target.value).length>=size){
        setsize((e.target.value).length)
        let newdata=data.filter((element)=>{
        let valor =element[tipeFind]
        valor= valor.toLowerCase()
        if(valor.indexOf((e.target.value).toLowerCase())>=0) return true
        return false
      })
      setdata(newdata)
    }else{
      setsize((e.target.value).length)
      setrefresh(!refresh)
      let newdata=data.filter((element)=>{
        let valor =element[tipeFind]
      valor= valor.toLowerCase()
      if(valor.indexOf((e.target.value).toLowerCase())>=0) return true
      return false
    })
    setdata(newdata)
    }
     
    if(!e.target.value){setrefresh(!refresh)}
    }
    function ordeFecha(){
      if(order==='desc') setOrder('asc')
      else setOrder('desc')
      setrefresh(!refresh)
    }
    function handelSelect(e){
      setTipeFind(e.target.value)
    }
    
    async function deleteRegister(id,url){
      try {
        const res= await axios.delete(Url+`Registro/Delete/${id}`,{headers})
        if(res.data.ok) {

          const desertRef = ref(storage, url);
          deleteObject(desertRef)
            .then(() => {
              setrefresh(!refresh)
              
            })
            .catch((error) => {
              console.log(error);
             
              setrefresh(!refresh)
            });  
          
        }

      } catch (error) {
        console.log(error)
      }
    }
    function formatDate(date){
      Moment.locale('en');
        const fecha = new Date(date)
        return(fecha.getDate("D")+1+" de "+Moment(date).format('MMM YYYY'))
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
  return (
    <div className="container  min-h-screen pb-24">
      {session&&<SeccionCaducada/>} 
      {modalQr&&<Modal cerrar={()=>setModalQr(false) } titulo={'qr '}><Qrgenerato url={modalQr}/></Modal>}
      {AcitveModal&&<Modal cerrar={()=>setAcitveModal(false) } titulo={'Agregar Paciente'}><AddRegistro salir={()=>setAcitveModal(!Modal)}  reload={()=>{setrefresh(!refresh)}} accion={Accion} valores={edit}/></Modal>}
      <button onClick={agregar} className=" m-4 bg-green-primary py-2 px-4 rounded-lg text-white text-lg">
        
        + Agregar Registro
      </button>
      <select className="p-3 mr-3  rounded-lg bg-blue-primary  text-center text-lg uppercase text-white focus:bg-white focus:text-blue-primary" onChange={handelSelect} name="TipeFind" id="tipefind" defaultValue={'Paciente'}>
        <option value="Paciente" >Cedula</option>
        <option value="Nombre" >Nombre Paciente</option>
        <option value="ExaName" >Examen</option>
      </select>
     
      {tipeFind==="Paciente"?<input className="inputFind" type="number" name="find" id="find" pattern='[0-9]{10}' onChange={findPaciente} placeholder="Buscar"/>
      :<input className="inputFind" type="text" name="find" id="find" placeholder="Buscar" onChange={findPaciente}/>
      }
      
      <table className="bg-white w-11/12 mx-auto mt-6 rounded-t-lg">
        <thead className="bg-blue-primary text-white rounded-t-lg">
          <tr className="text-xl rounded-t-lg">
            <th className="rounded-tl-lg">Nº Cedula</th>
            <th className="">Paciente</th>
            <th >Examen</th>
            <th onClick={ordeFecha} className="cursor-pointer flex flex-row justify-center "><div>Fecha</div> {order==="desc"?<Ascendete/>:<Descendente/>} </th>
            <th className="w-10"></th>
            <th className="w-10"></th>
            <th className="w-10"></th>
            <th className="rounded-tr-lg w-10 "></th>
          </tr>
        </thead>
        
        <tbody className="text-center">
          {data.map((element, i) => {
            let border = 'border-gray-300'
            let color ='bg-white'
            if (i % 2 === 0) {color = 'bg-gray-400'; border='border-white'} 
            return (
              <tr className="bg-gray-200 ">
                <td className={`py-2 ${color} ${border} `}>{element.Paciente}</td>
                <td className={`py-2 border-l ${color} ${border} `}>{element.Nombre}</td>
                <td className={`py-2 border-l ${color} ${border} `}>{element.ExaName}</td>
                <td className={`py-2 w-auto border-l ${color} ${border} `}>{formatDate(element.Fecha)}</td>
                <td className={`py-2 border-l ${color} ${border} `}><a className="cursor-pointer" href={`${element.url}`} target="_blank" rel="noopener noreferrer"><PdfIcon/></a> </td>
                <td onClick={()=>setModalQr(element.url)} className={`py-2 border-l ${color} ${border} cursor-pointer`}>{<QrIcon/>}</td>
                <td onClick={()=>editar(element)} className={`py-2 border-l cursor-pointer ${color} ${border} `}>{<EditIcon/>}</td>
                <td onClick={()=>deleteRegister(element.Id,element.url)} className="py-2 bg-red-500 cursor-pointer">{<Basura/>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
