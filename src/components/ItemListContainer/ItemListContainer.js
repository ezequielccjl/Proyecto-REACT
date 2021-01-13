import React from 'react'
import logo from '../../logo.svg';

export const ItemListContainer = ({greeting}) => {
    return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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