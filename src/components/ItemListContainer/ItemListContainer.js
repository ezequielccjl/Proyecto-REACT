import React from 'react'

import {ItemCount} from '../ItemCount/ItemCount.'
import './itemlist.css'

//import logo from '../../logo.svg';
//<img src={logo} className="App-logo" alt="logo" />

export const ItemListContainer = ({greeting}) => {
    return (
      <header className="App-header">

        <ItemCount stock={8} inicial={0} />
        
        <p className = 'app'>
            {greeting}
        </p>
        <div className= 'div-caratula'>
          <p className = 'app'>
          Ezequiel Cordova Cruz
          </p>
          <p className = 'app'>
          Camada-11365
          </p>
        </div>
      </header>
    )
}