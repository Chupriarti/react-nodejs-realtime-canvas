import React from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import SettingBar from './components/SettingBar';
import './styles/app.scss';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route path='/:id'>
            <Toolbar />
            <SettingBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date).toString(16)}`} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
