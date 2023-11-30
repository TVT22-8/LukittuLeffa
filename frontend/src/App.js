import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movie from './components/pages/Movie';
import Group from './components/pages/Group';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Movie" element={<Movie/>} />
          <Route path="/Group" element={<Group/>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;