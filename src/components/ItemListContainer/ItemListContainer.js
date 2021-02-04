import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../../CartContext'

import { useParams } from 'react-router-dom'

import { ItemList } from '../ItemList/ItemList'
import '../../CSS/itemlistcont.css'


export const ItemListContainer = ({greeting, listaCatalogo}) => {

  let contexto = useContext(CartContext)


  //Defino estados seteables para confirmación del "Fetch"
  const [estadoFetch, setEstado] = useState('En proceso')
  const [listaItems, setLista] = useState([]) 

  //Recibe params según el link en el que se encuentre
  const {categoryId} = useParams()

  //Función invocada con useEffect
  const simulacionFetch = () => {

    //Promise que simula pedido Fetch
    let task = new Promise((success, reject) => {
      setTimeout(()=>{
        listaCatalogo.length ? success(listaCatalogo) : reject('Error durante FETCH');
      }, 1000)
    })
  
    task.then(lista => {
      
      //Si la busqueda es exitosa se reemplaza la lista vacía por la lista del catalogo
      //Tambien se setea un estado Exitoso para corroborar en ItemList  
      console.log("SUCCESS: Se obtuvo lista completa")
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
    console.log(contexto.listaCarrito)

  }, []);

  //Cada vez que se modifique el categoryId se setea una nueva lista
  //Esta será la lista que se manda por parametro a ItemList para que sea renderizada
  useEffect(()=>{
    setLista(listaCatalogo.filter(item => item.categoria===categoryId))

    //En caso de que el categoryId no sea ninguna categoría quiero que me muestre todos los productos
    categoryId===undefined&&setLista(listaCatalogo)
  }, [categoryId])

  return (
    <div className='item-list-container'>
      <header className='header'>
        {greeting}
      </header>
      <div className='item-list row'>
        <ItemList estado = {estadoFetch} listaItems = {listaItems} />
      </div>
        
    </div>
  )
}