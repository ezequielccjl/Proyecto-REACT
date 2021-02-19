import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../CartContext'
import { useParams } from 'react-router-dom'
import { ItemList } from './ItemList'

import '../CSS/itemListCont.css'

export const ItemListContainer = ({greeting}) => {

  let contexto = useContext(CartContext)

  const [listaItems, setListaMostrar] = useState([]) 
  
  //Recibe params según el link en el que se encuentre
  const {categoryId} = useParams()

  //Cada vez que se modifique el categoryId se setea una nueva lista
  useEffect(()=>{
    setListaMostrar(contexto.listaCatalogo.filter(item => item.categoryId===categoryId))

    //En caso de que el categoryId no sea ninguna categoría quiero que me muestre todos los productos
    categoryId===undefined&&setListaMostrar(contexto.listaCatalogo)
  }, [categoryId, contexto.listaCatalogo])

  return (
    <div className='item-list-container'>
      <header className='header text-center'>
        {greeting}
      </header>
      <div className='item-list'>
        <ItemList estado = {contexto.estado} listaItems = {listaItems} />
      </div>
        
    </div>
  )
}