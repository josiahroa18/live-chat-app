import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Messenger from './pages/Messenger';


function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Welcome/>
      </Route>
      <Route path='/messenger'>
        <Messenger/>
      </Route>
    </div>
  );
}

export default App;
