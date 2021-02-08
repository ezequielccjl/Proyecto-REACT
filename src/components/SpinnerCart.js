import React from 'react'
import '../CSS/spinnerCart.css'

export const SpinnerCart = () => {
    return(
        <div className="spinner-cart">
            <h4>No hay elementos en carrito</h4>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}