import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ItemList } from './ItemList'
import {getFirestore} from '../firebase'

import '../CSS/itemListCont.css'


export const ItemListContainer = ({greeting}) => {

  //Defino estados seteables para confirmación del "Fetch"
  const [estadoFetch, setEstado] = useState('En proceso')
  const [listaItems, setListaMostrar] = useState([]) 
  
  //Recibe params según el link en el que se encuentre
  const {categoryId} = useParams()

  const [listaCatalogo, setCatalogo] = useState([])

  useEffect(()=>{

    let db = getFirestore();
    let itemsDb = db.collection("catalogo")
    itemsDb.get()
      .then((querySnapshot) =>{
        querySnapshot.size > 0 && setEstado('Exitoso')
        let arrayAMostrar = querySnapshot.docs.map((doc)=> doc.data()) 
        setCatalogo(arrayAMostrar)
            
        console.log("arrayItems: ", querySnapshot.docs.map((doc)=> doc.data())) //Lista llena
      })

  }, [])

  useEffect(() => {
    console.log("listaCatalogo: ", listaCatalogo) //Lista llena

  }, [listaCatalogo])


  //Cada vez que se modifique el categoryId se setea una nueva lista
  useEffect(()=>{
    setListaMostrar(listaCatalogo.filter(item => item.categoria===categoryId))

    //En caso de que el categoryId no sea ninguna categoría quiero que me muestre todos los productos
    categoryId===undefined&&setListaMostrar(listaCatalogo)
  }, [categoryId, listaCatalogo])

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