import React from 'react'
import '../CSS/footer.css'
import {SvgShapes} from './SvgShapes'

import logo from '../imgs-icons/logo.png'

export const Footer = ()=>{

    let img = logo;

    return(
        <div>
            <SvgShapes />
            <section className="section-footer">
                <div className="contacto-footer">
                    <i className="fab fa-instagram fa-2x"></i>
                    <i className="fab fa-twitter fa-2x"></i>
                    <i className="fab fa-facebook fa-2x"></i>
                    <i className="fab fa-whatsapp fa-2x"></i>
                </div>
                <div className="footer-copy text-center">© 2021 by IWA-MARKET. Developed by Ezequiel Cordova</div>
            </section>
        </div>
    )
}