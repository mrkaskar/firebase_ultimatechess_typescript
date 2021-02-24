import React from "react";
import  Chess, {ChessInstance, Square} from "chess.js";

let game:ChessInstance;

    function squareStyling ({ pieceSquare, history }:{pieceSquare: Square, history: any})  {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;
  
    return {
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      })
    };
  };
  

     

const useValidator = () => {
   const [fen, setFen] = React.useState<string>("start");
   const [dropStyle, setDropStyle] = React.useState({});
   const [squareStyles, setSquareStyles] = React.useState({});
   //@ts-ignore
   const [pieceSquare, setPieceSquare] = React.useState<Square>('');
   const [history, setHistory] = React.useState<any>([]);
   
   React.useEffect(()=>{
       //@ts-ignore
        game = new Chess();       
   },[])
   
   
   const removeHighlightSquare = ()  => {
       setSquareStyles(squareStyling({ pieceSquare, history}))
   }

   const highlightSquare = (sourceSquare: Square, squaresToHighlight: Square[]) =>{
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
        (a, c) => {
          return {
            ...a,
            ...{
              [c]: {
                background:
                  "rgba(44, 230, 44, 0.219)",
                // borderRadius: "50%"
              }
            },
            ...squareStyling({
              history: history,
              pieceSquare: pieceSquare
            })
          };
        },
        {}
      );
      setSquareStyles({...squareStyles, ...highlightStyles})
   }
   const onDrop = ({sourceSquare, targetSquare}:{sourceSquare: Square, targetSquare: Square}) => {
       
    let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q"
    });
    
    if(move === null) return;
    
    setFen(game.fen());
    setHistory(game.history({verbose: true})) 
    setSquareStyles(squareStyling({ pieceSquare, history}))
   }

   const onMouseOverSquare = (square: Square)  => {

    let moves = game.moves({
        square: square,
        verbose: true
    });
    
    if(moves.length === 0) return;

    let squaresToHighlight: Square[] = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);

    
}
    const onMouseOutSquare = (square: Square) => {
        removeHighlightSquare();
    }
    
    const onDragOverSquare = (square: Square)  => {
        setDropStyle(square === "e4" || square === "d4" || square === "e5" || square === "d5"
        ? { backgroundColor: "cornFlowerBlue" }
        : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" })
    }

    const onSquareClick = (square: Square) => {
        setPieceSquare(square);
        
        let move = game.move({
            from: pieceSquare,
            to: square,
            promotion: "q"
        });
        if(move === null) return;
        
        setFen(game.fen());
        setHistory(game.history({verbose: true})) 
        //@ts-ignore
        setPieceSquare('');
        
    }

    return {
        position: fen,
        onDrop: onDrop,
        onMouseOverSquare: onMouseOverSquare,
        onMouseOutSquare: onMouseOutSquare,
        onDragOverSquare: onDragOverSquare,
        onSquareClick: onSquareClick,
        squareStyles: squareStyles,
        dropStyle: dropStyle
    }
}



export default useValidator;

