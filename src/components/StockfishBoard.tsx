import React from 'react';
import useStockfish from "../hooks/useStockfish";
import Chess, {ChessInstance} from 'chess.js';
import ChessBoard from './ChessBoard';
//@ts-ignore
const game: ChessInstance = new Chess();

const StockfishBoard = () => {
    const [fen, setFen] = React.useState('start');
    const { position, onDrop } = useStockfish(game, 'white', fen, setFen )
    
    return <ChessBoard
        game={game}
        fen={fen} 
        setFen={setFen}
        position={position}
        onDropOption={onDrop}
        options={true}
    />
}


export default StockfishBoard;