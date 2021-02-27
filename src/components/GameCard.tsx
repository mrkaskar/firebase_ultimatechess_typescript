const GameCard = ({img,show}: {img: string, show: string}) => {
  return (
    <div className="game-card">
      <div className="img-wrapper">
        <img className="homesvg" src={`/img/svg/${img}.svg`} alt={img} />
      </div>
      <span>{show}</span>
    </div>
  );
};

export default GameCard;