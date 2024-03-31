import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import './Summoner.css';

function GetScore(props) {
    props = props.props;
    const url = "http://localhost:5000/api/score/" + props.puuid + "/" + props.region;
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
       const fetchData = async() => {
            await axios.get(url).then((response => {
            setData(response.data);
            setLoading(false);
           }));
       };
       fetchData();
    }, [url]);
    if (isLoading) {
        return (<div><p>Loading...</p></div>);
    } else {
        return (
            <div>
                <h2>Mastery score: {data}</h2>
            </div>
        )
    }
}

function GetSummoner(props) {
    props = props.props;
    const url = "http://localhost:5000/api/summoner/" + props.puuid + "/" + props.region;
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
       const fetchData = async() => {
            await axios.get(url).then((response => {
            setData(response.data);
            setLoading(false);
           }));
       };
       fetchData();
    }, [url]);
    if (isLoading) {
        return (<div><p>Loading...</p></div>);
    } else {
        return (
            <div className="container">
                <img className="icon" alt="profile icon" src={"https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/" + data.profileIconId + ".png"}  />
                <div className="data">
                    <h1>{props.name}#{props.tag}</h1>
                    <h2>Level {data.summonerLevel}</h2>
                    <GetScore props={props}></GetScore>
                </div>
            </div>
        )
    }
}

function Summoner(props) {
    return (
        <div className="summoner-container">
            <div className="title-container">
                <h1 className="title">Summoner</h1>
                <img className="title-img" src="/title.png" alt="title" />
            </div>
            <GetSummoner props={props}></GetSummoner>
        </div>
    )
}

export default Summoner;