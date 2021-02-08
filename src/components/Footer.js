import React, {useEffect} from 'react'
import '../CSS/footer.css'

import logo from '../imgs-icons/logo.png'
import logo2 from '../imgs-icons/logo2.png'

export const Footer = ()=>{

    let img = logo;
    function logoEnTiempo() {
        setInterval(()=>{
            img===logo?img=logo2:img=logo
        },1000)
    }


    useEffect(()=>{
        logoEnTiempo()
        console.log(document.querySelector(".section-footer"))
    },[])

    return(
        <section className="section-footer">
            <div>
                <img className="img-footer" src={img} alt="logo-footer"></img>
            </div>
        </section>
    )
}