import React from 'react';
import Hamburger from '../svg/Hamburger';
import "./NavBar.css";

const NavBar = () =>{
  return (
  <div id="nav-wrapper">
      <div id="navbar">
        <div id="view">
            <Hamburger/>
        </div>
            <h3 id="title">Friendly Match</h3>
      </div>
  </div>
  )  
}

export default NavBar;