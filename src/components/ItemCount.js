import React from 'react'
import '../CSS/itemCount.css'

export const ItemCount = ({cont, handler, sumar, restar}) => {


    return(
            <div className='cont-stock'>
                <div className='cont-btn-masmenos'>
                    
                    <button onClick={restar}   className='btn-agregar'>-</button>

                    <div className='items-agre'>{cont}</div>

                    <button onClick={sumar} className='btn-agregar'>+</button>
                    
                </div>

                <div className='cont-agregar-carrito'>
                    <button onClick={handler} className='btn-agregar btn-agregar-item'>Agregar</button>
                </div>
            </div>
    )
}