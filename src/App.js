
import './App.css';
import NavBar from './components/NavBar/NavBar'
import {ItemListContainer} from './components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <ItemListContainer greeting='Internet Warehouse Apparel' />
    </div>
  );
}

export default App;
