import './ChampionCard.css';

function Progress(data) {
    data = data.data;
    if (data === undefined || data.championLevel < 5) {
        return (
            <div className='progress'>
                <p className='points'>{data === undefined ? '1 game until next level' : data.championPointsUntilNextLevel + ' Until next level'}</p>
            </div>
        )
    } else {
        return (
            <div className='progress'>
                <p className='points'>Get a token</p>
            </div>
        )
    }
}

function ChampionRand(props) {
    return (
    <div className='card-container'>
        <div className='card'>
            <h1>{props.champion.name}</h1>
            <img className='championIcon' src={`/champion-icon/${props.champion.id}.png`} alt='icon' />
            <div className='mastery'>
                <img className='masteryIcon' src={`/mastery-icon/lvl${props.data === undefined ? 0 : props.data.championLevel}.png`} alt='mastery' />
            </div>
            <Progress data={props.data}></Progress>
        </div>
        
        
    </div>
    )
}

export default ChampionRand;