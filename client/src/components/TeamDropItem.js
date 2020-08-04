import React from 'react';
import { Checkbox, Button, Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';

export default function TeamDropItem(props) {

  const handleProjectSelect = (e) => {
      console.log(e.target.innerText, e.target);
  };

  const dummy = [
    {
        key: 1,
        text: 'MVP',
        onClick: handleProjectSelect,
      },
      {
        key: 2,
        text: 'Bugs',
        onClick: handleProjectSelect,
        id: 2
      },
      
  ]

  return (
    <Dropdown.Item id="team-drop">
      <Dropdown
        text={props.team}
        pointing="left"
        className="link item"
        options={dummy}
      />
    </Dropdown.Item>
  );
}
