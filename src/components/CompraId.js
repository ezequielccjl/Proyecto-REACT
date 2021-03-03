import React, {useContext, useEffect, useState} from 'react'
import {getFirestore} from '../firebase'
import {CartContext} from '../CartContext'
import $ from 'jquery'
import '../CSS/compraId.css'

export const CompraId = () => {

    const context = useContext(CartContext)

    const [compraInfo, setCompraInfo] = useState()

    const handlerBuscar = () => {
        if($("#id")[0].value){
            let db = getFirestore();
            let comprasDb = db.collection("compras")
            let compra = comprasDb.doc($("#id")[0].value)
            compra.get()
            .then((itemDb) =>{
                if(!itemDb){
                    alert("ID Inexistente")   
                }else{
                    console.log(itemDb.data())
                    setCompraInfo(itemDb.data())
                }
                
            })

            handlerModalId()
        }else{
            alert("Ingrese una ID")
        }
    }

    //Baja y sube el modal con las IDS
    const idModalHandler = () => {
        $(".cont_modal_ids").toggleClass("bajar_modal_ids")
    }

    const handlerModalId = () => {
        $(".cont_item_db").toggleClass("bajar_modal_id")
    }


    return(
        <div className="cont_compras">


            <div className="cont_landing_compras">
                <label className="titulo_compras text-center" htmlFor="id">Ingresa el ID de tu compra:</label>
                <input id="id" placeholder="ID de tu compra"></input>
                <button className="btn_modal" onClick={handlerBuscar}>Buscar</button>
                <div className="idModalHandler" onClick={idModalHandler}>Ver compras realizadas en este dispositivo</div>
            </div>


            <div className="cont_modal_ids">
                <div className="modal_ids">
                    <div className="modal_titulo">ID's de compras realizadas</div>
                    <ul className="ul_compras">
                        {context.listaCompras.map((i) =>{
                            return (
                                <li key={i}>{i}</li>
                            )
                            })
                        }
                    </ul>
                    <button onClick={idModalHandler} className="btn_modal">Volver</button>
                </div>
            </div>


            {compraInfo &&
                <div className="cont_item_db">
                    <div className="get_info">
                        <div className="titulo_modal">Compra de {compraInfo.cliente.nombre}:</div>
                        <div className="cont_ul_id">
                            <ul className="ul_modal_id">
                                {
                                    compraInfo.items.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                <div className="cont_item_modal">
                                                    <img className="img_modal_id" src={item.item.img}></img>
                                                    <div>{item.item.title} x{item.cantidad}</div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="mt-3 mb-3">Total: ${compraInfo.total}</div>
                            <button className="btn_modal" onClick={handlerModalId}>Salir</button>
                        </div>
                    </div>
                </div>
            }

            
        </div>
    )
}