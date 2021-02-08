import React, {useContext} from 'react'
import '../CSS/cart.css'
import {CartContext} from '../CartContext'
import {SpinnerCart} from './SpinnerCart'

export const Cart = () => {

    const context = useContext(CartContext)

    return(
        <div className="section-cart">
            {context.cantCarrito===0?<SpinnerCart />
            :
            <div className="cont-cart">
                <div className="cart-title">Carrito</div>
                
                {
                    context.listaCarrito.map((i) => (
                        <div className="div-item-carrito" key={i.id}>
                            <span>
                                <img className="img-item-cart" src={i.item.picture} alt="pic"></img>
                            </span>
                            <div className="desc-cart">
                                <div className="cart-item-title">{i.item.title}</div>
                                <div> Cantidad - {i.cantidad}</div>
                            </div>
                            <div>
                                <button>+</button>
                                <button>-</button>    
                            </div>
                            
                        </div>
                    ))
                }
            </div>
            
            }
                
            
        </div>
    )
}