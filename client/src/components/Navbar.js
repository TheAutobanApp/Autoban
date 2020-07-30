import React from 'react';

function Navbar(props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '50px',
        backgroundColor: 'black',
        boxShadow: '0 0 10px black',
      }}
    >
      <h1>Dropdowns</h1>
      <h1>Autoban</h1>
      <h1
        onClick={() => {
          props.setdrawer({
            ...props.drawer,
            open: !props.drawer.open,
          });
        }}
      >
        Settings
      </h1>
    </div>
  );
}

export default Navbar;
