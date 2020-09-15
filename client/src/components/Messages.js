import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message';

const useStyles = makeStyles({
    scroll: {
        height: '490px',
    }
})

export default ({ messages }) => {
    const classes = useStyles();

    return (
        <ScrollToBottom className={classes.scroll}>
            {messages.map((message, index)=> {
                return <Message 
                            key={`${Math.random()}-${message.user}-${index}`} 
                            message={message} 
                        />
            })}
        </ScrollToBottom>
    );
}