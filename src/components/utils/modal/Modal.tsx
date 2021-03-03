import React from 'react';
import "./Modal.css";

const Modal = ({show, setShowModal, modalContent}:{show: Boolean, setShowModal:React.Dispatch<React.SetStateAction<Boolean>>, modalContent: {
    title: string;
    user: string;
    avatar: string;
    status: string;
    color?:string;
    resign?:string;
}}) => {
    const {title, user, avatar, status, color, resign} = modalContent;
    const [showStatus, setShowStatus] = React.useState(status);
    const statusColor = `
    ${showStatus === 'Win' ?
    'successbtn': showStatus ==='Lose' ?
    'failbtn' : showStatus === 'Draw by Agreement!' ?
    'draw' : showStatus === 'draw' ? 
    'draw' : showStatus === "You Resigned!" ?
    "Lose" : "Win"
    }`
    console.log(`modal user color ${color}`)
    console.log(`modal status ${status}`)
    React.useEffect(()=>{
        setShowStatus(status);

            if(status === "White Resigned!" || status === "Black Resigned!"){
                if(color === resign){
                    setShowStatus("You Resigned!");
                }
            }

    },[status])
   return (
       <div onClick={()=> {setShowModal(false)}} id="backdrop" className={`${show ? 'show': ''}`}>
            <div onClick={(e)=> {e.stopPropagation()}}  id="modal">
                <h1>{title}</h1>
                <span>{user}</span>
                <img id="modalimg" src={avatar} alt="user"/>
                <h3 className={statusColor}>{showStatus}</h3>

            </div> 
       </div>
   ) 
}

export default Modal;