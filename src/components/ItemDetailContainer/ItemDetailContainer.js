import React, {useState, useEffect} from 'react'
import {ItemDetail} from '../ItemDetail/ItemDetail'

import './itemdetailcontainer.css'

//IMPORT IMAGENES
import remeFairy from '../ItemListContainer/img-products/fairy-angel.png'
import remeNascar from '../ItemListContainer/img-products/nascar.png'
import remeSolaris from '../ItemListContainer/img-products/solaris.png'

const ItemDetailContainer = () => {

    const [item, setItem] = useState({})
    const [estado, setEstado] = useState("En Proceso")

    let listaCatalogo = [
        {
            id: '4371847139',
            title: 'Fairy Angel',
            description: 'Remera Fairy Angel IWA 2020 Edition',
            price: 1200,
            picture: remeFairy,
            stock: 6
        },{
            id: '3748193789',
            title: 'Nascar',
            description: 'Remera NASCAR IWA 2020 Edition',
            price: 1300,
            picture: remeNascar,
            stock: 4
        },{
            id: '5492549040',
            title: 'Solaris',
            description: 'Remera Solaris [Movie] IWA 2020 Edition',
            price: 1250,
            picture: remeSolaris,
            stock: 11
        },
    ]

    const simulacionFetch = () => {

        //Promise que simula pedido Fetch
        let task = new Promise((success, reject) => {
          setTimeout(()=>{
            listaCatalogo.length ? success(listaCatalogo) : reject('Error durante FETCH');
          }, 2000)
        })
      
        task.then(lista => {
          
          //Si la busqueda es exitosa se reemplaza la lista vacía por la lista del catalogo
          //Tambien se setea un estado Exitoso para corroborar en ItemList 

          console.log("SUCCESS: "+ lista)
          let rand = Math.floor(Math.random()*3)
          setItem(lista[rand]);
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

    return (
        <div className="cont-detail">
            <ItemDetail item={item} estado={estado} />
        </div>
    )
      
}

export default ItemDetailContainer