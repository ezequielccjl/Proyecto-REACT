
import './App.css';
import NavBar from './components/NavBar/NavBar'
import {ItemListContainer} from './components/ItemListContainer/ItemListContainer'
import {Cart} from './components/Cart/Cart'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { SvgShapes } from './components/SvgShapes/SvgShapes'
import {Context} from './CartContext'

//IMPORT IMAGENES
import dibujo from './img-products/dibujo.png'
import remeNascar from './img-products/nascar.png'
import remeSolaris from './img-products/solaris.png'
import remeOdyssey from './img-products/2001.png'

import { BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {

  //Catalogo
  let listaCatalogo = [
    {
        id: '346gYGfyfg',
        title: 'Art Concept',
        description: 'Remera Art Concept IWA 2021 Edition',
        categoria: 'blanco',
        price: 1500,
        picture: dibujo,
        stock: 7
    },{
        id: '3748193789',
        title: 'Nascar',
        description: 'Remera NASCAR IWA 2020 Edition',
        categoria: 'negro',
        price: 1300,
        picture: remeNascar,
        stock: 4
    },{
        id: '5492549040',
        title: 'Solaris',
        description: 'Remera Solaris [Movie] IWA 2020 Edition',
        categoria: 'negro',
        price: 1250,
        picture: remeSolaris,
        stock: 11
    },{
    id: "aishd2JerR",
    title: "2001 Odyssey",
    description: "Remera Space Odyssey IWA 2021 Edition",
    categoria: "negro",
    price: 1200,
    picture: remeOdyssey,
    stock: 14
    }
]

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
      {/*SVG SHAPE-DIVIDER*/}
      <SvgShapes />
      
    </BrowserRouter>
    
  );
}

export default App;
