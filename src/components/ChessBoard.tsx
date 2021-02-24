import React from 'react';
import Chessboard from 'chessboardjsx';
import "./ChessBoard.css";
import UserArea from './UserArea';
import useValidator from './useValidator';

function ChessBoard(){
    const { 
         position,
         onDrop,
         onMouseOverSquare, 
         onMouseOutSquare,
         onDragOverSquare, 
         onSquareClick,
         dropStyle,
         squareStyles
         
        } = useValidator(); 
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
    return (
    <>
    <UserArea avatar="/processor.jpg" username="Stockfish" />
    <div id="board-wrapper">
        <Chessboard 
        id="humanvshuman"
        boardStyle={boardStyle} 
        calcWidth={resizeBoard} 
        position={position}
        onDrop={onDrop}
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
   </> 
    )
}

export default ChessBoard;