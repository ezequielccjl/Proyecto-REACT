import React, { useState, useContext } from 'react'
import {ItemCount} from './ItemCount'
import {Link} from 'react-router-dom'
import {CartContext} from '../CartContext'
import {Spinner} from './Spinner'

import '../CSS/itemDetail.css'

//  item = Lista de items / estado = fetch /
export const ItemDetail = ({item, estado, listaCatalogo}) => {

    const [compraEstado, setCompraEstado] = useState(false)
    const [contador, setContador] = useState(0);

    let contexto = useContext(CartContext)


    const sumarItem = () => {
        contador<item.stock&&setContador(contador+1)
    }

    const restarItem = () => {
        contador>0&&setContador(contador-1)
    }

    const handlerCompra = () => {
        if (contador>0) {
            setCompraEstado(true)
        }else{
            alert("No hay productos a comprar")
        }
        
    }

    const terminarCompra = () => {
        contexto.agregarProd(item.id, item, contador)
        //console.log(contador)
        listaCatalogo.forEach(element => {
            if (element.id===item.id) {
                element.stock=element.stock-contador
            }
        });
        contexto.setCantidad(contexto.cantCarrito+contador)
        //console.log(listaCatalogo)
        //console.log(contexto.cantCarrito)
    }

    return(
        <React.Fragment>
            {estado === 'En Proceso' ? (<Spinner estado={estado}/>) 
                
                :
                  
                item && 
                (
                    <div className="cont-item-detail">
                        <div className="cont-info">
                            <img className="img-detail" src={item.picture} alt="imgProduct"></img>
                            <div className="cont-info-item">
                                <h3 className="detail-title">{item.title}</h3>
                                <h4 className="detail-desc">{item.description}</h4>
                                <ul className="detail-ul">
                                    <li>100% Algodon</li>
                                    <li>Color: Negro</li>
                                    <li>Unisex</li>
                                    <li>Stock Disponible: {item.stock}</li>
                                </ul>
                                <div className="detail-precio">${item.price}</div>
                                {compraEstado===false ?
                                    <ItemCount 
                                        cont = {contador} 
                                        handler={handlerCompra}
                                        sumar = {sumarItem}
                                        restar = {restarItem}
                                        />
                                    :
                                    <Link to="/cart">
                                        <button onClick={terminarCompra} className="btn-finalizar-compra animate__animated animate__fadeInRight">Terminar Compra</button>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

