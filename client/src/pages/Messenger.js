import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles.css';

const useStyles = makeStyles({
    primary: {
        width: '20%'
    },
    secondary: {
        width: '35%'
    },
    inputField:{
        margin: '0 20px'
    }
})

export default () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className='message-wrapper'>
            <div style={{ backgroundColor: '#f5f5f5', padding: '2px' }}>
                <h1>Live Chat</h1>
            </div>
            <div className='body'>
                <div className='sidebar'>
                <h2>Room ID</h2>
                <div>

                </div>
                <h2>Users</h2>
                <div>

                </div>
                </div>
                <div style={{ height: `100%`, width:'75%', overflowY: 'auto', border: '1px solid black' }}>

                </div>    
            </div>
            <div className='tool-bar'>
                <Button 
                    fullWidth 
                    variant="contained" 
                    color='secondary'
                    className={classes.secondary}
                    onClick={() => {
                        history.push('/')
                    }}
                >Leave Room</Button>
                <TextField
                    fullWidth
                    placeholder='Enter your message here'
                    variant="outlined"
                    className={classes.inputField}
                />
                <Button 
                    fullWidth 
                    variant="contained" 
                    color='primary'
                    className={classes.primary}
                >Send</Button>
            </div>
        </div>
        
    );
}