import React, { useEffect, useRef } from "react";
import useBot from "../../../hooks/useBot";
import Chess, { ChessInstance } from "chess.js";
import ChessBoard from "../../chessboard/ChessBoard";
import UserArea from "../users/UserArea";
import useCaptured from "../../../hooks/useCaptured";
import useStatus from "../../../hooks/useStatus";
import Modal from "../../utils/modal/Modal";
import useModal from "../../../hooks/useModal";
import useHuman from "../../../hooks/useHuman";
import { deleteGame, denyDraw, endGame, listenAmove, moveObserver, resign } from "../../../lib/db";
import Loading from "../../Screens/Loading";
import "./humanchess.css";
import NavBar from "../../NavBar";
//@ts-ignore
const game: ChessInstance = new Chess();
interface User {
  username: string;
  avatar: string;
  color: string;
  time: number;
}
interface HumanChessBoardProps {
  orentationBoard: "white" | "black";
  u1: User;
  u2: User;
  gid: string;
}
const HumanChessBoard = ({
  orentationBoard,
  u1,
  u2,
  gid,
}: HumanChessBoardProps) => {
  const [fen, setFen] = React.useState<string>(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  );
  const [whiteCaptured, setWhiteCaptured] = React.useState<string[]>([]);
  const [blackCaptured, setBlackCaptured] = React.useState<string[]>([]);

  let user1 = {
    ...u1,
    computer: false,
    capturedPieces: u1.color === "w" ? blackCaptured : whiteCaptured,
  };
  let user2 = {
    ...u2,
    computer: false,
    capturedPieces: u2.color === "w" ? blackCaptured : whiteCaptured,
  };

  const { checkMate, draw } = useStatus(game, fen);
  const [lastPlayer, setLastPlayer] = React.useState("b");

  let { onDrop } = useHuman(
    fen,
    setFen,
    game,
    u1.color,
    gid,
    blackCaptured,
    whiteCaptured,
  );
  const [loading, setLoading] = React.useState(true);

  const [drawOffer, setDrawOffer] = React.useState<"w" | "b" | "" | "d">("");
  const [resignConfirm, setResignConfirm] = React.useState<"w" | "b" | "">("");
  const [resignClicked, setResignClicked] = React.useState(false);

  const [gameEnd, setgameEnd] = React.useState("");

   React.useEffect(()=>{
     if(resignConfirm){
        endGame(gid, `${resignConfirm === "w" ? "White" : "Black"} Resigned!`)
     }
   },[resignConfirm])
  React.useEffect(()=>{
      if(drawOffer === "d") {
        setTimeout(()=>{
         setDrawOffer(""); 
        },700)
      }
  },[drawOffer])
  
  
  React.useEffect(()=>{
      if(gameEnd) {
        onDrop=()=>{};
      }
  },[gameEnd])

  const firstLoad = React.useRef(false);
  React.useEffect(() => {
    if (
      fen &&
      fen !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" &&
      !firstLoad.current
    ) {
      game.load(fen);
      firstLoad.current = true;
    }
  }, [fen]);

  React.useEffect(() => {
    listenAmove(gid).on("value", (snap) => {
      const data = snap.val();
      if (data) {
        if(data.fen){
        setTimeout(() => {
          setFen(data.fen);
        }, 200);
        }
        if (data.whiteCap) {
          setWhiteCaptured(data.whiteCap);
        }
        if (data.blackCap) {
          setBlackCaptured(data.blackCap);
        }
        if(data.drawOffer){
           setDrawOffer(data.drawOffer)
        }
        if(data.gameEnd){
          setDrawOffer("");
          setgameEnd(data.gameEnd);
        }
        if(data.player){
          setLastPlayer(data.player);
        }
        if(data.resignConfirm){
            setResignConfirm(data.resignConfirm);
            setgameEnd(data.gameEnd);
        }
      }
      if (loading) {
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (
      fen &&
      fen !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" &&
      lastPlayer !== u1.color
    ) {
      game.load(fen);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPlayer, fen]);

  const { showModal, setShowModal, modalContent } = useModal(
    checkMate,
    draw,
    user1,
    game.turn() !== orentationBoard[0],
    gameEnd,
    resignConfirm
  );

  if (loading) return <Loading />;

  return (
    <>
      {
         drawOffer && <div id="drawOffer"><div id="askdraw">
         {
            drawOffer === u2.color ?
            <>
               <h1>{u2.username} wants draw!</h1> 
               <br/>
               <h2>Do you agree?</h2>
               <div>
                  <button
                  onClick={()=>endGame(gid, "Draw by Agreement!")} 
                  className="cbtn success">Accept</button>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <button
                  onClick={()=>denyDraw(gid)} 
                  className="cbtn cancel">Deny</button>
               </div>
            </>:
            drawOffer === u1.color ?
            <>
               <h2>{u2.username}</h2>
               <h1>Asking for draw!</h1> 
               <h4>Please wait!</h4>
            </>:
            <>
               <h1>Draw Denied</h1>
            </>
         }
            </div></div>
      }
      
      {
         resignClicked &&
            <div id="resignConfirm">
              <div id="askresign">
               <h1>Resign</h1> 
               <br/>
               <h2>Do you want to resign?</h2>
               <div>
                  <button
                  onClick={()=>{
                  resign(gid,u1.color);
                  setResignClicked(false);
                }} 
                  className="cbtn success">Accept</button>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <button
                  onClick={()=>setResignClicked(false)} 
                  className="cbtn cancel">Deny</button>
               </div>
        

            </div>
            </div>
      }
      
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        modalContent={modalContent}
      />
    <NavBar title={`${u1.username} (vs) ${u2.username}`}
      setOfferDraw={setDrawOffer} 
      color={u1.color}
      gid={gid}
      gameEnd={gameEnd}
      setResignClicked={setResignClicked}
    />
      <UserArea
        turn={lastPlayer === "b" ? "w" : "b"}
        finish={game.game_over() || !!gameEnd}
        {...user2}
      />
      <ChessBoard
        game={game}
        fen={fen}
        position={fen}
        setFen={setFen}
        onDropOption={onDrop}
        options={true}
        orientation={orentationBoard}
        botmatch={false}
      />
      <UserArea
        turn={lastPlayer === "b" ? "w" : "b"}
        finish={game.game_over() || !!gameEnd}
        {...user1}
      />
    </>
  );
};

export default HumanChessBoard;
