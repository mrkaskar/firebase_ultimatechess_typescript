import React from 'react';
import useBot from "../hooks/useBot";
import Chess, {ChessInstance} from 'chess.js';
import ChessBoard from './ChessBoard';
//@ts-ignore
const game: ChessInstance = new Chess();

const BotChessBoard = () => {
   const [fen, setFen] = React.useState<string>("start");
   const {onDrop} = useBot(fen, setFen, 2, game, "white");
   return <ChessBoard
    game={game}
    fen={fen}
    position={fen}
    setFen={setFen}
    onDropOption={onDrop}
    options={true}
   />
}

export default BotChessBoard;