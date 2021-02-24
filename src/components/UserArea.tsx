import React from 'react';
import './UserArea.css';

type UserAreaProps = {
    avatar: string;
    username: string;
    time?: Number;
}
function UserArea ({avatar, username}:UserAreaProps) {
   return (
       <div className="user-area">
           <div className="avatar">
               <img className="avatar-img" src={avatar} alt="avatar"/>
           </div>
          <span className="user-name">{username}</span> 
       </div>
   ) 
}

export default UserArea;