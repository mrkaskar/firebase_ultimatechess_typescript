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
  React.useEffect(() => {
    engineColor.current = player === "white" ? "black" : "white";
  }, [player]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout; 
    if (engineColor.current[0] === game.turn() && fen !== "start") {
      console.log("Engine start thinking");
      
      timeout = setTimeout(()=>{
        //@ts-ignore
        let from: Square = "";
        //@ts-ignore
        let to: Square = "";
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
        console.log("engine moved!")
          
        },50);
    }
    return () => clearTimeout(timeout);
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
