import React from 'react'
import './navbar.css'

import logo from './logo-navbar.png'

//Nota personal: export default => para más funciones.

export const NavBar = () => {
    return(
        <div className = 'container-nav'>
            <p>
                <img className = 'img-logo' src={logo} alt = 'logo'></img>
            </p>
            <p>Home</p>
            <p>Catalogo</p>
            <p>Carrito</p>
        </div>
    )
}