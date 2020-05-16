import React from "react";
import { Route } from 'react-router-dom';
import Pizza from './components/Pizza';
import Homepage from './components/Homepage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route path="/Pizza">
        <Pizza />
      </Route>
    </div>
  );
};
export default App;
