import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Messenger from './pages/Messenger';

import { Paper, Switch, Typography } from '@material-ui/core/';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { lightTheme, darkTheme } from './theme';

function App() {
  const [ darkMode, setDarkMode ] = useState(() => {
    let darkMode = window.localStorage.getItem('darkMode');
    return JSON.parse(darkMode) ? true : false;
  });

  // Import custom theme object and create Material UI theme object
  const dark = createMuiTheme(darkTheme)
  const light = createMuiTheme(lightTheme)

  // Save dark mode preferance in local storage
  useEffect(() => {
    window.localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Paper style={{ height: '100vh' }} square>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch 
            color='primary'
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)}
          />
          <Typography>{darkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
        </div>
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
