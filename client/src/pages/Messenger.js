import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { TextField, Button } from '@material-ui/core';
import Messages from '../components/Messages';
import SideBar from '../components/SideBar';

let socket;

export default () => {
    const history = useHistory();
    const location = useLocation();
    const theme = useTheme();

    const [ displayName, setDisplayName ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    const useStyles = makeStyles({
        root: {
            marginTop: '50px !important',
            width: '1000px',
            display: 'flex',
            justifyContent: 'space-between'
        },
        flexWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        center: {
            textAlign: 'center',
            margin: '0 auto'
        },
        inputField: {
            width: '80%'
        },
        button: {
            width: '15%'
        },
        messagesWrapper: {
            width: '73%',
            height: '600px',
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: '5px',
            backgroundColor: theme.palette.background.secondary
        },
        spaceWrapper: {
            marginTop: '20px',
            padding: '0 10px'
        }
    })

    const classes = useStyles();

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
            setMessages(messages => [...messages, message]);
        })
    }, [])

    useEffect(() => {
        console.log(messages);
    }, [messages])

    return (
        <div className={`${classes.root} ${classes.center}`}>
            <SideBar/>
            <div className={classes.messagesWrapper}>
                <Messages messages={messages}/>

                {/* Message Input */}
                <div className={`${classes.flexWrapper} ${classes.spaceWrapper}`}>
                    <TextField
                        label='Message'
                        placeholder='Enter your message here'
                        variant='outlined'
                        value={message}
                        className={classes.inputField}
                        onChange={e => {
                            setMessage(e.target.value);
                        }}
                        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={sendMessage}
                        className={classes.button}
                    >Send</Button>
                </div>
            </div>
            
        </div>        
    );
}