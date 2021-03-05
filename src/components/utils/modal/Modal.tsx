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
    "Lose" : showStatus === "You Time Out!" ?
    "Lose" : showStatus === "Game Aborted!" ?
    "Lose" : showStatus === "You are in Checkmate!" ?
    "Lose" : "Win"
    }`
    React.useEffect(()=>{
        setShowStatus(status);

            if(status === "White Resigned!" || status === "Black Resigned!"){
                if(color === resign){
                    setShowStatus("You Resigned!");
                }
            }
            if(status === "White Time Out!" || status === "Black Time Out!"){
                if(color === status[0].toLowerCase()){
                   setShowStatus("You Time Out!");
                }
            }
            if(status === "White is in Checkmate!" || status === "Black is in Checkmate!"){
                if(color === status[0].toLowerCase()){
                   setShowStatus("You are in Checkmate!");
                }
            }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default React.memo(Modal);