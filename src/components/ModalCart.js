import React, {useContext, useEffect, useState} from 'react'
import '../CSS/modalCart.css'
import $ from 'jquery'

import {CartContext} from '../CartContext'
import {getFirestore} from '../firebase'
import firebase from 'firebase/app'


export const ModalCart = ({handlerModal}) => {
    
    const db = getFirestore()
    
    const context = useContext(CartContext)

    const [compra, setCompra] = useState({})
    const [compraId, setCompraId] = useState('')
    const [spinnerHandler, setSpinner] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        tel: '',
        dni: '',
        mail: '',
        mail_verificacion: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handlerCompraFinal = () => {

        setSpinner(true)

        verificacionSubmit()
        console.log("Se hizo la VERIFICACION")
        console.log("compra: ", compra)
        const orderDb = db.collection("compras")
        orderDb.add(compra)
            .then(({id})=>{
                setCompraId(id)

                const stampsToUpdate = db.collection('catalogo').where(
                    firebase.firestore.FieldPath.documentId(),
                    'in',
                    context.listaCarrito.map((i) => i.id)
                );
        
                const updateStock = async () => {
                    const query = await stampsToUpdate.get();
                    const batch = db.batch();
                    query.docs.forEach((docSnapshot, idx) => {
                      batch.update(docSnapshot.ref, {
                        stock: docSnapshot.data().stock - context.listaCarrito[idx].cantidad,
                      });
                    });
                    batch.commit();
                };
        
                updateStock();

                setSpinner(false)

                
            })
        .catch((e)=> console.log("Ocurrió un error AÑADIENDO COMPRA ", e))
        .finally(() => {
            console.log("Proceso de compra FINALIZADO")
        })

    }

    const verificacionSubmit = () => {
        let camposVacios = false;

        for (let i = 0; i < 5; i++) {
            if($(".un_input")[i].value === "" ){
                camposVacios = true;
            }
        }

        if (camposVacios === true) {
            alert('Complete los campos requiridos!')
            camposVacios = false;
        }
    }

    useEffect(()=>{

        const newOrder = {
            cliente: formData,
            items: context.listaCarrito,
            fecha: firebase.firestore.Timestamp.fromDate(new Date()),
            total: context.total,
        };

        setCompra(newOrder)

    }, [formData])

    useEffect(()=>{
        context.calcularTotalCarrito()
    }, [context.listaCarrito])


    
    return(
        <div className="modal_cart">
            <div className="cont_form">
                <div className="titulo_form text-center">Complete los campos</div>

                <div className="cont_input width-100">
                    <label className="title_input">NOMBRE COMPLETO*</label>
                    <input 
                        className="un_input" 
                        type="text" 
                        placeholder="Ingrese su nombre" 
                        id="nombre" 
                        onChange={handleChange}>
                    </input>    
                </div>
                
                <div className="row">
                    <div className="cont_input col-xl-6 col-sm-6 col-xs-12">
                        <label className="title_input">TELÉFONO*</label>
                        <input 
                            className="un_input" 
                            type="number" 
                            placeholder="Ingrese su teléfono" 
                            id="tel" 
                            onChange={handleChange}>
                        </input>    
                    </div>
                    <div className="cont_input col-xl-6 col-sm-6 col-xs-12">
                        <label className="title_input">DNI*</label>
                        <input 
                            className="un_input" 
                            type="number" 
                            placeholder="Ingrese su DNI" 
                            id="dni" 
                            onChange={handleChange}>
                        </input>
                            
                    </div>
                </div>

                <div className="cont_input width-100">
                    <label className="title_input">CORREO*</label>
                    <input 
                        className="un_input" 
                        type="text" 
                        placeholder="Ingrese su mail" 
                        id="mail" 
                        onChange={handleChange}>
                    </input>

                </div>

                <div className="cont_input width-100">
                    <label className="title_input">VERIFICACIÓN CORREO*</label>
                    <input 
                        className="un_input" 
                        type="text" 
                        placeholder="Ingrese su mail por segunda vez" 
                        id="mail_verificacion" 
                        onChange={handleChange}>
                    </input>
                </div>
                
                <button className="btn_final_form" onClick={handlerCompraFinal}>SUBMIT</button>
                <button className="btn_final_form btn_volver" onClick={handlerModal}>Volver</button>
                {spinnerHandler ? 
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                : 
                    compraId && 
                    
                    <div className="cont_id_compra">
                        <div>Tu código de compra es:</div>
                        <div className="id__compra">{compraId}</div>
                    </div>
                    
                }

            </div>
        </div>
    )
}