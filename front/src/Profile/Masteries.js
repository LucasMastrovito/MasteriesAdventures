import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import ChampionCard from "./ChampionCard";
import './ChampionCard.css';

function GetMasteries(props) {
    const url = "http://localhost:5000/api/masteries/" + props.puuid + "/" + props.region;
    const [data, setData] = useState([{}]);
    const cards = [];
    useEffect(() => {
       const fetchData = async() => {
           const result = await axios(url);
            if (result.data !== undefined) {
            setData(result.data);
           }
       };
       fetchData();
    }, [url]);  
    for (let i = 0; data[i]; i++) {
        if (data[i].championId !== undefined) {
            let id = data[i].championId;
            let index = props.champions.findIndex(champion => champion.id === id);
            cards.push(<ChampionCard key={i} data={data[i]} champion={props.champions[index]}></ChampionCard>);
        }
    }
    return (
        <div className="masteries-container">
            <div className="cards-container">{cards}</div>
        </div>
    )
}

function Masteries(props) {
    return (
        <div>
            <div className="title-container">
                <h1 className="title">Masteries</h1>
                <img className="title-img" src="/title.png" alt="title" />
            </div>
            <GetMasteries puuid={props.puuid} region={props.region} champions={props.champions}></GetMasteries>
        </div>
    )
}

export default Masteries;