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