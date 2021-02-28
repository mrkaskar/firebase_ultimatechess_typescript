import { ChessInstance, Square } from "chess.js";
import React from "react";
import chessEngine from "../lib/chessEngine";

let prepare:()=>void;

function useStockfish(game: ChessInstance, player: string, fen: string, setFen: React.Dispatch<React.SetStateAction<string>>,level: number) {
  const engineColor = React.useRef<"white"|"black">("white");
  React.useEffect(() => {
    const { prepareMove, setSkillLevel } = chessEngine(
      player,
      game,
      {},
      setFen
    );
    setSkillLevel(level);
    engineColor.current = player === "white" ? "black" : "white";
    prepare = prepareMove;
    prepare();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, player, setFen]);

  React.useEffect(() => {
    if (fen !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" && engineColor.current[0] === game.turn()) {
      prepare();
    } else {
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
