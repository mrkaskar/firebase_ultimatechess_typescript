import React from 'react';
import Chessboard from 'chessboardjsx';
import "./ChessBoard.css";
import useValidator from '../hooks/useValidator';
import {ChessInstance, Square} from 'chess.js';

interface ChessBoardProps {
    game: ChessInstance, 
    fen: string, 
    setFen:React.Dispatch<React.SetStateAction<string>>,
    position: string , 
    onDropOption: ({ sourceSquare, targetSquare }: { sourceSquare: Square; targetSquare: Square; }) => void, 
    options:Boolean 
}

function ChessBoard({
   game, fen, setFen, position = "start", onDropOption, options = false 
}: ChessBoardProps
    ){
    const { 
         onMouseOverSquare, 
         onMouseOutSquare,
         onDragOverSquare, 
         onSquareClick,
         dropStyle,
         squareStyles,
         onDrop
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
    <div id="board-wrapper">
                <Chessboard 
        id="humanvshuman"
        boardStyle={boardStyle} 
        calcWidth={resizeBoard} 
        position={position}
        onDrop={options ? onDropOption : onDrop}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare} 
        onDragOverSquare={onDragOverSquare}
        onSquareClick={onSquareClick}
        squareStyles={squareStyles}
        dropSquareStyle={dropStyle}
        transitionDuration={300}
        darkSquareStyle={{backgroundColor:'#018a6c'}}
        lightSquareStyle={{backgroundColor:'#bdeaf5'}}
        />
        
    </div>
    <button onClick={undoMove}>Undo</button>
   </> 
    )
}

export default ChessBoard;