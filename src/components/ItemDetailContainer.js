import React, {useState, useEffect} from 'react'
import {ItemDetail} from './ItemDetail'
import { useParams } from 'react-router-dom'


import '../CSS/itemDetailContainer.css'

const ItemDetailContainer = ({listaCatalogo}) => {

    const [item, setItem] = useState({})
    const [estado, setEstado] = useState("En Proceso")

    const {itemId} = useParams()
    
    const simulacionFetch = () => {

        //Promise que simula pedido Fetch
        let task = new Promise((success, reject) => {
          setTimeout(()=>{
            listaCatalogo.length ? success(listaCatalogo) : reject('Error durante FETCH');
          }, 800)
        })
      
        task.then(lista => {
          
          //Si la busqueda es exitosa se setea un estado Exitoso para corroborar en ItemList 
          console.log("SUCCESS: "+ lista)
          setEstado('Exitoso');
    
        }).catch((err)  => {
          console.log("Surgió un problema: "+ err)
          setEstado('Error');
        })
    
    }
    
    //Luego del render se ejecuta la función
    useEffect(() => {
        simulacionFetch();
    }, []);

    //Por cada vez que cambie el ItemId
    useEffect(()=>{
        listaCatalogo.forEach(item => {
            item.id===itemId&& setItem(item)
        });
    },[itemId])

    return (
        <div className="cont-detail">
            <ItemDetail item={item} estado={estado} listaCatalogo={listaCatalogo} />
        </div>
    )
      
}

export default ItemDetailContainer