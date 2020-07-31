import React from 'react';
import {RiMenu4Line} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import Teams from './TeamDropdown'



function Navbar(props) {
  return (
    <div className="navbar">
      <div className="flex-row">
      <Teams title="Team" item1="Team1" item2="Team2"/>
      <Teams title="User" item1="User1" item2="User2"/>
      </div>
      <div className="flex-row">
        <RiMenu4Line color="lightblue" style={{fontSize: '20px', margin: '1px'}}/>
        <h1 className="race-font">Autoban</h1>
      </div>

      <FiSettings style={{margin: "5px"}}
        onClick={() => {
          props.setdrawer({
            ...props.drawer,
            open: !props.drawer.open,
          });
        }}
      />

      
    </div>
  );
}

export default Navbar;
