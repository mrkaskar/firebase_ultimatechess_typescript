import React from 'react';
import './UserArea.css';

type UserAreaProps = {
    avatar: string;
    username: string;
    time?: Number;
    turn: string;
    color: string;
    computer: Boolean;
    capturedPieces?: string[];
}

function UserArea ({avatar, username, turn, color, computer, capturedPieces}:UserAreaProps) {
   return (
       <div className="user-area">
           <div className="avatar">
               <div className={`thinking ${turn === color ? "showThinking": ""}`}></div>
               <img className={`avatar-img ${computer && "comp"}`} src={avatar} alt="avatar"/>
           </div>
          <span className="user-name">{username}</span> 
          {
              capturedPieces && capturedPieces.length > 0 && (
                  <div className="captured">
                      {
                          capturedPieces.map((e,i)=>{
                             return (
                             <div className="cap-piece">
                                <img key={e} src={`/img/pieces/${e}.png`} alt="chess peice"/>
                             </div>
                             ) 
                          })
                      }
                    </div>
                  
              )
          }
              
       </div>
     
   ) 
}

export default UserArea;