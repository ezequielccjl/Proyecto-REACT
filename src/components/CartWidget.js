import React, {useContext} from 'react'
import {CartContext} from '../CartContext'
import {Link} from 'react-router-dom'

import '../CSS/cartIcon.css'

export const CartWidget = () => {

    let contexto = useContext(CartContext)

    return (
        <div className="cont-cart-widget">
            <Link to="/cart">
                <i className="fas fa-shopping-cart icon-nav fa-lg"></i>
            </Link>
            
            {contexto.cantCarrito>0&&
                <div className="span-cant">
                    {contexto.cantCarrito}
                </div>
            }
            
        </div>
        
    )
}