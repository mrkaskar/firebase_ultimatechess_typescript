import React from 'react';

interface User {
    username: string;
    avatar: string;
    computer: boolean;
    color: string;
}
interface ModalContent {
    title: string;
    user: string;
    avatar: string;
    status: string;
    resign?: string; 
}
const useModal = (checkMate:boolean, draw: string, user:User, win:boolean, gameEnd?:string, resign?:string) => {
    const [showModal, setShowModal] = React.useState<Boolean>(false);
    const [modalContent, setModalContent] = React.useState<ModalContent>({
            title:'',
            user:'',
            avatar:'',
            status:'',
            resign:'',
    });

    React.useEffect(()=>{
        if(gameEnd){
            setShowModal(true);
            const status = {
                title: "Game finished!",
                user: user.username,
                avatar: user.avatar,
                status: gameEnd,
                color: user.color,
                resign,
            }
            setModalContent(status);
            return;
        }
        
       if(checkMate) {
           setShowModal(true);
           const status = {
               title:'Checkmate!',
               user: user.username,
               avatar: user.avatar,
               status: win ? 'Win' : 'Lose'
           }
           setModalContent(status);
           return;
       }
       if(draw){
           setShowModal(true);
           const status = {
               title:'Draw!',
               user: user.username,
               avatar: user.avatar,
               status: draw
           }
           setModalContent(status);
           return;
       }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[checkMate, draw,gameEnd])
    
    return {
        showModal,
        setShowModal,
        modalContent
    }
}

export default useModal;