import React, { useState, useContext, useEffect } from 'react';

const axios = require('axios');

export default function TaskModal() {
  const modalStyle = {
    height: 500,
    width: 500,
    border: '1px solid lightgray',
    borderRadius: 10,
    zIndex: 1000,
  };
  const modalContainer = {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vh',
    backgroundColor: 'rgb(0,0,0,0.8)',
  };
  return (
    <div style={modalContainer}>
      <div style={modalStyle}>
        <input />
        <input />
        <input />
      </div>
    </div>
  );
}
