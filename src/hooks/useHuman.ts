import { ChessInstance, Square } from "chess.js";
import React from "react";
import { makeAmove } from "../lib/db";

const useHuman = (
    fen: string,
    setFen: React.Dispatch<React.SetStateAction<string>>,
    game: ChessInstance, 
    player: string,
    gid: string,
    blackCap: string[],
    whiteCap: string[],
) => {
    const onDrop = ({
        sourceSquare,
        targetSquare,
      }: {
        sourceSquare: Square;
        targetSquare: Square;
      }) => {
        if (player !== game.turn()) return;
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
    
        if (move === null) {
          setFen(fen);
          return;
        };
        let newFen = game.fen();
        setFen(newFen);
        let cblackCap:string[] = [...blackCap];
        let cwhiteCap:string[] = [...whiteCap];
        game.history({verbose: true}).forEach(e =>{
          if(e.captured){
            if(e.color === "w"){
              cblackCap.push(`b${e.captured}`)
            }
            else{
              cwhiteCap.push(`w${e.captured}`)
            }
          }
        })
        makeAmove(gid,newFen,cblackCap, cwhiteCap, 0,0,player);
      };
      return { onDrop };
    }; 
    
export default useHuman;