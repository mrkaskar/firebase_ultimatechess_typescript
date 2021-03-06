import React from 'react';
import { useHistory } from 'react-router-dom';

import "./About.css";
import HomeNav from './Screens/Homenav';

const About = () => {
    const history = useHistory();
    return <>
        <HomeNav/>
        <div id="about-panel">
        <h3>About App</h3>
        <br/>
        <p id="message">
            Welcome to beta version of "Alpha Chess!"
            <br/>
            If you found any bugs,
            <br/> 
             feel free to email to kzinthant.d3v@gmail.com
             <br/>
             Thank you!
        </p>
            <button
             className="cbtn cancel" 
             onClick={()=>history.push('/')}
            >Back</button>
        </div>
    </>
}

export default About;