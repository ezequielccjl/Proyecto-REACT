import React, {useContext, useEffect, useState} from 'react'
import '../CSS/cart.css'
import {CartContext} from '../CartContext'
import {SpinnerCart} from './SpinnerCart'
import {getFirestore} from '../firebase'
import firebase from 'firebase/app'

export const Cart = () => {

    const context = useContext(CartContext)
    const [compra, setCompra] = useState({})
    const [compraId, setCompraId] = useState('')

    const handlerCompraFinal = () => {
        const db = getFirestore()
        const orderDb = db.collection("compras")
        orderDb.add(compra)
            .then(({id})=>{
                setCompraId(id)
            })
            .catch((e)=> console.log("Ocurrió un error AÑADIENDO COMPRA ", e))
            .finally(() => console.log("Proceso de compra FINALIZADO"))
    }

    useEffect(()=>{
        context.calcularTotalCarrito()
    }, [context.listaCarrito])

    useEffect(()=>{
        setCompra({
            cliente: 'Ezequiel',
            items: context.listaCarrito,
            fecha: firebase.firestore.Timestamp.fromDate(new Date()),
            total: context.total
        })
    }, [context.total])

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
                                <img className="img-item-cart" src={i.item.img} alt="pic"></img>
                            </span>
                            <div className="desc-cart">
                                <div className="cart-item-title">{i.item.description}</div>
                                <div> Cantidad x{i.cantidad}</div>
                                <div>${context.calcularTotalItem(i.id)}</div>
                            </div>
                            <div className="cont-botones-cart">
                                {/* <button className="btn-cart">+</button> */}
                                <button className="btn-cart btn-cart-trash" onClick={context.eliminarProd(i)}>
                                    <i className="far fa-trash-alt"></i>
                                </button>
                                {/* <button className="btn-cart">-</button> */}
                            </div>
                            
                        </div>
                    ))
                }
                <div className="precio-total">
                    <span className="total-items">Items en carrito: {context.cantCarrito}</span>
                    <span className="total-valor">Total: ${context.total}</span>
                </div>
                <div>
                    <button className="btn-cart-final" onClick={handlerCompraFinal}>Confirmar compra</button>
                    {compraId && <div>{compraId}</div>}
                </div>
            </div>
            
            }
                
            
        </div>
    )
}