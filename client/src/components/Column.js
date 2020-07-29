import React from 'react';

export default function Column(props) {
  return (
    <div
      style={{
        width: '16%',
        minWidth: '320px',
        height: 'fit-content',
        minHeight: '20vh',
        backgroundColor: 'whitesmoke',
        margin: '10px',
        paddingTop: '5px',
        borderRadius: '5px',
        boxShadow: '1px 1px 5px grey',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '40px',
          borderBottom: '1px solid black',
          padding: '5px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h3>{props.title}</h3>
        <button>+</button>
      </div>
      <div style={{ padding: '4px' }}>{props.children}</div>
    </div>
  );
}
