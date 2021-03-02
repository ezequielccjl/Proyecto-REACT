import React, {useContext} from 'react'
import $ from 'jquery'
import '../CSS/cart.css'
import {CartContext} from '../CartContext'
import {SpinnerCart} from './SpinnerCart'

import {ModalCart} from './ModalCart'

export const Cart = () => {

    const context = useContext(CartContext)

    const handlerModal = () => {
        $(".modal_cart").toggleClass("bajar_modal")
        console.log("BAJA")
    }
    
    return(
        <div className="section-cart">
            {context.cantCarrito===0?<SpinnerCart />
            :
            <div className="cont-cart">
                <div className="cart-title">Carrito</div>
                
                {
                    context.listaCarrito.map((i) => (
                        
                        <div className="div-item-carrito row" key={i.id}>
                            <span className="col-xl-3 col-sm-3 col-xs-12 img-cont-cart">
                                <img className="img-item-cart" src={i.item.img} alt="pic"></img>
                            </span>
                            <div className="desc-cart col-xl-7 col-sm-7 col-xs-12">
                                <div className="cart-item-title text-center">{i.item.description}</div>
                                <div> Cantidad x{i.cantidad}</div>
                                <div>${context.calcularTotalItem(i.id)}</div>
                            </div>
                            <div className="cont-botones-cart col-xl-2 col-sm-2 col-xs-12">
                                <button className="btn-cart btn-cart-trash" onClick={()=>{
                                    context.eliminarProd(i)
                                }}>
                                    <span className="id-display-none">{i.id}</span>
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                            
                        </div>
                    ))
                }
                <div className="precio-total">
                    <span className="total-items">Items en carrito: {context.cantCarrito}</span>
                    <span className="total-valor">Total: ${context.total}</span>
                </div>
                <div className="cont-btn-final">
                    <button className="btn-cart-final" onClick={handlerModal}>Confirmar compra</button>
                    
                </div>

                
            </div>
            }

            <ModalCart handlerModal={handlerModal}/>   
        
        </div>
    )
}