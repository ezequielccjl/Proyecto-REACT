import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../CartContext'
import {ItemDetail} from './ItemDetail'
import { useParams } from 'react-router-dom'


import '../CSS/itemDetailContainer.css'

const ItemDetailContainer = () => {
  let contexto = useContext(CartContext)
  const [item, setItem] = useState({})
  const [estado, setEstado] = useState("En Proceso")

  const {itemId} = useParams()

  //Por cada vez que cambie el ItemId
  useEffect(()=>{
    contexto.listaCatalogo.forEach(item => {
        if (item.id===itemId) {
          setItem(item);
          setTimeout(()=>{
            setEstado('Verificado')
          },700)
        }
    });
  },[itemId])

  return(
    <div className="cont-detail">
      <ItemDetail item={item} estado={estado} />
    </div>
  )
}

export default ItemDetailContainer