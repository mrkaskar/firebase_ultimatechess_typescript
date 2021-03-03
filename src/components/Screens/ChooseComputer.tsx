import React from 'react';
import Homenav from './Homenav';
import "./ChooseComputer.css"
import { useHistory } from 'react-router-dom';

const ChooseComputer =() => {
    const computers = [{
        name: "John",
        des: "John is starting to play chess! Don't bully him!",
        level:0,
    },{
        name: "Cristina",
        des: "Christina knows how to move and how to do checkmate!",
        level: 1,
    },
    {
        name: "Alex",
        des: "Chess is hobby for Alex. He plays chess to be a master.",
        level:2,
    },
    {
        name: "Max",
        des: "Max plays chess very well. He was once a champion in his town.",
        level:100,

    },
    {
        name: "Beth",
        des: "Beth is just 13 years old now. However, her chess skill is over the horizon.",
        level: 10,
    },
    {
        name: "Josh",
        des: "Josh can play with you even with his eyes closed.",
        level: 20
    }
    ]
    type Color = "white" | "random" | "black";
    const [choose, setChoose] = React.useState("");
    const [color, setColor] = React.useState<Color>("random");
    const history = useHistory();
    const gameAccept = () =>{
       let gameid = Math.floor(Math.random()*1000) + Date.now();
       let user = color;
       if(user === "random"){
           //@ts-ignore
           user = ["white", "black"][Math.floor(Math.random()*2)];
       }
       let chosenBot = computers.find(e => e.name === choose);
       
       let game = { id: gameid, user, botname: chosenBot?.name, botlevel: chosenBot?.level };
       localStorage.setItem("botgame", JSON.stringify(game));
       history.push('/game') 
    }
    return (
    <>
        <Homenav/>
        <br/>
        <h4>Choose a player to play with</h4>
        <br/>
        <span>Or</span><br/>
        <br/>
        <span onClick={()=>history.push('/')}>Back</span>
        <div id="bots">
            {
               computers.map((e,i)=>(
                   <div key={i} className="bot" onClick={()=>setChoose(e.name)}>
                        <img className="botimg" src={`/img/bots/${e.name}.png`} alt="bot"/>
                        <span>{e.name}</span>
                        <p className="des">{e.des}</p>
                    </div>
               )) 
            }
        </div>
        <div id="backdrop" className={choose ? "show" : ""}>
           <div id="chosenInfo">
            <img className="botimgchoose" src={`/img/bots/${choose}.png`} alt="bot"/>
            <h3>{choose}</h3>
            <br/>
            <h2>I want to play</h2>
            <div id="choice">
               <h1 onClick={()=>setColor("white")} className={color === "white" ? "choice": ""}>White</h1> 
               <h1 onClick={()=>setColor("random")} className={color === "random" ? "choice": ""}>Random</h1> 
               <h1 onClick={()=>setColor("black")} className={color === "black" ? "choice": ""}>Black</h1> 
            </div>
            <br/>
            <br/>
            <div id="buttons">
            <button onClick={gameAccept} className="btn success">Accept</button>
            <button className="btn danger" onClick={()=>setChoose("")}>Close</button>
            </div>
           </div> 
        </div>
    </>
    )
}

export default ChooseComputer;