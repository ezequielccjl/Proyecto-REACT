import React from 'react'
import { Item } from '../Item/Item'

import './itemlist.css'

//IMPORT IMAGENES
import remeFairy from './img-products/fairy-angel.png'
import remeNascar from './img-products/nascar.png'
import remeSolaris from './img-products/solaris.png'

export const ItemList = () => {
    
    let listaCatalogo = [
        {
            id: '4371847139',
            title: 'Fairy Angel',
            description: 'Remera Fairy Angel IWA 2020 Edition',
            price: 1200,
            picture: remeFairy,
            stock: 6
        },{
            id: '3748193789',
            title: 'Nascar',
            description: 'Remera NASCAR IWA 2020 Edition',
            price: 1300,
            picture: remeNascar,
            stock: 4
        },{
            id: '5492549040',
            title: 'Solaris',
            description: 'Remera Solaris [Movie] IWA 2020 Edition',
            price: 1250,
            picture: remeSolaris,
            stock: 11
        },
    ]

    const task = new Promise((resolve, reject) => {
        resolve("bien ahi")
    })

    task.then(result => {
        setTimeout(()=> {
            console.log(result)
        }, 5000)
    })


    return (
        <div className='cont-lista-catalogo'>
            {listaCatalogo.map(i => <Item key={i.id} item={i} />)}
        </div>

    )
} 