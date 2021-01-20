import React from 'react'

import { ItemList } from '../ItemList/ItemList'
import './itemlistcont.css'

export const ItemListContainer = ({greeting}) => {
    return (
      <div className='item-list-container'>
        <header className='header'>
          {greeting}
        </header>

        <div className='item-list'>
          <ItemList />
        </div>
        
      </div>
    )
}