
import './App.css';
import NavBar from './components/NavBar'
import {ItemListContainer} from './components/ItemListContainer'
import {Cart} from './components/Cart'
import ItemDetailContainer from './components/ItemDetailContainer'
import {Footer} from './components/Footer'
import {Context} from './CartContext'

import { BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Context>

        <NavBar />

        <Switch>

          <Route exact path="/">
            <ItemListContainer greeting='Internet Warehouse Apparel'/>
          </Route>

          <Route path="/category/:categoryId">
            <ItemListContainer greeting='Internet Warehouse Apparel'/>
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>
        
          <Route path="/item/:itemId">
            <ItemDetailContainer/>
          </Route>

        </Switch>

      </Context>
      
      <Footer />

    </BrowserRouter>
    
  );
}

export default App;
