import React from 'react';
import "./Modal.css";

const Modal = ({show, setShowModal, modalContent}:{show: Boolean, setShowModal:React.Dispatch<React.SetStateAction<Boolean>>, modalContent: {
    title: string;
    user: string;
    avatar: string;
    status: string;
}}) => {
    const {title, user, avatar, status} = modalContent;
   return (
       <div onClick={()=> {setShowModal(false)}} id="backdrop" className={`${show ? 'show': ''}`}>
            <div onClick={(e)=> {e.stopPropagation()}}  id="modal">
                <h1>{title}</h1>
                <span>{user}</span>
                <img src={avatar} alt="user"/>
                <h3 className={`${status === 'Win' ? 'success': status ==='Lose' ? 'fail' : 'draw' }`}>{status}</h3>

            </div> 
       </div>
   ) 
}

export default Modal;