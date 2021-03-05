import React from 'react';
import useAuth from '../../hooks/useAuth';
import { getGame, getPlayGame, getUserGame } from '../../lib/db';
import HumanChessBoard from '../features/boards/HumanChessBoard';
import Loading from './Loading';

interface User {
    username:string;
    avatar: string;
    color: string;
    time: number;
}
const HvHGame = () => {
    const [gameid, setGameid] = React.useState<string>("");
    const [loading, setLoading] = React.useState(true);
    const [user1, setUser1] = React.useState<User>({username:'',avatar:'',color:'',time:0});    
    const [user2, setUser2] = React.useState<User>({username:'',avatar:'',color:'',time:0});    
    const [oren, setOren] = React.useState<"white"|"black"|null>(null);
    const [loaded, setLoaded] = React.useState(false); 
    const [dbu1, setDbu1] = React.useState("w");

    
    const auth = useAuth();
    React.useEffect(()=>{
        if(auth?.user){
           getPlayGame(auth.user.uid) 
           .then(r => {
               //@ts-ignore
               if(r)
               setGameid(r);
           })

           getUserGame(auth.user.uid) 
           .then(r => {
               //@ts-ignore
               if(r)
               setGameid(r);
           })
           setLoaded(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    React.useEffect(() => {
if(loaded && gameid && auth?.user.uid){
          getGame(gameid).then(r => {
              if(r){

                  setDbu1(r.color);

              let u1 = {
                username: r?.u2name,
                avatar:r?.u2photo,
                color:r?.color === "white" ? "b" : "w",
                time: r?.u2time
            };
            let u2 = {
                username: r?.uname,
                avatar:r?.photo,
                color:r?.color === "white" ? "w" : "b",
                time: r?.utime
            }
              if(auth?.user.uid === r?.uid){
                 setUser1(u2);
                 setOren(r?.color);
                 setUser2(u1); 
              }
              else{
                  setUser1(u1);
                  setOren(r?.color === "white" ? "black" : "white")
                  setUser2(u2);
              }
            }
          })
          setLoaded(false);
          setLoading(false);
        
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loaded, gameid])

    if(loading) return <Loading/>
    if(!oren) return <Loading/>

    return (
    <>
<HumanChessBoard orentationBoard={oren} u1={user1} u2 ={user2} gid={gameid} dbu1={dbu1}/>

    </>
    )
}

export default HvHGame;