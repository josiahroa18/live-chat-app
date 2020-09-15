import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default ({ roomName, users }) => {
    const theme = useTheme();

    const useStyles = makeStyles({
        sideBar: {
            width: '25%',
            height: '600px',
            backgroundColor: theme.palette.background.secondary
        }
    })

    const classes = useStyles();

    console.log(roomName);
    console.log(users)

    return (
        <Card className={classes.sideBar}>

        </Card>
    );
}