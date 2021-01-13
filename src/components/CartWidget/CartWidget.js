import React from 'react'
import cartIcon from './cart-icon.png'

import './carticon.css'

export const CartWidget = () => {
    return (
        <img id='cart-icon' src={cartIcon} alt='cart-icon'></img>
    )
}