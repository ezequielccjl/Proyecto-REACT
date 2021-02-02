import React, {useState, useEffect} from 'react'
import {ItemDetail} from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

import './itemdetailcontainer.css'

//IMPORT IMAGENES
import dibujo from '../ItemListContainer/img-products/dibujo.png'
import remeNascar from '../ItemListContainer/img-products/nascar.png'
import remeSolaris from '../ItemListContainer/img-products/solaris.png'
import remeOdyssey from '../ItemListContainer/img-products/2001.png'

const ItemDetailContainer = () => {

    const [item, setItem] = useState({})
    const [estado, setEstado] = useState("En Proceso")

    const {itemId} = useParams()

    let listaCatalogo = [
            {
              id: '346gYGfyfg',
              title: 'Art Concept',
              description: 'Remera Art Concept IWA 2021 Edition',
              categoria: 'negro',
              price: 1500,
              picture: dibujo,
              stock: 7
          },{
            id: '3748193789',
            title: 'Nascar',
            description: 'Remera NASCAR IWA 2020 Edition',
            categoria: 'negro',
            price: 1300,
            picture: remeNascar,
            stock: 4
        },{
            id: '5492549040',
            title: 'Solaris',
            description: 'Remera Solaris [Movie] IWA 2020 Edition',
            categoria: 'negro',
            price: 1250,
            picture: remeSolaris,
            stock: 11
        },{
          id: "aishd2JerR",
          title: "2001 Odyssey",
          description: "Remera Space Odyssey IWA 2021 Edition",
          categoria: "negro",
          price: 1200,
          picture: remeOdyssey,
          stock: 14
        }
    ]

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
            <ItemDetail item={item} estado={estado} />
        </div>
    )
      
}

export default ItemDetailContainer