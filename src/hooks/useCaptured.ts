import { Move } from 'chess.js';
import React from 'react';

const useCaptured = (history: Move[], fen: string) => {
    const [whiteCaptured, setWhiteCaptured] = React.useState<string[]>([]);
    const [blackCaptured, setBlackCaptured] = React.useState<string[]>([]);
    const [currentHistory, setCurrentHistory] = React.useState<Move[]>([]);
    const [historyLen, setHistoryLen] = React.useState(0);
    
    React.useEffect(()=>{
       setHistoryLen(history.length);
       if(historyLen < history.length){
          setCurrentHistory(history);
       }
       else{
         let undoMoves = [...currentHistory].splice(-2);
         for(let move of undoMoves){
            if(move.captured){
               if(move.color === "b"){
                let white = [...whiteCaptured];
                white.pop();
                console.log(white)
                setWhiteCaptured(white);
               }
               else{
                let black = [...blackCaptured];
                black.pop();
                setBlackCaptured(black);
               }
            }
         }
         return;
       }
        if(history.length > 0){
         const lastMove = history[history.length-1];
           if(lastMove.captured){
              let capturedColor = lastMove.color === "w" ? "b" : "w";
              let capturedPiece = lastMove.captured;
   
              let captured = capturedColor+capturedPiece;
              if(capturedColor === "w"){
                 setWhiteCaptured([...whiteCaptured, captured])
              }else{
                 setBlackCaptured([...blackCaptured, captured])
              }
           }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[fen]);

      return {
          whiteCaptured,
          blackCaptured
      }
}


export default useCaptured;

