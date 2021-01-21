import React from 'react'
import {ItemCount} from '../ItemCount/ItemCount.'
import './item.css'

export const Item =  ({item}) => {
    
    const detalleItem = () => {
        alert(item.description)
        
    }
    return(
        <div className='cont-item'>
            <div id='div-stock'>
                <span className='span-stock'>Stock disponible: {item.stock}</span>
            </div>
            <img onClick={detalleItem} src={item.picture} alt='item1'></img>

            <div className='titulo-item'>{item.title}</div>
            <div className='precio-item'>${item.price}</div>

            <ItemCount stock={item.stock} inicial={0}/>

        </div>
    )
} 