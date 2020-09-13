import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Messenger from './pages/Messenger';

import { Paper, Switch } from '@material-ui/core/';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { lightTheme, darkTheme } from './theme';

function App() {
  const [ darkMode, setDarkMode ] = useState(false);

  const dark = createMuiTheme(darkTheme)
  const light = createMuiTheme(lightTheme)

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Paper style={{ height: '100vh' }} square>
        <Switch 
          color='primary'
          checked={darkMode} 
          onChange={() => setDarkMode(!darkMode)}
        />
        <Route exact path='/'>
          <Welcome/>
        </Route>
        <Route path='/messenger'>
          <Messenger/>
        </Route>
      </Paper>
    </ThemeProvider>
    
  );
}

export default App;
