import React from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import SettingBar from './components/SettingBar';
import './styles/app.scss';

function App() {
  return (
    <div className='app'>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
