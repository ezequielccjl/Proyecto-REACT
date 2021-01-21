import React, {useState, useEffect} from 'react'

import { ItemList } from '../ItemList/ItemList'
import './itemlistcont.css'

//IMPORT IMAGENES
import remeFairy from './img-products/fairy-angel.png'
import remeNascar from './img-products/nascar.png'
import remeSolaris from './img-products/solaris.png'

export const ItemListContainer = ({greeting}) => {

  //Defino estados seteables para confirmación del "Fetch"
  const [estadoFetch, setEstado] = useState('En proceso')
  const [listaItems, setLista] = useState([]) 

  //Catalogo
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

  //Función invocada con useEffect
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
      setLista(lista);
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
    <div className='item-list-container'>
      <header className='header'>
        {greeting}
      </header>

      <div className='item-list'>
        <ItemList estado = {estadoFetch} listaItems = {listaItems} />
      </div>
        
    </div>
  )
}