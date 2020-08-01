import React from 'react';
import {RiMenu4Line} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import { MdTimeline } from 'react-icons/md'
import { GoProject } from 'react-icons/go'
import Teams from './TeamDropdown'
import { Checkbox } from 'semantic-ui-react'

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
      <div className="flex-row navoptions">
      {props.drawer.timeline ? <MdTimeline size={22}/> : <GoProject size={22}/>}
      <Checkbox toggle onChange={() => {
          props.setdrawer({
            ...props.drawer,
            timeline: !props.drawer.timeline,
          });
        }}/>
      <div onClick={() => {
          props.setdrawer({
            ...props.drawer,
            open: !props.drawer.open,
          });
        }}>
        <FiSettings size={20} style={{margin: "10px"}}/>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
