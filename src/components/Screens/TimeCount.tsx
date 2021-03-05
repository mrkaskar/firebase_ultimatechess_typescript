import React from 'react';
import { endGame, updateU1Time, updateU2Time } from '../../lib/db';

interface TimeCountProps {
    color: string,
    dbu1?: string,
    turn: string,
    currentu1Time?: number,
    currentu2Time?: number,
    setCurrentu1Time?: React.Dispatch<React.SetStateAction<number>>,
    setCurrentu2Time?: React.Dispatch<React.SetStateAction<number>>,
    finish?: Boolean,
    gameStart?: boolean,
    gid?:string,
    oren?:string,

}
const TimeCount = ({color, dbu1, turn, currentu1Time, currentu2Time, setCurrentu1Time, setCurrentu2Time, finish, gameStart, gid, oren}: TimeCountProps) => {

    const [timeturn, setTimeturn] = React.useState(turn === color);

    const [showu2time, setShowu2time] = React.useState("02:00");
    const [showu1time, setShowu1time] = React.useState("01:00");
    
    const u1Second = React.useRef(0);
    const u2Second = React.useRef(0);

    React.useEffect(()=>{

        if(currentu1Time || currentu2Time){
          setShowu1time(formatTime(currentu1Time)); 
          setShowu2time(formatTime(currentu2Time)); 
        }
        if(currentu1Time === 0){
             setShowu1time("00:00");
            //@ts-ignore
                endGame(gid, dbu1[0] === "w" ? "White Time Out!" : "Black Time Out!");
                return;
        }
        else if(currentu2Time === 0){
             setShowu2time("00:00");
            //@ts-ignore
                endGame(gid, dbu1[0] === "w" ? "Black Time Out!" : "White Time Out!");
                return;
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showu1time, showu2time])

    React.useEffect(()=>{
       setTimeturn(turn === color); 
    },[turn, color])
    
    
    function formatTime(milliseconds:number| undefined){
        if(milliseconds){
        let seconds = Math.floor(milliseconds/1000);
        let leftMilli = milliseconds%1000;
        let totalMinutes: string | number = Math.floor(seconds/60);
        if(totalMinutes < 0) {
            totalMinutes = 0;
        }
        totalMinutes  = totalMinutes.toString();

        let leftSeconds = seconds%60;
        let totalSeconds:string | number = Math.floor(leftSeconds + leftMilli/1000);
        if(totalSeconds < 0) {
            totalSeconds = 0
        }
        totalSeconds = totalSeconds.toString();
        totalMinutes = totalMinutes.length === 1 ? `0${totalMinutes}` : totalMinutes;
        totalSeconds = totalSeconds.length === 1 ? `0${totalSeconds}` : totalSeconds;
        return `${totalMinutes}:${totalSeconds}`;
    }
    return "00:00";
    }
    React.useEffect(()=>{

       let timeout: NodeJS.Timeout;
  
       if(finish){
           return;
       }
       if(gameStart){
           if(timeturn && currentu1Time && currentu2Time){
               //@ts-ignore
               if(color === dbu1[0]){
                timeout = setTimeout(()=>{

                    let updatedTime = currentu1Time - 1000;
                    //@ts-ignore
                    setCurrentu1Time(updatedTime);
                    //@ts-ignore
                    setShowu1time(formatTime(updatedTime));
                    
                    u1Second.current += 1;
                },1000)
                
                //@ts-ignore
                    if(color === oren[0] && u1Second.current % 3 === 0) {
                        //@ts-ignore
                        updateU1Time(gid,currentu1Time);
                    }
               }

               else{
                timeout = setTimeout(()=>{
                    let updatedTime = currentu2Time - 1000;
                     //@ts-ignore
                    setCurrentu2Time(updatedTime);

               
                   //@ts-ignore
                   setShowu2time(formatTime(updatedTime));

                    u2Second.current += 1;
                    
                   },1000)

                //@ts-ignore
                    if(color === oren[0] && u2Second.current % 3 === 0) {
                        //@ts-ignore
                        updateU2Time(gid,currentu2Time);
                    }
               }
           }
           else{
              //@ts-ignore
               clearTimeout(timeout);

           }
       }
       return () =>{
              //@ts-ignore
               clearTimeout(timeout);
       }
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[timeturn, gameStart, currentu2Time, currentu1Time, finish]);

//@ts-ignore
    return <span className="timecount">{color === dbu1[0] ? showu1time : showu2time}</span>
}

export default TimeCount;