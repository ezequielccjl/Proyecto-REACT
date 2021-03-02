import React from 'react'
import { Item } from './Item'

import '../CSS/itemList.css'

export const ItemList = ({estado, listaItems}) => {

    //Corroboración de Estado y Lista para renderizar
    return (
        
        <div className='cont-lista-catalogo row'>
            {estado === 'Exitoso' ?
            listaItems?.map((i) => (
                <Item key={i.id} item={i} />
            ))
                :
                <div className="cargando_landing">{estado}</div>
            }

        </div>

    )
} 