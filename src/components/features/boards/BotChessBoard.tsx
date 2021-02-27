import React from 'react';
import useBot from "../../../hooks/useBot";
import Chess, {ChessInstance} from 'chess.js';
import ChessBoard from '../../chessboard/ChessBoard';
import UserArea from '../users/UserArea';
import useCaptured from '../../../hooks/useCaptured';
import useOrentation from '../../../hooks/useOrentation';
import useStatus from '../../../hooks/useStatus';
import useModal from '../../../hooks/useModal';
import Modal from '../../utils/modal/Modal';
//@ts-ignore
const game: ChessInstance = new Chess();

interface BotChessBoardProps {
  orentationBoard: 'white' | 'black'; 
}
const BotChessBoard = ({orentationBoard}: BotChessBoardProps) => {
   
   const [fen, setFen] = React.useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
   const {onDrop} = useBot(fen, setFen, 2, game, orentationBoard);
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
    position={fen}
    setFen={setFen}
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

export default BotChessBoard;