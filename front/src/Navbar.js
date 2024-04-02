import './App.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    function onClickHome() {
        console.log('home');
        navigate('/');
    }

    return (
        <div className="navbar-container">
            <h1 className="home-btn" onClick={onClickHome}>MasteriesAdventures</h1>
        </div>
    )
}

export default Navbar;