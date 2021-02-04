
import './App.css';
import NavBar from './components/NavBar/NavBar'
import {ItemListContainer} from './components/ItemListContainer/ItemListContainer'
import {Cart} from './components/Cart/Cart'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { SvgShapes } from './components/SvgShapes/SvgShapes'
import {Context} from './CartContext'

import { BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Context>

        <NavBar />

        <Switch>

          <Route exact path="/">
            <ItemListContainer greeting='Internet Warehouse Apparel' />
          </Route>

          <Route path="/category/:categoryId">
            <ItemListContainer greeting='Internet Warehouse Apparel' />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>
        
          <Route path="/item/:itemId">
            <ItemDetailContainer/>
          </Route>
        </Switch>

      </Context>
      {/*SVG SHAPE-DIVIDER*/}
      <SvgShapes />
      
    </BrowserRouter>
    
  );
}

export default App;
