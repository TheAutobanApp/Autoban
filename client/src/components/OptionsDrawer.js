import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';

function OptionsDrawer(props) {
  return (
    <Fade right when={props.drawer.open} duration={400}>
      <div
        style={{
          width: '250px',
          height: '100%',
          backgroundColor: 'whitesmoke',
          boxShadow: '4px 8px 16px gray',
          position: 'absolute',
          right: 0,
          top: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <p>Options</p>
      </div>
    </Fade>
  );
}

export default OptionsDrawer;
