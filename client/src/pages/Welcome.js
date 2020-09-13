import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Card, TextField, Button, Typography } from '@material-ui/core';

export default () => {
    const theme = useTheme();
    const history = useHistory();
    
    const [ displayName, setDisplayName ] = useState('');
    const [ roomName, setRoomName ] = useState('');

    const useStyles = makeStyles({
      root: {
        width: '600px',
        margin: '10px auto',
        padding: '20px',
        backgroundColor: theme.palette.background.secondary
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

    const classes = useStyles();

    return (
        <div className={classes.center}>
          <Typography variant='h4'>Welcome to Live Chat!</Typography>
          <Card className={classes.root}>
            <TextField 
              label='Display Name*'
              variant='outlined'
              color='primary'
              className={classes.inputField}
              onChange={e => {
                setDisplayName(e.target.value)
              }}
            />
            <TextField 
                label='Room Name*'
                variant='outlined'
                color='primary'
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