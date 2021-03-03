import React from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import BotChessBoard from '../features/boards/BotChessBoard';
import StockfishBoard from '../features/boards/StockfishBoard';
import NavBar from '../NavBar';

const Game = () => {
   const history = useHistory();
   const auth = useAuth();
   function getGame(){
       let engine: string = "";
       let level: number = 0;
       let game = localStorage.getItem("botgame");
       if(!game) history.push('/');
       let parsedGame:{id: Number, user:string, botname: string, botlevel: number}= {id: 0, user:'', botname: '', botlevel: 0};
       if(game){
           parsedGame = JSON.parse(game);
           if(parsedGame.botlevel in [0,1,2]){
              engine = "bot"; 
              level = parsedGame.botlevel;
           }
           else{
               engine = "stock";
               level = parsedGame.botlevel;
               if(parsedGame?.botlevel === 100){
                   parsedGame.botlevel = 0;
                   level = 0;
                }
           }
       }

       return {
           engine,
           orentationBoard: parsedGame.user,
           user:{username: auth?.user ? auth?.user.nname : "Guest", avatar: auth?.user ? auth?.user.photo : "icon-72x72.png"},
           bot: {name: parsedGame.botname, botlevel: level}
       }
   }
   const [game] = React.useState(getGame());
   
   return (
        <>
            <NavBar/>
            {game.engine === 'bot' ? <BotChessBoard
            //@ts-ignore
                orentationBoard={game.orentationBoard} 
                user={game.user}
                bot={game.bot}
            /> : <StockfishBoard
            //@ts-ignore
            orentationBoard={game.orentationBoard} 
            user={game.user}
            bot={game.bot}
            />}
        </>
   )
}

export default Game;