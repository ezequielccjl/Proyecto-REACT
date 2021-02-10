
import './App.css';
import NavBar from './components/NavBar'
import {ItemListContainer} from './components/ItemListContainer'
import {Cart} from './components/Cart'
import ItemDetailContainer from './components/ItemDetailContainer'
import {Footer} from './components/Footer'
import {Context} from './CartContext'

import {getFirestore} from './firebase'

import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';

function App() {

  const [listaCatalogo, setCatalogo] = useState([])

  useEffect(()=>{
    let db = getFirestore();
    let itemsDb = db.collection("catalogo")
    itemsDb.get()
      .then((querySnapshot) =>{
        querySnapshot === 0 && console.log("NO HAY RESULTADOS")
        let arrayItems = querySnapshot.docs.map((doc)=> doc.data())
        console.log("arrayItems: ", arrayItems)
        setCatalogo(arrayItems)
      })

  }, [])

  return (
    <BrowserRouter>
      <Context>

        <NavBar />

        <Switch>

          <Route exact path="/">
            <ItemListContainer greeting='Internet Warehouse Apparel' listaCatalogo={listaCatalogo}/>
          </Route>

          <Route path="/category/:categoryId">
            <ItemListContainer greeting='Internet Warehouse Apparel' listaCatalogo={listaCatalogo}/>
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>
        
          <Route path="/item/:itemId">
            <ItemDetailContainer listaCatalogo={listaCatalogo}/>
          </Route>

        </Switch>

      </Context>
      
      <Footer />

    </BrowserRouter>
    
  );
}

export default App;
