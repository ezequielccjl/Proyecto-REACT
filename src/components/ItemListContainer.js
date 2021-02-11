import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ItemList } from './ItemList'
import {getFirestore} from '../firebase'

import '../CSS/itemListCont.css'


export const ItemListContainer = ({greeting}) => {

  const [listaCatalogo, setCatalogo] = useState([])

  useEffect(()=>{
    //obj.data()
    let task = new Promise((success, reject) => {

      let db = getFirestore();
      let itemsDb = db.collection("catalogo")
      itemsDb.get()
        .then((querySnapshot) =>{
          querySnapshot === 0 && console.log("NO HAY RESULTADOS")
          
          //PROBLEMA: No puedo setear el catalogo con lo que traigo de firestore
          //Las tablas estan bien linkeadas ya que en la Linea:31 se hace el console.log de los items correctamente

          let arrayAMostrar = querySnapshot.docs.map((objeto)=> querySnapshot.docs.map((doc)=> doc.data()) )


          setCatalogo(arrayAMostrar)
          console.log("listaCatalogo: ", listaCatalogo)
          console.log("arrayItems: ",querySnapshot.docs.map((doc)=> doc.data()))
          console.log(typeof querySnapshot.docs.map((doc)=> doc.data()))

          listaCatalogo.length ? success(listaCatalogo) : reject('Error durante FETCH');
        })

    })

    task.then(lista => {
      
      //Si la busqueda es exitosa se reemplaza la lista vacía por la lista del catalogo
      //Tambien se setea un estado Exitoso para corroborar en ItemList  
      console.log("SUCCESS: Se obtuvo lista completa")
      setListaMostrar(lista);
      setEstado('Exitoso');

    }).catch((err)  => {
      console.log("Surgió un problema: "+ err)
      setEstado('Error');
    })


  }, [])


  //Defino estados seteables para confirmación del "Fetch"
  const [estadoFetch, setEstado] = useState('En proceso')
  const [listaItems, setListaMostrar] = useState([]) 

  //Recibe params según el link en el que se encuentre
  const {categoryId} = useParams()


  //Cada vez que se modifique el categoryId se setea una nueva lista
  useEffect(()=>{
    setListaMostrar(listaCatalogo.filter(item => item.categoria===categoryId))

    //En caso de que el categoryId no sea ninguna categoría quiero que me muestre todos los productos
    categoryId===undefined&&setListaMostrar(listaCatalogo)
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