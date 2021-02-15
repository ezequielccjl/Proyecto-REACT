import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getFirestore} from '../firebase'

import {CartWidget} from './CartWidget'
import logo from '../imgs-icons/logo.png'
import '../CSS/navbar.css'

const NavBar = () => {


    //Para mapeo de Categorias
    const [listaCategorias, setListaCaterogias] = useState([])

    //----------------------------------- OBTENIENDO CATALOGO --------------------------------------------

    useEffect(()=>{

        let db = getFirestore();
        let itemsDb = db.collection("categorias")
        itemsDb.get()
          .then((querySnapshot) =>{
            querySnapshot.size > 0 && console.log("Categorias cargadas con exito")
            let arrayAMostrar = querySnapshot.docs.map((doc)=> doc.data()) 
            setListaCaterogias(arrayAMostrar)
                
            console.log("arrayCategorias: ", querySnapshot.docs.map((doc)=> doc.data())) //Lista llena
        })
    
    }, [])
    
    useEffect(() => {
        console.log("listaCategorias: ", listaCategorias) //Lista llena
    }, [listaCategorias])
    
    return(
        <div className = 'container-nav'>
            <p>
                <Link to={`/`}>
                    <img id='logo-web' className = 'img-logo' src={logo} alt = 'logo'></img>
                </Link>
            </p>

            {/*Mapeo de categorias con etiquetas Link*/}
            {listaCategorias.map((cat)=>{
                return (
                    <Link key={cat.nombre} to={`/category/${cat.id}`}>
                        {cat.nombre.charAt(0).toUpperCase() + cat.nombre.substring(1, cat.nombre.length)} 
                    </Link>
                )
            })}
                    
            <Link to={'/'}>
                <p>Todo</p>
            </Link>

            <CartWidget />
        </div>
    )
    
    
}

export default NavBar