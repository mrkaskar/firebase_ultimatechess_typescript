import React from "react";
import "./App.css";
import HumanChessBoard from "./components/features/boards/HumanChessBoard";
import BotChessBoard from "./components/features/boards/BotChessBoard";
import StockfishBoard from "./components/features/boards/StockfishBoard";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
          <NavBar />
          {/* <HumanChessBoard orentationBoard="black" /> */}
      {/* <StockfishBoard orentationBoard="black"/> */}
      <BotChessBoard orentationBoard="black"/> 
    </div>
  );
}

export default App;
