import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './navbar.css'
import {CartWidget} from '../CartWidget/CartWidget'

import logo from './logo.png'
//import logo2 from './logo2.png'



//Nota personal: export default => para más funciones.

class NavBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            img: logo
        }
    }

    /*
    componentDidMount = ()=>{
        setInterval(() => {
            this.setState(prevState => ({
                img: logo2
            }))
        },500)
    }
    */

    render(){
        return(
            <div className = 'container-nav'>
                <p>
                    <img id='logo-web' className = 'img-logo' src={this.state.img} alt = 'logo'></img>
                </p>
                <p>Home</p>
                <p>Catalogo</p>
                <CartWidget />
            </div>
        )
    }
    
}

export default NavBar