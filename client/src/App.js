import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: '#f5f5f5', padding: '2px' }}>
        <h1>Live Chat</h1>
      </div>
      <div style={{ height: `600px`, overflowY: 'auto', border: '1px solid black' }}>

      </div>
      <div className='tool-bar'>
        <div style={{ width: '75%' }}>
          <TextField
            fullWidth
            placeholder='Enter your message here'
            variant="outlined"
          />
        </div>
        <div style={{ width: '20%' }}>
          <Button 
            fullWidth 
            variant="contained" 
            color='primary'
          >Send</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
