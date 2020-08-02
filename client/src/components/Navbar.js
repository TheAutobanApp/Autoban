import React, { useContext } from 'react';
import {RiMenu4Line} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import { MdTimeline } from 'react-icons/md'
import { GoProject } from 'react-icons/go'
import { Checkbox } from 'semantic-ui-react'
import Teams from './TeamDropdown'
import { AutoContext } from '../AutoContext';

function Navbar() {
  const context = useContext(AutoContext);
  return (
    <div className="navbar">
      <div className="flex-row">
        <Teams title="Team" item1="Team1" item2="Team2" />
        <Teams title="User" item1="User1" item2="User2" />
      </div>
      <div className="flex-row">
        <RiMenu4Line
          color="lightblue"
          style={{ fontSize: '20px', margin: '1px' }}
        />
        <h1 className="race-font">{window.innerWidth > 600 ? 'Autoban' : 'A'}</h1>
      </div>
      <div className="flex-row navoptions">
      {context[0].timeline ? <MdTimeline size={22}/> : <GoProject size={22}/>}
      <Checkbox toggle onChange={() => {
        context[1]({
          ...context[0],
          timeline: !context[0].timeline,
        });
        }}/>
      <div
        className="clickable"
        onClick={() => {
          context[1]({
            ...context[0],
            open: !context[0].open,
            type: 'settings',
          });
        }}
      >
        <FiSettings size={20} style={{ margin: '10px' }} />
      </div>
      </div>
    </div>
  );
}

export default Navbar;
