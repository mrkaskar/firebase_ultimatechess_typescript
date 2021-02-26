import { Move } from 'chess.js';
import React from 'react';

const useCaptured = (history: Move[], fen: string) => {
    const [whiteCaptured, setWhiteCaptured] = React.useState<string[]>([]);
    const [blackCaptured, setBlackCaptured] = React.useState<string[]>([]);
   
    React.useEffect(()=>{
        console.log('checking');
        
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

