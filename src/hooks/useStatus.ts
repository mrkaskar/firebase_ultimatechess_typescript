import { ChessInstance } from 'chess.js';
import React from 'react';

const useStatus = (game: ChessInstance, fen: string) => {
    const [check, setCheck] = React.useState<boolean>(false);  
    const [checkMate, setCheckMate] = React.useState<boolean>(false);  
    const [draw, setDraw] = React.useState<string>("");  

    React.useEffect(()=>{
        if(game.in_check() && !check && !game.in_checkmate()){
            setCheck(true);
            return;
        }
        setCheck(false);
        if(game.in_checkmate()){
            setCheckMate(true);
            return;
        }
        if(game.in_draw()){
            if(game.in_stalemate()){
                setDraw('Draw by stalemate! The King is no where to go without "checked"')
            }
            else if(game.in_threefold_repetition()){
                setDraw('Draw by threefold repetition!');
            }
            else if(game.insufficient_material()){
                setDraw('Draw by insufficient material!')
            }
            else{
                setDraw('Draw by agreement!')
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fen, game])
    return {
        check, 
        checkMate,
        draw
    }
}

export default useStatus;