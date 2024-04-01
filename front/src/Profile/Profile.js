import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Masteries from "./Masteries";
import '../App.css';
import './Profile.css';
import Randomizer from "./Randomizer";
import Summoner from "./Summoner";

const champions = [
    {id: 266, name: 'Aatrox', roles: ['TOP']},
    {id: 103, name: 'Ahri', roles: ['MID']},
    {id: 84, name: 'Akali', roles: ['MID', 'TOP']},
    {id: 166, name: 'Akshan', roles: ['MID']},
    {id: 12, name: 'Alistar', roles: ['SUPPORT']},
    {id: 32, name: 'Amumu', roles: ['JUNGLE']},
    {id: 34, name: 'Anivia', roles: ['MID']},
    {id: 1, name: 'Annie', roles: ['MID']},
    {id: 523, name: 'Aphelios', roles: ['ADC']},
    {id: 22, name: 'Ashe', roles: ['ADC', 'SUPPORT']},
    {id: 136, name: 'AurelionSol', roles: ['MID']},
    {id: 268, name: 'Azir', roles: ['MID']},
    {id: 432, name: 'Bard', roles: ['SUPPORT']},
    {id: 200, name: 'Belveth', roles: ['JUNGLE']},
    {id: 53, name: 'Blitzcrank', roles: ['SUPPORT']},
    {id: 63, name: 'Brand', roles: ['SUPPORT', 'JUNGLE', 'MID']},
    {id: 201, name: 'Braum', roles: ['SUPPORT']},
    {id: 233, name: 'Briar', roles: ['JUNGLE']},
    {id: 51, name: 'Caitlyn', roles: ['ADC']},
    {id: 164, name: 'Camille', roles: ['TOP']},
    {id: 69, name: 'Cassiopeia', roles: ['MID']},
    {id: 31, name: 'Chogath', roles: ['TOP', 'MID']},
    {id: 42, name: 'Corki', roles: ['MID']},
    {id: 122, name: 'Darius', roles: ['TOP']},
    {id: 131, name: 'Diana', roles: ['JUNGLE', 'MID']},
    {id: 119, name: 'Draven', roles: ['ADC']},
    {id: 36, name: 'DrMundo', roles: ['TOP']},
    {id: 245, name: 'Ekko', roles: ['JUNGLE', 'MID']},
    {id: 60, name: 'Elise', roles: ['JUNGLE']},
    {id: 28, name: 'Evelynn', roles: ['JUNGLE']},
    {id: 81, name: 'Ezreal', roles: ['ADC']},
    {id: 9, name: 'Fiddlesticks', roles: ['JUNGLE']},
    {id: 114, name: 'Fiora', roles: ['TOP']},
    {id: 105, name: 'Fizz', roles: ['MID']},
    {id: 3, name: 'Galio', roles: ['MID', 'SUPPORT']},
    {id: 41, name: 'Gangplank', roles: ['TOP']},
    {id: 86, name: 'Garen', roles: ['TOP']},
    {id: 150, name: 'Gnar', roles: ['TOP']},
    {id: 79, name: 'Gragas', roles: ['TOP', 'JUNGLE']},
    {id: 104, name: 'Graves', roles: ['JUNGLE']},
    {id: 887, name: 'Gwen', roles: ['TOP']},
    {id: 120, name: 'Hecarim', roles: ['JUNGLE']},
    {id: 74, name: 'Heimerdinger', roles: ['MID']},
    {id: 910, name: 'Hwei', roles: ['MID']},
    {id: 420, name: 'Illaoi', roles: ['TOP']},
    {id: 39, name: 'Irelia', roles: ['TOP', 'MID']},
    {id: 427, name: 'Ivern', roles: ['JUNGLE']},
    {id: 40, name: 'Janna', roles: ['SUPPORT']},
    {id: 59, name: 'JarvanIV', roles: ['JUNGLE']},
    {id: 24, name: 'Jax', roles: ['TOP']},
    {id: 126, name: 'Jayce', roles: ['MID', 'TOP']},
    {id: 202, name: 'Jhin', roles: ['ADC']},
    {id: 222, name: 'Jinx', roles: ['ADC']},
    {id: 145, name: 'Kaisa', roles: ['ADC']},
    {id: 429, name: 'Kalista', roles: ['ADC']},
    {id: 43, name: 'Karma', roles: ['SUPPORT']},
    {id: 30, name: 'Karthus', roles: ['JUNGLE']},
    {id: 38, name: 'Kassadin', roles: ['MID']},
    {id: 55, name: 'Katarina', roles: ['MID']},
    {id: 10, name: 'Kayle', roles: ['TOP']},
    {id: 141, name: 'Kayn', roles: ['JUNGLE']},
    {id: 85, name: 'Kennen', roles: ['TOP']},
    {id: 121, name: 'Khazix', roles: ['JUNGLE']},
    {id: 203, name: 'Kindred', roles: ['JUNGLE']},
    {id: 240, name: 'Kled', roles: ['TOP']},
    {id: 96, name: 'KogMaw', roles: ['ADC']},
    {id: 897, name: 'KSante', roles: ['TOP']},
    {id: 7, name: 'LeBlanc', roles: ['MID']},
    {id: 64, name: 'Lee Sin', roles: ['JUNGLE']},
    {id: 89, name: 'Leona', roles: ['SUPPORT']},
    {id: 876, name: 'Lillia', roles: ['JUNGLE']},
    {id: 127, name: 'Lissandra', roles: ['MID']},
    {id: 236, name: 'Lucian', roles: ['ADC']},
    {id: 117, name: 'Lulu', roles: ['SUPPORT']},
    {id: 99, name: 'Lux', roles: ['SUPPORT', 'MID']},
    {id: 54, name: 'Malphite', roles: ['TOP']},
    {id: 90, name: 'Malzahar', roles: ['MID']},
    {id: 57, name: 'Maokai', roles: ['TOP', 'JUNGLE', 'SUPPORT']},
    {id: 11, name: 'Master Yi', roles: ['JUNGLE']},
    {id: 902, name: 'Milio', roles: ['SUPPORT']},
    {id: 21, name: 'Miss Fortune', roles: ['ADC']},
    {id: 62, name: 'Wukong', roles: ['TOP', 'JUNGLE']},
    {id: 82, name: 'Mordekaiser', roles: ['TOP']},
    {id: 25, name: 'Morgana', roles: ['SUPPORT']},
    {id: 950, name: 'Naafiri', roles: ['MID']},
    {id: 267, name: 'Nami', roles: ['SUPPORT']},
    {id: 75, name: 'Nasus', roles: ['TOP']},
    {id: 111, name: 'Nautilus', roles: ['SUPPORT']},
    {id: 518, name: 'Neeko', roles: ['MID']},
    {id: 76, name: 'Nidalee', roles: ['JUNGLE']},
    {id: 895, name: 'Nilah', roles: ['ADC']},
    {id: 56, name: 'Nocturne', roles: ['JUNGLE']},
    {id: 20, name: 'Nunu', roles: ['JUNGLE']},
    {id: 2, name: 'Olaf', roles: ['TOP']},
    {id: 61, name: 'Orianna', roles: ['MID']},
    {id: 516, name: 'Ornn', roles: ['TOP']},
    {id: 80, name: 'Pantheon', roles: ['TOP', 'SUPPORT']},
    {id: 78, name: 'Poppy', roles: ['TOP', 'JUNGLE']},
    {id: 555, name: 'Pyke', roles: ['SUPPORT']},
    {id: 246, name: 'Qiyana', roles: ['MID']},
    {id: 133, name: 'Quinn', roles: ['TOP']},
    {id: 497, name: 'Rakan', roles: ['SUPPORT']},
    {id: 33, name: 'Rammus', roles: ['JUNGLE']},
    {id: 421, name: 'RekSai', roles: ['JUNGLE']},
    {id: 526, name: 'Rell', roles: ['SUPPORT']},
    {id: 888, name: 'Renata Glasc', roles: ['SUPPORT']},
    {id: 58, name: 'Renekton', roles: ['TOP']},
    {id: 107, name: 'Rengar', roles: ['JUNGLE']},
    {id: 92, name: 'Riven', roles: ['TOP']},
    {id: 68, name: 'Rumble', roles: ['TOP']},
    {id: 13, name: 'Ryze', roles: ['MID']},
    {id: 360, name: 'Samira', roles: ['ADC']},
    {id: 113, name: 'Sejuani', roles: ['JUNGLE']},
    {id: 235, name: 'Senna', roles: ['SUPPORT', 'ADC']},
    {id: 147, name: 'Seraphine', roles: ['SUPPORT']},
    {id: 875, name: 'Sett', roles: ['TOP']},
    {id: 35, name: 'Shaco', roles: ['JUNGLE']},
    {id: 98, name: 'Shen', roles: ['TOP']},
    {id: 102, name: 'Shyvana', roles: ['JUNGLE']},
    {id: 27, name: 'Singed', roles: ['TOP']},
    {id: 14, name: 'Sion', roles: ['TOP']},
    {id: 15, name: 'Sivir', roles: ['ADC']},
    {id: 72, name: 'Skarner', roles: ['JUNGLE']},
    {id: 901, name: 'Smolder', roles: ['ADC']},
    {id: 37, name: 'Sona', roles: ['SUPPORT']},
    {id: 16, name: 'Soraka', roles: ['SUPPORT']},
    {id: 50, name: 'Swain', roles: ['MID', 'SUPPORT']},
    {id: 517, name: 'Sylas', roles: ['MID']},
    {id: 134, name: 'Syndra', roles: ['MID']},
    {id: 223, name: 'Tahm Kench', roles: ['TOP', 'SUPPORT']},
    {id: 163, name: 'Taliyah', roles: ['JUNGLE', 'MID']},
    {id: 91, name: 'Talon', roles: ['MID']},
    {id: 44, name: 'Taric', roles: ['SUPPORT']},
    {id: 17, name: 'Teemo', roles: ['TOP']},
    {id: 412, name: 'Thresh', roles: ['SUPPORT']},
    {id: 18, name: 'Tristana', roles: ['ADC', 'MID']},
    {id: 48, name: 'Trundle', roles: ['TOP', 'JUNGLE']},
    {id: 23, name: 'Tryndamere', roles: ['TOP']},
    {id: 4, name: 'Twisted Fate', roles: ['MID']},
    {id: 29, name: 'Twitch', roles: ['ADC']},
    {id: 77, name: 'Udyr', roles: ['JUNGLE']},
    {id: 6, name: 'Urgot', roles: ['TOP']},
    {id: 110, name: 'Varus', roles: ['ADC']},
    {id: 67, name: 'Vayne', roles: ['ADC', 'TOP']},
    {id: 45, name: 'Veigar', roles: ['MID']},
    {id: 161, name: 'VelKoz', roles: ['SUPPORT', 'MID']},
    {id: 711, name: 'Vex', roles: ['MID']},
    {id: 254, name: 'Vi', roles: ['JUNGLE']},
    {id: 234, name: 'Viego', roles: ['JUNGLE']},
    {id: 112, name: 'Viktor', roles: ['MID']},
    {id: 8, name: 'Vladimir', roles: ['MID']},
    {id: 106, name: 'Volibear', roles: ['TOP', 'JUNGLE']},
    {id: 19, name: 'Warwick', roles: ['JUNGLE']},
    {id: 498, name: 'Xayah', roles: ['ADC']},
    {id: 101, name: 'Xerath', roles: ['SUPPORT', 'MID']},
    {id: 5, name: 'Xin Zhao', roles: ['JUNGLE']},
    {id: 157, name: 'Yasuo', roles: ['MID']},
    {id: 777, name: 'Yone', roles: ['TOP', 'MID']},
    {id: 83, name: 'Yorick', roles: ['TOP']},
    {id: 350, name: 'Yuumi', roles: ['SUPPORT']},
    {id: 154, name: 'Zac', roles: ['JUNGLE']},
    {id: 238, name: 'Zed', roles: ['MID']},
    {id: 221, name: 'Zeri', roles: ['ADC']},
    {id: 115, name: 'Ziggs', roles: ['ADC', 'MID']},
    {id: 26, name: 'Zilean', roles: ['SUPPORT']},
    {id: 142, name: 'Zoe', roles: ['MID']},
    {id: 143, name: 'Zyra', roles: ['SUPPORT']},
];

let account = {};

function updateAccount(field, value) {
    account[field] = value;
}

function getRegion(region) {
    if (region === "euw1" || region === "eun1" || region === "euw1") {
            account.global = 'europe';
    } else if (region === "na1" || region === "br1" || region === "la1" || region === "la2") {
        account.global = 'americas';
    } else if (region === 'oc1') {
        account.global = 'sea';
    } else {
        account.global = 'asia';
    }
}

function GetName() {
    const url = "https://masteriesadventures.onrender.com/api/account/" + account.global + "/" + account.gameName + "/" + account.tagLine;
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
       const fetchData = async() => {
           await axios.get(url).then((response => {
            updateAccount('puuid', response.data.puuid);
            setData(response.data);
            setLoading(false);
           }));
       };
       fetchData();
    }, [url]);

    if (isLoading) {
        return (<div><p>Loading...</p></div>);
    } else if (data.error === true) {
        return (
            <div style={{textAlign: 'center', paddingTop: '15vh'}}>
                <h1 style={{fontSize: '10vh'}}>Player not found !</h1>
                <h2>The Riot ID, the tagline or the region you specified is incorrect.</h2>
                <h2>We did not find any user with this informations.</h2>
                <h2>Maybe try another !</h2>
            </div>
        )
    } else {
        return (
            <div>
                <Summoner puuid={data.puuid} name={data.gameName} tag={data.tagLine} region={account.region}></Summoner>
                <Randomizer puuid={data.puuid} region={account.region} champions={champions}></Randomizer>
                <Masteries puuid={data.puuid} region={account.region} champions={champions}></Masteries>
            </div>
        )
    }
}

function InitAccount() {
    const pseudo = useParams().pseudo.split("-");

    account = {};
    account = {region: pseudo[0], gameName: pseudo[1], tagLine: pseudo[2]};
    getRegion(account.region);
}

function Profile(props) {
    InitAccount();
    return (
        <div>
            <GetName></GetName>
        </div>
    );
}

export default Profile;