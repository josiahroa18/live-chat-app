import React, { useState } from 'react';
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
    margin: '10px auto',
    padding: '20px',
    backgroundColor: '#f5f5f5'
  },
  inputField: {
    width: '100%'
  },
  flexWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spaceWrapper: {
    marginTop: '20px'
  },
  joinButton: {
    width: '25%',
    marginLeft: '20px'
  }
})

function App() {
  const classes = useStyles();
  const history = useHistory();
  
  const [ displayName, setDisplayName ] = useState('');
  const [ roomId, setRoomId ] = useState('');

  const handleSubmit = () => {
    console.log(displayName)
  }

  return (
    <div className="App">
      <Route exact path='/'>
        <div>
          <h1>Welcome to Live Chat!</h1>
          <Card className={classes.root}>
            <TextField 
              label="Display Name *" 
              variant="outlined" 
              className={classes.inputField}
              onChange={e => {
                setDisplayName(e.target.value)
              }}
            />
            <div className={`${classes.flexWrapper} ${classes.spaceWrapper}`}>
              <TextField 
                label="Room Id" 
                variant="outlined" 
                className={classes.inputField}
                onChange={e => {
                  setRoomId(e.target.value)
                }}
              />
              <Button 
                  variant="contained" 
                  color='primary'
                  className={classes.joinButton}
                  onClick={async () => {
                    await handleSubmit();
                    history.push(`/messenger?displayName=${displayName}&roomId=${roomId}`)
                  }}
              >Join Room</Button>
            </div>
            <div className={classes.flexWrapper}>
              <p>or</p>
            </div>
            <div className={classes.flexWrapper}>
              <Button 
                  variant="contained" 
                  color='primary'
                  onClick={async () => {
                    await handleSubmit();
                    history.push(`/messenger?displayName=${displayName}&roomId=myRoom`)
                  }}
              >Create New Room</Button>
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
