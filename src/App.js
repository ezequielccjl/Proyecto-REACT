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
        <p className = 'app'>
        Ezequiel Cordova Cruz
        </p>
      </header>
    </div>
  );
}

export default App;
