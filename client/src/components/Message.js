import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

export default ({ message, currentUser }) => {
    const theme = useTheme();

    const useStyles = makeStyles({
        message: {
            backgroundColor: currentUser === message.user ? theme.palette.primary.main : theme.palette.secondary.main,
            maxWidth: '400px'
        },
        currentUserMessage: {
            right: '0'
        },
        receivingMessage: {
            left: '0'
        }
    })

    const classes = useStyles();

    return (
        <>
            {currentUser === message.user ? (
                <div className={classes.message}>
                    <p>{message.text} - {message.user}</p>
                </div>  
            ) : (
                <div className={classes.message}>
                    <p>{message.text} - {message.user}</p>
                </div>  
            )}
        </>
        
    );
}