import React from "react";
import { ChessInstance, Square } from "chess.js";
import bot from "../lib/jschessEngine";

const useBot = (
  fen: string,
  setFen: React.Dispatch<React.SetStateAction<string>>,
  level: number,
  game: ChessInstance,
  player: string,
) => {
  let engineColor = React.useRef<string>("white");
  const [moved, setMoved] = React.useState<boolean>(false);
  
  const engineMove = (firstMove:boolean) => {
      //@ts-ignore
      let from: Square = "";
      //@ts-ignore
      let to: Square = "";
      if(firstMove){
        let possibleMoves = ['e4', 'd4','c4', 'Nf3', 'Nc3'];
        let randomMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
    
        game.move(randomMove);
        setMoved(true);
        setTimeout(()=>{
          setFen(game.fen());
          
        }, 200)
        return;
      }

      let aiMove = bot(fen, level);
      for (let key in aiMove) {
        //@ts-ignore
        from = key.toLowerCase();
        to = aiMove[key].toLowerCase();
      }
      const move = game.move({
        from: from,
        to: to,
        promotion: "q",
      });
  
      if (move === null) return;
      setFen(game.fen());
  }

  React.useEffect(() => {
    engineColor.current = player === "white" ? "black" : "white";
    if(engineColor.current === "white"){
      if(!moved)
      engineMove(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  React.useEffect(() => {
    if(game.game_over()) return;
    let timeout: NodeJS.Timeout; 
    if (engineColor.current[0] === game.turn() && fen !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR") {
      timeout = setTimeout(()=>engineMove(false),500);
    }
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen, level, player, game, setFen]);

  const onDrop = ({ sourceSquare, targetSquare }: {sourceSquare: Square, targetSquare: Square}) => {
    if(player[0] !== game.turn()) return;
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return;
    setFen(game.fen());
  };
  return { onDrop };
};

export default useBot;
