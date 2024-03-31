import './ChampionCard.css';

function ChampionCard(props) {
    return (
    <div className='card-container'>
        <div className='card'>
            <h1>{props.champion.name}</h1>
            <img className='championIcon' src={`/champion-icon/${props.champion.id}.png`} alt='icon' />
            <div className='mastery'>
                <img className='masteryIcon' src={`/mastery-icon/lvl${props.data === undefined ? 0 : props.data.championLevel}.png`} alt='mastery' />
                <p className='points'>{props.data === undefined ? 0 : props.data.championPoints}</p>
            </div>
        </div>
        
        
    </div>
    )
}

export default ChampionCard;