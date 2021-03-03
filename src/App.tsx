import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";
import Home from './components/Screens/Home';
import ChooseComputer from './components/Screens/ChooseComputer';
import Game from './components/Screens/Game';
import Register from "./components/Screens/Register";
import Login from "./components/Screens/Login";
import CreateGame from "./components/Screens/CreateGame";
import FindGames from "./components/Screens/FindGames";
import Settings from "./components/Screens/Settings";
import {AuthContextProvider} from "./context/AuthContextProvider";
import HvHGame from "./components/Screens/HvHGame";

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
      <AuthContextProvider>
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

        <Route exact path="/hvhgame" component={HvHGame}>
        </Route>

        <Route exact path="/register" component={Register}>
        </Route>

        <Route exact path="/login" component={Login}>
        </Route>

        <Route exact path="/create" component={CreateGame}>
        </Route>
    
        <Route exact path="/find" component={FindGames}>
        </Route>

        <Route exact path="/settings" component={Settings}>
        </Route>
    </AuthContextProvider>
      </Switch>
    </Router>
    </div>
  )
}

export default App;
