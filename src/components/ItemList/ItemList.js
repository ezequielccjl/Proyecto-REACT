import React from 'react'
import { Item } from '../Item/Item'

import './itemlist.css'

export const ItemList = ({estado, listaItems}) => {

    //Corroboración de Estado y Lista para renderizar
    return (
        
        <div className='cont-lista-catalogo'>
            {estado === 'Exitoso' &&
            listaItems?.map((i) => (
                <Item key={i.id} item={i} />
            ))}

        </div>

    )
} 