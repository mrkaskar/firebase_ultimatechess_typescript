import React from 'react';

const CapturedPieces = ({src}:{src:string}) => {
    return (
        <div  className="cap-piece">
        <img src={src} alt="chess peice"/>
         </div>
    )
}

export default React.memo(CapturedPieces);
