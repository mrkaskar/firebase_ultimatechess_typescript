import React from 'react';
import useStockfish from "../../../hooks/useStockfish";
import Chess, {ChessInstance} from 'chess.js';
import ChessBoard from '../../chessboard/ChessBoard';
import UserArea from '../users/UserArea';
import useCaptured from '../../../hooks/useCaptured';
import Modal from '../../utils/modal/Modal';
import useStatus from '../../../hooks/useStatus';
import useModal from '../../../hooks/useModal';
//@ts-ignore
const game: ChessInstance = new Chess();

interface StockfishChessBoardProps {
    orentationBoard: 'white' | 'black'; 
    user: { username: string, avatar: string},
    bot: { name: string, botlevel: number}
  }

const StockfishBoard = ({orentationBoard, user,bot}: StockfishChessBoardProps) => {
    const [fen, setFen] = React.useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const { position, onDrop } = useStockfish(game, orentationBoard, fen, setFen, bot.botlevel )
    const {whiteCaptured, blackCaptured} = useCaptured(game.history({verbose: true}), fen);

    let userColor = orentationBoard[0];
    let botColor = userColor === "w" ? "b" : "w";
 
    let user1 = { username: bot.name,
     avatar: `/img/bots/${bot.name}.png`, 
     computer: true, 
     color: botColor ,
     capturedPieces: botColor === "w" ? blackCaptured : whiteCaptured};
 
    let user2 = { username: user.username, 
    avatar:user.avatar, 
    computer: false, 
    color: userColor,
    capturedPieces: userColor === "w" ? blackCaptured : whiteCaptured};


   const {checkMate, draw} = useStatus(game, fen);
   const {showModal, setShowModal,modalContent} = useModal(checkMate, draw, user2, game.turn() !== orentationBoard[0]);
    
    return (
   <> 
    <Modal show={showModal} setShowModal={setShowModal} modalContent={modalContent}/>
      <UserArea 
   turn={game.turn()} 
   finish={game.game_over()} 
   {...user1}
   />
    <ChessBoard
        game={game}
        fen={fen} 
        setFen={setFen}
        position={position}
        onDropOption={onDrop}
        options={true}
        orientation={orentationBoard}
    />
       <UserArea 
   turn={game.turn()} 
   finish={game.game_over()} 
   {...user2}
   />
    </>
    )
}


export default StockfishBoard;