import React from 'react';
import useStockfish from "../../../hooks/useStockfish";
import Chess, {ChessInstance} from 'chess.js';
import ChessBoard from '../../chessboard/ChessBoard';
import useOrentation from '../../../hooks/useOrentation';
import UserArea from '../users/UserArea';
import useCaptured from '../../../hooks/useCaptured';
import Modal from '../../utils/modal/Modal';
import useStatus from '../../../hooks/useStatus';
import useModal from '../../../hooks/useModal';
//@ts-ignore
const game: ChessInstance = new Chess();

interface StockfishChessBoardProps {
    orentationBoard: 'white' | 'black'; 
  }

const StockfishBoard = ({orentationBoard}: StockfishChessBoardProps) => {
    const [fen, setFen] = React.useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const { position, onDrop } = useStockfish(game, orentationBoard, fen, setFen )
    const {whiteCaptured, blackCaptured} = useCaptured(game.history({verbose: true}), fen);
    let blackUser = { username: "User", avatar: "/img/bots/alex.png", computer: false, color: "b" ,capturedPieces: whiteCaptured};
    let whiteUser = { username: "Alex", avatar: "/img/bots/alex.png", computer: true, color: "w",capturedPieces: blackCaptured};
    const [user1, user2] = useOrentation(orentationBoard,blackUser,whiteUser);
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