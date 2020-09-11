import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    
})

let socket;

export default () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const [ displayName, setDisplayName ] = useState('');
    const [ roomName, setRoomName ] = useState('');

    // Server url
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        // Grab the displayName and roomName from the query string
        const { displayName, roomName } = queryString.parse(location.search);

        // Set current instance
        socket = io(ENDPOINT);

        // Update component state
        setDisplayName(displayName);
        setRoomName(roomName);

        // Emit join room
        socket.emit('joinRoom', { displayName, roomName }, () => {
            // Callback
        });

        // When user leaves or refreshes page, disconnect and turn off instance
        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [location.search, ENDPOINT])

    return (
        <div>

        </div>        
    );
}