import React from "react";
import "./Home.css";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";
import HomeNav from "./Homenav";
import useAuth from "../../hooks/useAuth";
import { logOut } from "../../lib/firebaseAuthService";

const Home = () => {
  const auth = useAuth();
  return (
    <>
      <HomeNav />
      <div id="homegrid">
        <div className="grid">
          <Link to="/computer">
            <GameCard img="bishop" show="Computer" />
          </Link>
        </div>
        {auth?.user && (
          <>
            <div className="grid">
            <Link to="/create">
              <GameCard img="blackqueen" show="Create Game" />
            </Link>
            </div>
            <div className="grid">
            <Link to="/find">
              <GameCard img="blackknight" show="Find Games" />
            </Link>
            </div>
            <div className="grid">
            <Link to="/settings">
              <GameCard img="king" show="Settings" />
            </Link>
            </div>
            <div className="grid" onClick={logOut}>
              <GameCard img="logout" show="Logout" />
            </div>
          </>
        )}
        {!auth?.user && (
          <>
            <div className="grid">
            <Link to="/register">
              <GameCard img="rook" show="Register for Online" />
            </Link>
            </div>
            <div className="grid">
            <Link to="/login">
              <GameCard img="blackpawn" show="Login" />
            </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
