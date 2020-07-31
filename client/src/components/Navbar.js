import React from 'react';
import {RiMenu4Line} from 'react-icons/ri'

function Navbar(props) {
  return (
    <div className="navbar">
      <h1>Dropdowns</h1>
      <div className="flex-row">
        <RiMenu4Line color="lightblue" style={{fontSize: '20px', margin: '1px'}}/>
        <h1 className="race-font">Autoban</h1>
      </div>
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
