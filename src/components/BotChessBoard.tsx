import React from 'react';
import Chessboard from 'chessboardjsx';
import "./ChessBoard.css";
import UserArea from './UserArea';
import useValidator from '../hooks/useValidator';
import Chess, {ChessInstance} from 'chess.js';

//@ts-ignore
const game: ChessInstance = new Chess();
function BotChessBoard(){

  const [fen, setFen] = React.useState("start");
  
    const { 
         onMouseOverSquare, 
         onMouseOutSquare,
         onDragOverSquare, 
         onSquareClick,
         dropStyle,
         squareStyles
         
        } = useValidator(game, fen, setFen); 
    const [width, setWidth] = React.useState<number>(window.innerWidth);

    React.useEffect(()=>{
       window.onresize = () => {
            setWidth(window.innerWidth);
       }
    },[])

    const resizeBoard = () =>  width < 700 ? width - 10: 600;
    const boardStyle = { 
        borderRadius: "5px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
    }

    function undoMove(){
        game.undo();
        setFen(game.fen());
        game.undo();
        setFen(game.fen());
    }
    return (
    <>
    <UserArea avatar="/processor.jpg" username="Bot" />
    <div id="board-wrapper">
                <Chessboard 
        id="humanvshuman"
        boardStyle={boardStyle} 
        calcWidth={resizeBoard} 
        position="start"
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare} 
        onDragOverSquare={onDragOverSquare}
        onSquareClick={onSquareClick}
        squareStyles={squareStyles}
        dropSquareStyle={dropStyle}
        transitionDuration={300}
        />
        
    </div>
    <UserArea avatar="/icon-72x72.png" username="User" />
    <button onClick={undoMove}>Undo</button>
   </> 
    )
}

export default BotChessBoard;