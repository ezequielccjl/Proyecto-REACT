import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {getFirestore} from '../firebase'

import {CartWidget} from './CartWidget'
import logo from '../imgs-icons/logo.png'
import '../CSS/navbar.css'

const NavBar = () => {


    //Para mapeo de Categorias
    const [listaCategorias, setListaCaterogias] = useState([])

    function catalogoHandler() {
        $(".cont_menu_catalogo").toggleClass("bajar_menu_catalogo");
        $(".arrow-cont").toggleClass("voltear-arrow-cont")
    }

    //----------------------------------- OBTENIENDO CATALOGO --------------------------------------------

    useEffect(()=>{

        let db = getFirestore();
        let itemsDb = db.collection("categorias")
        itemsDb.get()
          .then((querySnapshot) =>{
            querySnapshot.size > 0 && console.log("Categorias cargadas con exito")
            let arrayAMostrar = querySnapshot.docs.map((doc)=> doc.data()) 
            setListaCaterogias(arrayAMostrar)
                
            //console.log("arrayCategorias: ", querySnapshot.docs.map((doc)=> doc.data())) //Lista llena
        })
    
    }, [])

    useEffect(()=>{

        const opCatalogo = document.querySelector(".arrow-cont")
        const ulCatalogo = document.querySelector(".ul_menu_catalogo")

        opCatalogo.addEventListener("click", catalogoHandler)
        ulCatalogo.addEventListener("click", catalogoHandler)
        
        return ()=>{
            opCatalogo.removeEventListener("click", catalogoHandler)
            ulCatalogo.removeEventListener("click", catalogoHandler)
        }

    },[])
    
    return(
        <div className="cont_nav_menu">
            
            <div className = 'container-nav'>
                <div>
                    <Link to={`/`}>
                        <img id='logo-web' className = 'img-logo' src={logo} alt = 'logo'></img>
                    </Link>
                </div>

                <div className="arrow-cont"></div>
                {/*Mapeo de categorias con etiquetas Link*/}
                {listaCategorias.map((cat)=>{
                    return (
                        <Link key={cat.nombre} to={`/category/${cat.id}`}>
                            {cat.nombre.charAt(0).toUpperCase() + cat.nombre.substring(1, cat.nombre.length)} 
                        </Link>
                    )
                })}
                        
                <Link to={'/'}>
                    Todo
                </Link>

                <CartWidget />
            </div>

            <div className="cont_menu_catalogo" >
                <ul className="ul_menu_catalogo">
                        {listaCategorias.map((cat)=>{
                            return (
                                <Link key={cat.nombre} to={`/category/${cat.id}`}>
                                    <li className="li_menu-catalogo">
                                        {cat.nombre.charAt(0).toUpperCase() + cat.nombre.substring(1, cat.nombre.length)}
                                    </li> 
                                </Link>
                            )
                        })}
                    
                </ul>
            </div>
            
        </div>
    )
    
    
}

export default NavBar