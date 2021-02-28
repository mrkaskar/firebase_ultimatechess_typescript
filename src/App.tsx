import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Home from './components/Home';
import ChooseComputer from './components/ChooseComputer';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
        </Route>

        <Route exact path="/index.html" component={Home}>
        </Route>

        <Route exact path="/index" component={Home}>
        </Route>

        <Route exact path="/computer" component={ChooseComputer}>
        </Route>

        <Route exact path="/game" component={Game}>
        </Route>

      </Switch>
    </Router>
    </div>
  )
}

export default App;
