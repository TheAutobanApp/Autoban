import React, { useState, useContext, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { AutoContext } from '../AutoContext';

const axios = require('axios');

export default function TaskModal(props) {
  const context = useContext(AutoContext);
  const modalStyle = {
    height: 500,
    width: 500,
    border: '1px solid lightgray',
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    zIndex: 1000,
    padding: 20,
    margin: 25,
  };
  const modalContainer = {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgb(0,0,0,0.3)',
  };
  return (
    <div style={modalContainer}>
      <Fade top when={context[4].show} collapse duration={400}>
        <div style={modalStyle}>
          <div>
            <input placeholder="title" />
          </div>
          <div>
            <input placeholder="description" />
          </div>
          <div>
            <input placeholder="assigned" />
          </div>
        </div>
      </Fade>
    </div>
  );
}
