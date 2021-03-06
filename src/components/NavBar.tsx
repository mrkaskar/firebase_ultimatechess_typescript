import React from 'react';
import Hamburger from '../svg/Hamburger';
import "./NavBar.css";
import {Link} from 'react-router-dom';
import { askDraw, endGame } from '../lib/db';
import useTheme from '../hooks/useTheme';

interface NavBarProps {
  title?: string;
  setOfferDraw?: React.Dispatch<React.SetStateAction<"" | "w" | "b" | "d">>,
  color?: string;
  gid?:string;
  gameEnd?:string;
  setResignClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  fen?: string;
  
}
const NavBar = ({title="Bot Match", setOfferDraw,color,gid,gameEnd, setResignClicked, fen}:NavBarProps) =>{
const [spread, setSpread] = React.useState(false);
React.useEffect(()=>{
 function closeSubNav() {
   setSpread(false);
 } 
 window.addEventListener('click', closeSubNav);
 return () => window.removeEventListener('click', closeSubNav);
  
},[])

  const {theme} = useTheme();
  return (
    <>
  <div id="nav-wrapper">
      <div id="navbar" style={{backgroundColor:theme.navColor}}>
        <div id="view">
            <Hamburger onClick={(e)=>{
              e.stopPropagation()
              setSpread(!spread)}}/>
        </div>
            <h3 id="title">{title}</h3>
      </div>
  </div>
  <div style={{backgroundColor:theme.subNavColor}} id="subnav" className={spread ? "spread": ""} onClick={(e)=>e.stopPropagation()}>
  {
    (fen === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" && !gameEnd)  && 
    //@ts-ignore
    <div className="menu-item" onClick={()=>endGame(gid, "Game Aborted!")}>
      ABORT GAME
    </div> 
  }
  {
    (title === "Bot Match") &&
  <Link to="/">
    <div className="menu-item">HOME</div></Link>
  } 
  {
    gameEnd && 
  <Link to="/">
    <div className="menu-item"
    
    >Back to Home</div></Link>
  }
  {
    ((!gameEnd) && (title !== "Bot Match")) &&
    <>
    <div className="menu-item"
    //@ts-ignore
    onClick={()=>setResignClicked(true)}
    >RESIGN</div>
  <div className="menu-item"
  onClick={()=> {askDraw(gid, color);
  setSpread(!spread) 
  }} 
  >ASK DRAW</div>
   </> 
  }
      </div>
  </>
  )  
}

export default NavBar;