import React, {useEffect} from 'react'
import '../CSS/footer.css'
import {SvgShapes} from './SvgShapes'

import logo from '../imgs-icons/logo.png'
import logo2 from '../imgs-icons/logo2.png'

export const Footer = ()=>{

    let img = logo;
    
    /*  Función a implementar para que el logo cambie por cada segundo

    function logoEnTiempo() {
        setInterval(()=>{
            img===logo?img=logo2:img=logo
        },1000)
    }


    useEffect(()=>{
        logoEnTiempo()
    },[])
    */

    return(
        <div>
            <SvgShapes />
            <section className="section-footer">
                <div>
                    <img className="img-footer" src={img} alt="logo-footer"></img>
                </div>
                <div className="contacto-footer">
                    <i className="fab fa-instagram fa-3x"></i>
                    <i className="fab fa-twitter fa-3x"></i>
                    <i className="fab fa-facebook fa-3x"></i>
                    <i className="fab fa-github fa-3x"></i>
                    <i className="fab fa-whatsapp fa-3x"></i>
                </div>
            </section>
        </div>
    )
}