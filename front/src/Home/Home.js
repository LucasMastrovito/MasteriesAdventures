import Search from "./Search";
import '../App.css';

const apiKey = "RGAPI-a9b83283-7158-4261-b6ae-0b1a041fd9a8";

function Home() {
    return (
        <div className="home-container">
            <Search apiKey={apiKey}></Search>
            <div className="tuto">
                <h1>What's MasteriesAdventures ?</h1>
                <h3>MasteriesAdventures is a mini-game in which the aim is to climb all the champions' masteries in the game.</h3>
                <h1>How does it works ?</h1>
                <h3>Log in with your Riot Games account, then go to your profile page. Use the random champion draw to select the roles available, then choose 1 champion from the 3 available.</h3>
                <h3>You'll only be able to change champions once you've reached a new mastery level, or once you've tokenized your chosen champion.</h3>
            </div>
        </div>
    )
}

export default Home;