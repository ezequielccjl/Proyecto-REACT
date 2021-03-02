import React from 'react'
import {Link} from 'react-router-dom'
import '../CSS/spinnerCart.css'

export const SpinnerCart = () => {
    return(
        <Link to="/">
            <div className="spinner-cart">
                <h4 className="text-center">No hay elementos en carrito</h4>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </Link>
    )
}