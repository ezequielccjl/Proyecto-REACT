import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../CartContext'
import { useParams } from 'react-router-dom'
import { ItemList } from './ItemList'
import {Link} from 'react-router-dom'

import '../CSS/itemListCont.css'

export const ItemListContainer = ({greeting}) => {

  let contexto = useContext(CartContext)
  let listaFiltrada

  const [listaItems, setListaMostrar] = useState([]) 
  const [foundCat, setFoundCat] = useState(true)
  
  //Recibe params según el link en el que se encuentre
  const {categoryId} = useParams()


  //Cada vez que se modifique el categoryId se setea una nueva lista
  useEffect(()=>{
    listaFiltrada = contexto.listaCatalogo.filter(item => item.categoryId===categoryId)

    setListaMostrar(listaFiltrada)

    //En caso de que el categoryId no sea ninguna categoría quiero que me muestre todos los productos
    categoryId===undefined&&setListaMostrar(contexto.listaCatalogo)
  }, [categoryId, contexto.listaCatalogo])

  useEffect(()=>{
    
    if(categoryId){
      listaFiltrada.length === 0 ? setFoundCat(false) : setFoundCat(true)
    }else{
      setFoundCat(true)
    }

  }, [categoryId])

  return (
    <div className='item-list-container estado-cargando'>
      <header className='header text-center'>
        {greeting}
      </header>
      <div className='item-list'>
        {
          foundCat ? <ItemList estado = {contexto.estado} listaItems = {listaItems} />
            :
            <div className="not_found">
              <div className="text-center">No se encontró la categoría</div>
              <Link to="/">
                <button className="btn_not_found">Volver</button>
              </Link>  
            </div>
        }
      </div>
        
    </div>
  )
}