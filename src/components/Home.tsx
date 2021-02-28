import React from "react";
import "./Home.css";
import GameCard from './GameCard';
import {Link} from 'react-router-dom';
import HomeNav  from './Homenav';


const Home = () => {
  return (
  <>
  <HomeNav/>
    <div id="homegrid">
      <div className="grid">
      <Link to="/computer">
        <GameCard img="bishop" show="Computer"/> 
      </Link>
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
