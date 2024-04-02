import { useNavigate } from "react-router-dom";
import './Search.css';

function Search() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        console.log(event.target)
        navigate('/profile/' + event.target[0].value + '-' + event.target[1].value + '-' + event.target[2].value);
    }
    return (
        <div className="search-container">
            <form className="home-search" onSubmit={handleSubmit}>
                <label>
                <select className="custom-select">
                    <option className="select-selected" value="euw1">EUW</option>
                    <option className="select-selected" value="eun1">EUN</option>
                    <option className="select-selected" value="br1">BR</option>
                    <option className="select-selected" value="jp1">JP</option>
                    <option className="select-selected" value="kr">KR</option>
                    <option className="select-selected" value="la1">LA1</option>
                    <option className="select-selected" value="la2">LA2</option>
                    <option className="select-selected" value="na1">NA</option>
                    <option className="select-selected" value="oc1">OC</option>
                    <option className="select-selected" value="tr1">TR</option>
                    <option className="select-selected" value="ru">RU</option>
                    <option className="select-selected" value="ph2">PH</option>
                    <option className="select-selected" value="sg2">SG</option>
                    <option className="select-selected" value="th2">TH</option>
                    <option className="select-selected" value="tw2">TW</option>
                    <option className="select-selected" value="vn2">VN</option>
                </select>
                    <input className="searchbar" type="text" placeholder="Pseudo"></input>
                    <h2 style={{display: 'inline-block'}}>#</h2>
                    <input className="searchbar" style={{width: '5vw'}} type="text" placeholder="Tag"></input>
                </label>
                    <button className="searchbutton" type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search;