import React from 'react'
import {ItemCount} from '../ItemCount/ItemCount'

import './itemdetail.css'

export const ItemDetail = ({item, estado}) => {
    return(
        <React.Fragment>
            {estado === 'En Proceso' ? (<h3>{estado}</h3>) :  item && 
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
                                <ItemCount stock={item.stock} inicial = {0} />
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

