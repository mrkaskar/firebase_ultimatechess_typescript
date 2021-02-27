import React from 'react';
import Hamburger from '../svg/Hamburger';
import "./NavBar.css";

const NavBar = () =>{
const [spread, setSpread] = React.useState(false);
React.useEffect(()=>{
 function closeSubNav() {
   setSpread(false);
 } 
 window.addEventListener('click', closeSubNav);
 return () => window.removeEventListener('click', closeSubNav);
  
},[])
  return (
    <>
  <div id="nav-wrapper">
      <div id="navbar">
        <div id="view">
            <Hamburger  onClick={(e)=>{
              e.stopPropagation()
              setSpread(!spread)}}/>
        </div>
            <h3 id="title">Friendly Match</h3>
      </div>
  </div>
  <div id="subnav" className={spread ? "spread": ""} onClick={(e)=>e.stopPropagation()}>
  <div className="menu-item">HOME</div>
  <div className="menu-item">RESIGN</div>
  <div className="menu-item">ASK DRAW</div>
      </div>
  </>
  )  
}

export default NavBar;