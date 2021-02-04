import React from 'react'
import '../CSS/item.css'

import {Link} from 'react-router-dom'

export const Item =  ({item}) => {

    
    return(
        <div className='cont-item'>
            <div id='div-stock'>
                <span className='span-stock'>Stock disponible: {item.stock}</span>
            </div>

            <Link to={`/item/${item.id}`}>
                <img  src={item.picture} alt='item1'></img>
            </Link>

            <div className='titulo-item'>{item.title}</div>
            <div className='precio-item'>${item.price}</div>


        </div>
    )
} 