import React from "react";
import Chess, { ChessInstance } from "chess.js";
import ChessBoard from "../../chessboard/ChessBoard";
import UserArea from "../users/UserArea";
import useStatus from "../../../hooks/useStatus";
import Modal from "../../utils/modal/Modal";
import useModal from "../../../hooks/useModal";
import useHuman from "../../../hooks/useHuman";
import { denyDraw, endGame, listenAmove, resign, updateU1Time, updateU2Time } from "../../../lib/db";
import Loading from "../../Screens/Loading";
import "./humanchess.css";
import NavBar from "../../NavBar";
import firebase from '../../../lib/firebase';
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
  dbu1:string;
}
const HumanChessBoard = ({

  orentationBoard,
  u1,
  u2,
  gid,
  dbu1,

}: HumanChessBoardProps) => {
  const [fen, setFen] = React.useState<string>(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  );
  const [whiteCaptured, setWhiteCaptured] = React.useState<string[]>([]);
  const [blackCaptured, setBlackCaptured] = React.useState<string[]>([]);

  const [currentu2Time, setCurrentu2Time] = React.useState(u2.time * 60 * 1000);
  const [currentu1Time, setCurrentu1Time] = React.useState(u1.time * 60 * 1000);
  
  const u1tloaded =React.useRef(false);
  const u2tloaded =React.useRef(false);

  const gameStart = React.useRef(false);

  let user1 = {
    ...u1,
    computer: false,
    capturedPieces: u1.color === "w" ? blackCaptured : whiteCaptured,
    currentu1Time,  
    setCurrentu1Time,
    currentu2Time,  
    setCurrentu2Time,
    type: "u1",
    gameStart: gameStart.current,
    dbu1,
  };
  let user2 = {
    ...u2,
    computer: false,
    capturedPieces: u2.color === "w" ? blackCaptured : whiteCaptured,
    currentu1Time,  
    setCurrentu1Time,
    currentu2Time,  
    setCurrentu2Time,
    type: "u2" ,
    gameStart: gameStart.current,
    dbu1,
  };

  const { checkMate, draw, setCheckMate, setDraw } = useStatus(game, fen);
  const [lastPlayer, setLastPlayer] = React.useState("b");
  
  const [drawOffer, setDrawOffer] = React.useState<"w" | "b" | "" | "d">("");
  const [resignConfirm, setResignConfirm] = React.useState<"w" | "b" | "">("");
  const [resignClicked, setResignClicked] = React.useState(false);

  const [gameEnd, setgameEnd] = React.useState("");
  
  React.useEffect(()=>{
    if(gameEnd){
      setgameEnd("");
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  React.useEffect(()=>{
    if(checkMate){
      endGame(gid, lastPlayer === "w" ? "Black is in Checkmate!" : "White is in Checkmate!");
      game.reset();
      setCheckMate(false);
    }
    else if(draw){
      endGame(gid, draw);
      game.reset();
      setDraw("");
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lastPlayer])


  let { onDrop, onSquareClick } = useHuman(
    fen,
    setFen,
    game,
    u1.color,
    gid,
    blackCaptured,
    whiteCaptured,
    currentu1Time,
    currentu2Time,
    dbu1,
    lastPlayer === "w" ? "b" : "w",
  );
  const [loading, setLoading] = React.useState(true);
   React.useEffect(()=>{
     if(resignConfirm){
        endGame(gid, `${resignConfirm === "w" ? "White" : "Black"} Resigned!`)
     }
   // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onDrop=()=>{};
        game.reset();
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
      gameStart.current = true;
    }

  }, [fen]);

  const gameRefresh = React.useRef(false);
  React.useEffect(() => {
    listenAmove(gid).on("value", (snap) => {
      const data = snap.val();
      if (data) {
        if(data.fen){
          if(!gameStart.current){
            gameStart.current = true;
          }
        }
        if(data.fen && !gameRefresh.current){
          setFen(data.fen);
          gameRefresh.current = true;
        }
        if(data.fen !== fen && data.fen){
        setTimeout(() => {
          setFen(data.fen);
        }, 100);
        }
        if (data.whiteCap) {
          if(JSON.stringify(data.whiteCap) !== JSON.stringify(whiteCaptured)){
            setWhiteCaptured(data.whiteCap);
          }
        }
        if (data.blackCap) {
          if(JSON.stringify(data.blackCap) !== JSON.stringify(blackCaptured)){
            setBlackCaptured(data.blackCap);
          }
        }
        if(data.drawOffer){
          // if(data.drawOffer !== drawOffer)
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
        if(data.u1time){
          // if(data.u1time !== currentu1Time)
          setCurrentu1Time(data.u1time);
        }
        if(data.u2time){
          // if(data.u2time !== currentu2Time)
          setCurrentu2Time(data.u2time);
        }
        if(data.u2time && !u2tloaded.current && data.u2stoptime){
          if(data.u2StartTime && dbu1 !== orentationBoard){
            let preciseTime = (data.u2stoptime - (firebase.firestore.Timestamp.now().seconds * 1000 - data.u2StartTime));
            setCurrentu2Time(preciseTime);
            updateU2Time(gid,preciseTime);
            u2tloaded.current = true;
          }
        }
        if(data.u1time && !u1tloaded.current &&data.u1stoptime){
          if(data.u1StartTime && dbu1 === orentationBoard){
            let preciseTime = (data.u1stoptime - (firebase.firestore.Timestamp.now().seconds * 1000 - data.u1StartTime));
            setCurrentu1Time(preciseTime);
            updateU1Time(gid,preciseTime);
            u1tloaded.current = true;
          }
        }
      }
      if (loading) {
        setLoading(false);
      }
    });
    return () => {
      listenAmove(gid).off("value");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);

  React.useEffect(() => {
    if (
      fen &&
      fen !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" 
      &&
      lastPlayer === (orentationBoard === "white" ? "b" :"w")
      
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
      fen={fen}
    />
      <UserArea
        turn={lastPlayer === "b" ? "w" : "b"}
        finish={game.game_over() || !!gameEnd}
        gid={gid}
        oren={orentationBoard}
        {...user2}
      />
      <ChessBoard
        game={game}
        fen={fen}
        position={fen}
        setFen={setFen}
        onDropOption={onDrop}
        onClickOption={onSquareClick}
        options={true}
        orientation={orentationBoard}
        botmatch={false}
      />
      <UserArea
        turn={lastPlayer === "b" ? "w" : "b"}
        finish={game.game_over() || !!gameEnd}
        gid={gid}
        oren={orentationBoard}
        {...user1}
      />
    </>
  );
};

export default HumanChessBoard;
