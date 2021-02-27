import React from "react";
import "./Home.css";
import GameCard from './GameCard';

const Home = () => {
  return (
  <>
    <div id="homenav">
    <div style={{display:'flex', alignItems:'center'}}>
       <img src="icon-72x72.png" alt="guest" id="useravatar"/> 
       <span id="username">Guest</span>
    </div>
       <h3>Alpha Chess</h3>
    </div>
    <div id="homegrid">
      <div className="grid">
        <GameCard img="bishop" show="Computer"/> 
      </div>
      <div className="grid">
        <GameCard img="blackqueen" show="Create Game"/> 
      </div>
      <div className="grid">
        <GameCard img="blackknight" show="Find Games"/> 
      </div>
      <div className="grid">
        <GameCard img="king" show="Settings"/> 
      </div>
      <div className="grid">
        <GameCard img="rook" show="Register"/> 
      </div>
      <div className="grid">
        <GameCard img="blackpawn" show="Login"/> 
      </div>
    </div>
    </>
  );
};

export default Home;
