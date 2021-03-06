import React from "react";
import "./Home.css";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";
import HomeNav from "./Homenav";
import useAuth from "../../hooks/useAuth";
import { logOut } from "../../lib/firebaseAuthService";
import useTheme from "../../hooks/useTheme";
import { disableBodyScroll } from "body-scroll-lock";

const Home = () => {
  const auth = useAuth();
  const { theme } = useTheme()
    const targetEle = React.useRef<any>(null);
    
    React.useEffect(()=>{
       disableBodyScroll(targetEle.current);
    },[]);
   return (
    <>
      <HomeNav />
      <div id="homegrid" ref={targetEle}>
        <div className="grid">
          <Link style={{color: theme.text}} to="/computer">
            <GameCard img="bishop" show="Computer" />
          </Link>
        </div>
        {auth?.user && (
          <>
            <div className="grid">
            <Link style={{color: theme.text}} to="/create">
              <GameCard img="blackqueen" show="Create Game" />
            </Link>
            </div>
            <div className="grid">
            <Link style={{color: theme.text}} to="/find">
              <GameCard img="blackknight" show="Find Games" />
            </Link>
            </div>
            <div className="grid">
            <Link style={{color: theme.text}} to="/settings">
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
            <Link style={{color: theme.text}} to="/register">
              <GameCard img="rook" show="Register for Online" />
            </Link>
            </div>
            <div className="grid">
            <Link style={{color: theme.text}} to="/login">
              <GameCard img="blackpawn" show="Login" />
            </Link>
            </div>
          </>
        )}

        <div className="grid">
          <Link style={{color: theme.text}} to="/about">
            <GameCard img="about" show="About" />
          </Link>
        </div>
      </div>

    </>
  );
};

export default Home;
