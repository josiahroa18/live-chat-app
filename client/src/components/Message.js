import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

export default ({ message }) => {
    const theme = useTheme();

    const useStyles = makeStyles({
        message: {
            backgroundColor: theme.palette.background.secondary,
            margin: '0',
            '&:hover': {
                backgroundColor: theme.palette.background.primary
            },
            textAlign: 'left',
            padding: '10px 20px'
        },
    })

    const classes = useStyles();

    return (
        <div className={classes.message}>
            <Typography variant='h6'>{message.user.charAt(0).toUpperCase() + message.user.slice(1)}</Typography>
            <Typography>{message.text}</Typography>
        </div>  
    );
}