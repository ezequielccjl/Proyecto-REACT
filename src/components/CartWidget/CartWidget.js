import React, {useContext} from 'react'
import {CartContext} from '../../CartContext'

import './carticon.css'

export const CartWidget = () => {
    let contexto = useContext(CartContext)

    return (
        <span>
            <i className="fas fa-shopping-cart icon-nav fa-lg"></i>
            
                <span className="span-cant">
                    {contexto.cantCarrito}
                </span>
            
                
        </span>
        
    )
}