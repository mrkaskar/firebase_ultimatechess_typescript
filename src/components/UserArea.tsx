import React from 'react';
import './UserArea.css';

type UserAreaProps = {
    avatar: string;
    username: string;
    time?: Number;
    turn: string;
    color: string;
}
function UserArea ({avatar, username, turn, color}:UserAreaProps) {
   return (
       <div className="user-area">
           <div className="avatar">
                <div className={`thinking ${turn === color ? "showThinking": ""}`}></div>
               <img className="avatar-img" src={avatar} alt="avatar"/>
           </div>
          <span className="user-name">{username}</span> 
       </div>
   ) 
}

export default UserArea;