import { ChessInstance, Square } from "chess.js";
import React from "react";
import chessEngine from "../lib/chessEngine";

let prepare:()=>void;

function useStockfish(game: ChessInstance, player: string, fen: string, setFen: React.Dispatch<React.SetStateAction<string>>) {
  const engineColor = React.useRef<"white"|"black">("white");
  React.useEffect(() => {
    const { prepareMove, setSkillLevel, setAggressiveness } = chessEngine(
      player,
      game,
      {},
      setFen
    );
    setSkillLevel(0);
    setAggressiveness(100);
    engineColor.current = player === "white" ? "black" : "white";
    prepare = prepareMove;
    prepare();
  }, [game, player, setFen]);

  React.useEffect(() => {
    if (fen !== "start" && engineColor.current[0] === game.turn()) {
      prepare();
      console.log("Engine working");
    } else {
      console.log("Engine finished thinking");
    }
  }, [fen,game]);

  const onDrop = ({ sourceSquare, targetSquare }: {sourceSquare: Square, targetSquare: Square}) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return;
    setFen(game.fen());
  };

  return {
      position: fen,
      onDrop: onDrop
  }
}

export default useStockfish;
