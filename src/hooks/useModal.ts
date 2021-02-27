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
}
const useModal = (checkMate:boolean, draw: string, user:User, win:boolean) => {
    const [showModal, setShowModal] = React.useState<Boolean>(false);
    const [modalContent, setModalContent] = React.useState<ModalContent>({
            title:'',
            user:'',
            avatar:'',
            status:''
    });

    React.useEffect(()=>{
       if(checkMate) {
           setShowModal(true);
           const status = {
               title:'Checkmate!',
               user: user.username,
               avatar: user.avatar,
               status: win ? 'Win' : 'Lose'
           }
           setModalContent(status);
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
       }
    },[checkMate, draw])
    
    return {
        showModal,
        setShowModal,
        modalContent
    }
}

export default useModal;