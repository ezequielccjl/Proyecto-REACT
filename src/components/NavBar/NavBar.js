import React from 'react'
import './navbar.css'

//Nota personal: export default => para más funciones.

export const NavBar = () => {
    return(
        <div className = 'container-nav'>
            <p>LOGO</p>
            <p>Home</p>
            <p>Catalogo</p>
            <p>Carrito</p>
        </div>
    )
}