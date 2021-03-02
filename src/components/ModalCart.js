import React, {useContext, useEffect, useState} from 'react'
import '../CSS/modalCart.css'
import $ from 'jquery'

import {CartContext} from '../CartContext'
import {getFirestore} from '../firebase'
import firebase from 'firebase/app'


export const ModalCart = ({handlerModal}) => {
    
    const context = useContext(CartContext)

    const [compra, setCompra] = useState({})
    const [compraId, setCompraId] = useState('')

    const handlerCompraFinal = () => {
        verificacionSubmit()
        const db = getFirestore()
        const orderDb = db.collection("compras")
        orderDb.add(compra)
            .then(({id})=>{
                setCompraId(id)
            })
            .catch((e)=> console.log("Ocurrió un error AÑADIENDO COMPRA ", e))
            .finally(() => console.log("Proceso de compra FINALIZADO"))
    }

    const verificacionSubmit = () => {
        let camposVacios = false;

        for (let i = 0; i < 4; i++) {
            if($(".un_input")[i].value === "" ){
                camposVacios = true;
            }
        }

        if (camposVacios === true) {
            alert('Complete los campos requiridos!')
            camposVacios = false;
        }else{
            setCompra({
                cliente: {
                    nombre: $("#input_nombre")[0].value,
                    mail: $("#input_mail")[0].value,
                    telefono: $("#input_tel")[0].value,
                    dni: $("#input_dni")[0].value
                },
                items: context.listaCarrito,
                fecha: firebase.firestore.Timestamp.fromDate(new Date()),
                total: context.total
            })
        }
    }

    useEffect(()=>{
        context.calcularTotalCarrito()
    }, [context.listaCarrito])
    
    return(
        <div className="modal_cart">
            <div className="cont_form">
                <div className="titulo_form text-center">Complete los campos</div>

                <div className="cont_input width-100">
                    <label className="title_input">NOMBRE COMPLETO*</label>
                    <input className="un_input" type="text" required placeholder="Ingrese su nombre" id="input_nombre"></input>
                </div>
                
                <div className="row">
                    <div className="cont_input col-xl-6 col-sm-6 col-xs-12">
                        <label className="title_input">TELÉFONO*</label>
                        <input className="un_input" type="number" required placeholder="Ingrese su teléfono" id="input_tel"></input>
                    </div>
                    <div className="cont_input col-xl-6 col-sm-6 col-xs-12">
                        <label className="title_input">DNI*</label>
                        <input className="un_input" type="number" required placeholder="Ingrese su DNI" id="input_dni"></input>
                    </div>
                </div>

                <div className="cont_input width-100">
                    <label className="title_input">CORREO*</label>
                    <input className="un_input" type="text" required placeholder="Ingrese su mail" id="input_mail"></input>
                </div>

                <div className="cont_input width-100">
                    <label className="title_input">VERIFICACIÓN CORREO*</label>
                    <input className="un_input" type="text" required placeholder="Ingrese su mail por segunda vez" id="input_mail_ver"></input>
                </div>
                
                <button className="btn_final_form" onClick={handlerCompraFinal}>SUBMIT</button>
                <button className="btn_final_form btn_volver" onClick={handlerModal}>Volver</button>
                {compraId && 
                    <div className="cont_id_compra">
                        <div>Tu código de compra es:</div>
                        <div className="id__compra">{compraId}</div>
                    </div>}

            </div>
        </div>
    )
}