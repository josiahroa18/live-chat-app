import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Messenger from './pages/Messenger';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './App.css';

const useStyles = makeStyles({
  root: {
    width: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5'
  },
  inputField: {
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: '20px'
  }
})

function App() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="App">
      <Route exact path='/'>
        <div>
          <h1>Welcome to Live Chat!</h1>
          <Card className={classes.root}>
            <TextField id="outlined-basic" label="Display Name" variant="outlined" className={classes.inputField}/>
            <div className={classes.wrapper}>
              <Button 
                  variant="contained" 
                  color='primary'
                  className={classes.button}
                  onClick={() => {
                    history.push(`/messenger?displayName=USER&roomId=myRoom`)
                  }}
              >Create Room</Button>
              <Button 
                  variant="contained" 
                  color='primary'
                  className={classes.button}
              >Join Room</Button>
            </div>
          </Card>
        </div>
      </Route>
      <Route path='/messenger'>
        <Messenger/>
      </Route>
    </div>
  );
}

export default App;
