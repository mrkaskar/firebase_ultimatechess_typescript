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
    setCurrentu1Time: React.Dispatch<React.SetStateAction<number>>,
    currentu2Time: number,
    setCurrentu2Time: React.Dispatch<React.SetStateAction<number>>,
    u1time:number,
    u2time:number, 
    dbu1: string,
) => {

  //@ts-ignore
   const [pieceSquare, setPieceSquare] = React.useState<Square>('');
   
function dbMove(newFen:string){
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

        if (player !== game.turn()) {
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

        let newFen = game.fen();
        setFen(newFen);
        dbMove(newFen)
      };

    const onSquareClick = (square: Square) => {
        setPieceSquare(square);

        let move = game.move({
            from: pieceSquare,
            to: square,
            promotion: "q"
        });
        if(move === null) return;
        let newFen = game.fen();
        setFen(newFen);
        //@ts-ignore
        setPieceSquare('');
        dbMove(newFen)        
    }

      return { onDrop, onSquareClick };
    }; 
    
    
export default useHuman;