import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Home from './components/Home';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
        </Route>

      </Switch>
    </Router>
    </div>
  );
}

export default App;
