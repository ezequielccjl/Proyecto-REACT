
import './App.css';
import NavBar from './components/NavBar/NavBar'
import {ItemListContainer} from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { SvgShapes } from './components/SvgShapes/SvgShapes'

import { BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Switch>

        <Route exact path="/">
          <ItemListContainer greeting='Internet Warehouse Apparel' />
        </Route>
      
        <Route path="/detail/:itemId">
          <ItemDetailContainer/>
        </Route>
      </Switch>

      {/*SVG SHAPE-DIVIDER*/}
      <SvgShapes />
      
    </BrowserRouter>
    
  );
}

export default App;
