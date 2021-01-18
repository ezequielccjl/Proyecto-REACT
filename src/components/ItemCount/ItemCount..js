import React, {useState} from 'react'
import './itemcount.css'
import item1 from './retro-boca-1.png'

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

    return(
        <div id='cont-item'>
            <div id='div-stock'>
                <span id='span-stock'>Stock disponible: {stockDisp-inicial}</span>
            </div>
            <img src={item1} alt='item1'></img>

            <div>Camiseta Boca Juniors Retro [10]</div>

            <div className='cont-stock'>
                <div className='cont-btn-masmenos'>
                    
                    <button onClick={restarItem}   className='btn-agregar'>-</button>

                    <div className='items-agre'>{contador}</div>

                    <button onClick={sumarItem} className='btn-agregar'>+</button>
                    
                </div>

                <div className='cont-agregar-carrito'>
                    <button className='btn-agregar btn-agregar-item'>Agregar</button>
                </div>
            </div>
        </div>
    )
}