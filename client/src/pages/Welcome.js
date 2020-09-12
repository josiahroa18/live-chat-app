import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    center: {
        textAlign: 'center',
        margin: '0 auto'
    }
  })

export default () => {
    const classes = useStyles();
    const history = useHistory();
    
    const [ displayName, setDisplayName ] = useState('');
    const [ roomName, setRoomName ] = useState('');

    return (
        <div className={classes.center}>
          <h1>Welcome to Live Chat!</h1>
          <Card className={classes.root}>
            <TextField 
              label='Display Name*'
              variant='outlined'
              className={classes.inputField}
              onChange={e => {
                setDisplayName(e.target.value)
              }}
            />
            <TextField 
                label='Room Name*'
                variant='outlined'
                className={`${classes.inputField} ${classes.spaceWrapper}`}
                onChange={e => {
                    setRoomName(e.target.value)
                }}
            />
            <div className={classes.flexWrapper}>
              <Button 
                  variant='contained'
                  className={classes.spaceWrapper}
                  color='primary'
                  disabled={!displayName || !roomName ? true : false}
                  onClick={() => {
                    history.push(`/messenger?displayName=${displayName}&roomName=${roomName}`, { update: true })
                  }}
              >Join Room</Button>
            </div>
          </Card>
        </div>
    );
}