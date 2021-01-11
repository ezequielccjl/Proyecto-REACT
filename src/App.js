import logo from './logo.svg';
import './App.css';
import {NavBar} from './components/NavBar/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className = 'app'>
          Mi App :-)
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
    </div>
  );
}

export default App;
