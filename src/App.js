// Filename: App.js
import './App.css';
import Navbar from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return ( 
    <div className="App">
      <Navbar/>
    </div>
  );
}
export default App;
