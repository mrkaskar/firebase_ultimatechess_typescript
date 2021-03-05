import { ChessInstance, Square } from "chess.js";
import React from "react";
import {  makeu1move, makeu2move } from "../lib/db";

const useHuman = (
    fen: string,
    setFen: React.Dispatch<React.SetStateAction<string>>,
    game: ChessInstance, 
    player: string,
    gid: string,
    blackCap: string[],
    whiteCap: string[],
    currentu1Time: number,
    currentu2Time: number,
    dbu1: string,
    turn: string
) => {

  //@ts-ignore
   const [pieceSquare, setPieceSquare] = React.useState<Square>('');
   
function dbMove(newFen:string, gameHistory:any[]){
        let cblackCap:string[] = [...blackCap];
        let cwhiteCap: string[] = [...whiteCap];
        gameHistory.forEach(e =>{
          if(e.captured){
            if(e.color === "w"){
              cblackCap.push(`b${e.captured}`)
            }
            else{
              cwhiteCap.push(`w${e.captured}`)
            }
          }
        })


        if(dbu1[0] === player){
          // setU2loaded(false);
          makeu1move(gid,newFen,cblackCap, cwhiteCap, currentu1Time,player);
        }
        else{
          makeu2move(gid,newFen,cblackCap, cwhiteCap, currentu2Time,player);
        }
          // makeAmove(gid,newFen,cblackCap, cwhiteCap,player);
}
    const onDrop = ({
        sourceSquare,
        targetSquare,
      }: {
        sourceSquare: Square;
        targetSquare: Square;
      }) => {

        if (player !== turn) {
          return;
        }
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
    
        if (move === null) {
          return;
        };
        let gameHistory = game.history({verbose: true});
        let newFen = game.fen();
        setFen(newFen);
        dbMove(newFen, gameHistory)
      };

    const onSquareClick = (square: Square) => {
        setPieceSquare(square);

        let move = game.move({
            from: pieceSquare,
            to: square,
            promotion: "q"
        });
        if(move === null) return;
        let gameHistory = game.history({verbose: true});
        let newFen = game.fen();
        setFen(newFen);
        //@ts-ignore
        setPieceSquare('');
        dbMove(newFen, gameHistory)        
    }

      return { onDrop, onSquareClick };
    }; 
    
    
export default useHuman;