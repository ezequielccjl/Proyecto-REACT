import React, {useState} from 'react'
import './itemcount.css'

export const ItemCount = ({stock, inicial}) => {

    const [contador, setContador] = useState(inicial);
    const [stockDisp, setStock] = useState(stock)

    const sumarItem = () => {
        if (stockDisp>=1) {
            setContador(contador+1)
            setStock(stockDisp-1)
        }
    }

    const restarItem = () => {
        if (contador>inicial) {
            setContador(contador-1)
            setStock(stockDisp+1)
        }
    } 

    const onAdd = () => {
        contador>0 ? alert("Agregaste " + contador + " elemento(s) al carrito") : alert("No hay elementos para agregar al carrito.")
    }

    return(
            <div className='cont-stock'>
                <div className='cont-btn-masmenos'>
                    
                    <button onClick={restarItem}   className='btn-agregar'>-</button>

                    <div className='items-agre'>{contador}</div>

                    <button onClick={sumarItem} className='btn-agregar'>+</button>
                    
                </div>

                <div className='cont-agregar-carrito'>
                    <button onClick={onAdd} className='btn-agregar btn-agregar-item'>Agregar</button>
                </div>
            </div>
    )
}