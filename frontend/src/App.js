import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Movie from './components/pages/Movie';
import Group from './components/pages/Group';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          {/* Correct the path and component name */}
          <Route path='/pages/Group' component={Group} />
        </Switch>
      </Router>
    </div>
  );
}