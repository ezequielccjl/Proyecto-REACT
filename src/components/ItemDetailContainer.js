import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../CartContext'
import {ItemDetail} from './ItemDetail'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'



import '../CSS/itemDetailContainer.css'

const ItemDetailContainer = () => {
  let contexto = useContext(CartContext)
  const [item, setItem] = useState({})
  const [estado, setEstado] = useState("En Proceso")
  const [found, setFound] = useState(false)

  const {itemId} = useParams()

  //Por cada vez que cambie el ItemId
  useEffect(()=>{
    contexto.listaCatalogo.forEach(item => {
        if (item.id===itemId) {
          setItem(item);
          setFound(true)
          setTimeout(()=>{
            setEstado('Verificado')
          },700)
        }
    });
  },[itemId])

  return(
    <div className="cont-detail">
      {found ? <ItemDetail item={item} estado={estado} />
        :
        <div className="not_found">
          <div>No se encontró item</div>
          <Link to="/">
            <button className="btn_not_found">Volver</button>
          </Link>  
        </div>}
    </div>
  )
}

export default ItemDetailContainer