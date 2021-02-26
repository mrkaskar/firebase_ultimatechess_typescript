import React from 'react';
import useBot from "../hooks/useBot";
import Chess, {ChessInstance} from 'chess.js';
import ChessBoard from './ChessBoard';
import UserArea from './UserArea';
//@ts-ignore
const game: ChessInstance = new Chess();

const BotChessBoard = () => {
   const [fen, setFen] = React.useState<string>("start");
   const {onDrop} = useBot(fen, setFen, 2, game, "white");
   return (
  <> 
   <UserArea avatar="/img/bots/alex.png" username="Alex" turn={game.turn()} color="b"/>
   <ChessBoard
    game={game}
    fen={fen}
    position={fen}
    setFen={setFen}
    onDropOption={onDrop}
    options={true}
   />
   <UserArea avatar="/icon-72x72.png" username="Super User" turn={game.turn()} color="w"/>
   </>
   )
}

export default BotChessBoard;