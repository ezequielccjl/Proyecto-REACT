import React from 'react'
import {Link} from 'react-router-dom'

import './navbar.css'
import {CartWidget} from '../CartWidget/CartWidget'

import logo from './logo.png'

const NavBar = () => {

    //Para mapeo de Categorias
    const listaCategorias = ['remera', 'buzo']
    
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
                    <Link key={cat} to={`/category/${cat}`}>
                        {cat.charAt(0).toUpperCase() + cat.substring(1, cat.length)} 
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