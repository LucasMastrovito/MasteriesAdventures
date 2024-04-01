import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Navbar from './Navbar';

function App() {
  return (
    <div className='app'>
      <div className='row header'>
        <Navbar></Navbar>
      </div>
      <div className='row content'>
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/defaultsite' element={<Home></Home>} />
          <Route path='/profile/:pseudo' element={<Profile></Profile>} />
        </Routes>
      </div>
      <div style={{fontSize: '1vh', textAlign: 'center'}} className='row footer'>
        <p>© Copyright 2024 www.masteriesadventures.com. All rights reserved.</p>
        <p>MasteriesAdventures.com isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
      </div>
    </div>
  );
}

export default App;
