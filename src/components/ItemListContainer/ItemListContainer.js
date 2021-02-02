import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { ItemList } from '../ItemList/ItemList'
import './itemlistcont.css'

//IMPORT IMAGENES
import dibujo from './img-products/dibujo.png'
import remeNascar from './img-products/nascar.png'
import remeSolaris from './img-products/solaris.png'
import remeOdyssey from './img-products/2001.png'


export const ItemListContainer = ({greeting}) => {

  //Defino estados seteables para confirmación del "Fetch"
  const [estadoFetch, setEstado] = useState('En proceso')
  const [listaItems, setLista] = useState([]) 

  //Recibe params según el link en el que se encuentre
  const {categoryId} = useParams()

  //Catalogo
  let listaCatalogo = [
    {
        id: '346gYGfyfg',
        title: 'Art Concept',
        description: 'Remera Art Concept IWA 2021 Edition',
        categoria: 'blanco',
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