const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
var cors = require('cors');
app.use(cors());

//const riotUrl = ".api.riotgames.com/"
const apiKey = "RGAPI-cc8a0f81-d0db-4baa-9fc9-ec9207e1e962";
let account = {};
let masteries = {};
let summoner = {};
let score = 0;

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

////// GET ACCOUNT

async function getAccount(region, pseudo, tag) {
    const url = "https://" + region + ".api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + pseudo + "/" + tag + "?api_key=" + apiKey;
    await axios.get(url)
    .then(response => {
        account = response.data;
    })
    .catch(error => {
        account = {error: true};
        console.log(error);
    })
}

app.get('/api/account/:region/:pseudo/:tag', async (req, res) => {
    await getAccount(req.params.region, req.params.pseudo, req.params.tag)
    res.json(account);
});

//////

////// GET MASTERIES

async function getMasteries(puuid, region) {
    await axios.get("https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + puuid + "?api_key=" + apiKey)
    .then(response => {
        //console.log(response.data)
        masteries = response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

app.get('/api/masteries/:puuid/:region', async (req, res) => {
    await getMasteries(req.params.puuid, req.params.region);
    res.json(masteries);
});

//////

////// GET MASTERIES BY CHAMPION

async function getMasteriesByChampion(puuid, region) {
    await axios.get("https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + puuid + "/by-champion/" + "?api_key=" + apiKey)
    .then(response => {
        //console.log(response.data)
        masteries = response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

app.get('/api/masteries/:puuid/:region', async (req, res) => {
    await getMasteries(req.params.puuid, req.params.region);
    res.json(masteries);
});

//////

////// GET SUMMONER

async function getSummoner(puuid, region) {
    await axios.get("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + apiKey)
    .then(response => {
        summoner = response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

app.get('/api/summoner/:puuid/:region', async (req, res) => {
    await getSummoner(req.params.puuid, req.params.region);
    res.json(summoner);
});

//////

////// GET MASTERY SCORE

async function getScore(puuid, region) {
    await axios.get("https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/" + puuid + "?api_key=" + apiKey)
    .then(response => {
        score = response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

app.get('/api/score/:puuid/:region', async (req, res) => {
    await getScore(req.params.puuid, req.params.region);
    res.send("" + score);
});

////////// LISTEN

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});