import React from 'react';
import CapturedPieces from '../../Screens/CapturedPieces';
import TimeCount from '../../Screens/TimeCount';
import './UserArea.css';

type UserAreaProps = {
    avatar: string;
    username: string;
    time?: Number;
    turn: string;
    color: string;
    computer: Boolean;
    capturedPieces?: string[];
    finish: Boolean;
    currentu1Time?: number;
    setCurrentu1Time?: React.Dispatch<React.SetStateAction<number>> 
    currentu2Time?: number;
    setCurrentu2Time?: React.Dispatch<React.SetStateAction<number>>,
    type?: string,
    gameStart?: boolean,
    dbu1?: string,
    gid?: string,
    oren?: string,
}

function UserArea ({avatar, username,time, turn,finish, color, computer, capturedPieces, currentu1Time, setCurrentu1Time,currentu2Time, setCurrentu2Time, type, gameStart, dbu1,gid, oren}:UserAreaProps) {

   return (
       <div className="user-area">
           <div className="avatar">
               <div className={`thinking ${turn === color && !finish ? "showThinking": ""}`}></div>
                   <img className={`avatar-img ${computer && "comp"}`} src={avatar} alt="avatar"/>
           </div>
                   <span className="user-name">{username}</span> 
                   {
                       time ? 
                       //@ts-ignore
                       <TimeCount
                        color={color} 
                        dbu1={dbu1}
                        turn={turn}
                        currentu1Time={currentu1Time}
                        currentu2Time={currentu2Time}
                        setCurrentu1Time={setCurrentu1Time}
                        setCurrentu2Time={setCurrentu2Time}
                        finish={finish}
                        gameStart={gameStart}
                        gid={gid}
                        oren={oren}
                       />:
                       ''
                   }

                   <div className="game-bar">

          {
              capturedPieces && capturedPieces.length > 0 && (
                  <div className="captured">
                      {
                          capturedPieces.map((e,i)=>{
                             return (
                                <CapturedPieces
                                    key={i}
                                    src={`/img/pieces/${e}.png`}
                                />
                             ) 
                          })
                      }
                    </div>
                  
              )
          }
          </div>
                     
         
       </div>
     
   ) 
}

export default UserArea;