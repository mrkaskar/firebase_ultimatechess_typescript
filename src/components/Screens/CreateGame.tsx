import React from 'react';
import HomeNav from './Homenav';
import "./Create.css";
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { deleteGame, getUserGame, makeGame, moveObserver } from '../../lib/db';
import Loading from './Loading';

const CreateGame = () => {
    const [color, setColor] = React.useState<"white"|"black"|"random">("random")
    const [time, setTime] = React.useState<0|5|15|30>(0);
    const [wait, setWait] = React.useState(false);
    const [gameid, setGameid] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const history = useHistory();
    const auth = useAuth();

    React.useEffect(()=>{
       if(!auth?.user){
           history.push('/');
       } 
       //@ts-ignore
      getUserGame(auth?.user.uid).then(r => {
          if(r){
       //@ts-ignore
              setGameid(r);
              setWait(true); 
          }
          setLoading(false);
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    React.useEffect(()=>{
        if(gameid){
            moveObserver(gameid).onSnapshot(doc => {
                if(doc.data()){
                //@ts-ignore
                if(doc.data().u2id){
                    history.push('/hvhgame'); 
                }
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gameid])
    const createGame = async () =>{
        let userColor = color;
    //    if(color === 'random'){
    //        //@ts-ignore
    //       userColor = ["white","black"][Math.floor(Math.random()*2)];
    //    }
       setWait(true);
       //@ts-ignorek
       let gameid = await makeGame(auth?.user.uid, auth?.user.nname, auth?.user.photo, time,userColor);
       setGameid(gameid);
    }
    const cancelGame = async () => {
        setWait(false);
        await deleteGame(gameid);
        setGameid('');
    }
    if(loading) return <Loading/>
    if(wait) return (
        <div id="wait">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <br/>
            <br/>
            <br/>
            <h1>Waiting for other player to accept the game!</h1>
            <button onClick={cancelGame} className="cbtn cancel">Cancel</button>
        </div>
    )

    return (
        <>
            <HomeNav/>
            <div id="creategame-panel">
                 <h3>I want to play</h3>               
                 <div id="colorselect">
                 <h2 onClick={()=>setColor("white")} className={color==="white" ? "active" : ""}>White</h2>
                 <h2 onClick={()=>setColor("random")} className={color==="random" ? "active" : ""}>Random</h2>
                 <h2 onClick={()=>setColor("black")} className={color==="black" ? "active" : ""}>Black</h2>
                 </div>
                 <br/> 
                 <br/>

                 <div id="timeselect">
                  <h3 onClick={()=>setTime(0)} className={time===0 ? "active" : ""}>Unlimited</h3>
                  <h3 onClick={()=>setTime(0)} className={time===5 ? "active" : ""}>5 mins</h3>
                  <h3 onClick={()=>setTime(0)} className={time===15 ? "active" : ""}>15 mins</h3>
                  <h3 onClick={()=>setTime(0)} className={time===30 ? "active" : ""}>30 mins</h3>
                </div>
                  <button onClick={createGame} className="cbtn">Create</button><span>&nbsp;</span><span>&nbsp;</span>
                  <button onClick={()=> history.push('/')} className="cbtn cancel">Cancel</button> 
            </div>
        </>
    )
}

export default CreateGame;