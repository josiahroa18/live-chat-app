import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        width: '400px'
    }
})

let socket;

export default () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const [ displayName, setDisplayName ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    // Server url
    const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT || 'localhost:5000';

    // When user leaves or refreshes page, disconnect and turn off instance
    const handleDisconnect = () => {
        socket.emit('disconnect');
        socket.off();
    }

    // Emit a message to the server
    const sendMessage = (e) => {
        if(e){
            e.preventDefault();
        }

        if(message){
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    }

    useEffect(() => {
        // Grab the displayName and roomName from the query string
        const { displayName, roomName } = queryString.parse(location.search);

        // Set current instance
        socket = io(ENDPOINT);

        // Update component state
        setDisplayName(displayName);
        setRoomName(roomName);

        // Emit join room
        socket.emit('joinRoom', { displayName, roomName }, (error) => {
            // Callback - handle error here
            if(error){
                console.log(error);
                history.push('/?error=duplicate')
            }
        });

        return () => {
            handleDisconnect();
        }

    }, [ location.search, ENDPOINT ]);

    useEffect(() => {
        // Receives messages from server and addes it to component state
        socket.on('message', message => {
            setMessages([...messages, message]);
        })

        console.log(messages);

    }, [ messages ])

    return (
        <div>
            <TextField
                label='Message'
                placeholder='Enter your message here'
                variant='outlined'
                value={message}
                className={classes.root}
                onChange={e => {
                    setMessage(e.target.value);
                }}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
            />
            <Button
                variant='contained'
                color='primary'
                onClick={sendMessage}
            >Send</Button>
        </div>        
    );
}