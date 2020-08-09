import React, { useContext } from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { MdTimeline } from 'react-icons/md';
import { GoProject } from 'react-icons/go';
import { Checkbox, Button } from 'semantic-ui-react';
import TeamDropdown from './TeamDropdown';
import UserDropdown from './UserDropdown';
// import TeamDropItem from './TeamDropItem';
import { AutoContext } from '../AutoContext';

function Navbar() {
  const context = useContext(AutoContext);

  const handleHomeClick = () => {
    context[11]({ type: 'home', project: null });
    context[3]([]);
    context[7]([]);
    context[13]({ ...context[12], projectLabels: [] });
  };

  return (
    <div className="navbar">
      <div className="flex-row" style={{ padding: '0 4px' }}>
        <Button
          icon="home"
          inverted
          compact
          basic
          circular
          onClick={handleHomeClick}
        />
        <TeamDropdown items={['Autoban', 'PubIO']} />
        {/* user dropdown */}
        <UserDropdown />
      </div>
      <div className="flex-row">
        <RiMenu4Line
          color="lightblue"
          style={{ fontSize: '20px', margin: '1px' }}
        />
        <h1 className="race-font">
          {window.innerWidth > 600 ? 'Autoban' : 'A'}
        </h1>
      </div>
      {/* <div className="flex-row navoptions"> */}
      {/* {context[0].timeline ? (
          <MdTimeline size={22} />
        ) : (
          <GoProject size={22} />
        )}
        <Checkbox
          toggle
          onChange={() => {
            context[1]({
              ...context[0],
              timeline: !context[0].timeline,
            });
          }}
        /> */}
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
    // </div>
  );
}

export default Navbar;
