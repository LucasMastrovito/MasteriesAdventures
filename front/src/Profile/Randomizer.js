import { useEffect, useState } from 'react';
import ChampionRand from './ChampionRand';
import './Randomizer.css';
import axios from 'axios';

const roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
let filteredChampions = [];

function GetRandom(props) {
    props = props.props;
    let [cards, setCards] = useState([]);
    let index = -1;
    const url = "https://masteriesadventures.onrender.com/api/masteries/" + props.puuid + "/" + props.region;
    const [data, setData] = useState([{}]);

    useEffect(() => {
       const fetchData = async() => {
           const result = await axios(url);
            if (result.data !== undefined) {
            setData(result.data);
           }
       };
       fetchData();
    }, [url]);

    function clickHandle(element) {
        let id = element.target.id;

        if (roles.includes(id)) {
            roles.splice(roles.indexOf(id), 1);
            element.target.className = "img-role btn-desactive";
        } else {
            roles.push(id);
            element.target.className = "img-role btn-active";
        }
        console.log(roles);
    }

    function getRandomChampion() {
        let champ = filteredChampions[Math.floor(Math.random()*filteredChampions.length)];

        index = data.findIndex(champion => champion.championId === champ.id);
        filteredChampions.splice(filteredChampions.indexOf(champ), 1);
        return (champ);
    }

    function setFilters() {
        filteredChampions = props.champions.slice();
        props.champions.forEach(element => {
            index = data.findIndex(champion => champion.championId === element.id);
            if (!roles.some(item => element.roles.includes(item)) || (index >= 0 && (data[index].championLevel === 7))) {
                filteredChampions.splice(filteredChampions.indexOf(element), 1);
            }
        });
        return (filteredChampions);
    }

    function random() {
        setCards([]);
        filteredChampions = setFilters();

        if (filteredChampions.length === 0) {
            let el = <h1 key={0}>No champion found</h1>;
            setCards(prevArray => [...prevArray, el]);
        } else {
            for (let i = 0; i < 3; i++) {
                if (filteredChampions.length > 0) {
                    let champ = getRandomChampion();
                    let newCard = <ChampionRand key={i} data={data[index]} champion={champ}></ChampionRand>;
                    setCards(prevArray => [...prevArray, newCard]);
                }
            }
        }
    }
    return (
        <div className='randomizer'>
            <div className="roles-container">
                <div className="btn-container">
                    <img onClick={clickHandle} alt="" id='TOP' className="img-role btn-active" src="/roles-icon/TOP.png" />
                    <img onClick={clickHandle} alt="" id='JUNGLE' className="img-role btn-active" src="/roles-icon/JUNGLE.png" />
                    <img onClick={clickHandle} alt="" id='MID' className="img-role btn-active" src="/roles-icon/MID.png" />
                    <img onClick={clickHandle} alt="" id='ADC' className="img-role btn-active" src="/roles-icon/ADC.png" />
                    <img onClick={clickHandle} alt="" id='SUPPORT' className="img-role btn-active" src="/roles-icon/SUPPORT.png" />
                </div>
            </div>
            <div className='champs-container'>
                {cards}
            </div>
            <button className='btn-random' onClick={random}>RANDOM</button>
        </div>
    )
}

function Randomizer(props) {
    return (
        <div>
            <div className="title-container">
                <h1 className="title">Randomizer</h1>
                <img className="title-img" src="/title.png" alt="title" />
            </div>
            <GetRandom props={props}></GetRandom>
        </div>
    )
}

export default Randomizer;