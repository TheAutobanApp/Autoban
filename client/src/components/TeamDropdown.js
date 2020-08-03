import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
// import { Button, Dropdown } from 'react-bootstrap';
// import { FaUsers, FaUser } from 'react-icons/fa';

function TeamDropdown(props) {
  return (
    <Dropdown
      trigger={<Button icon="users" inverted compact basic />}
      pointing="top left"
      icon={null}
    >
      <Dropdown.Menu>
        <Dropdown.Header content="Teams" />
        <Dropdown.Divider />
        {props.items.map((item, i) => <Dropdown.Item text={item} />)}
        {/* <TeamDropItem team="Autoban" />
            <TeamDropItem team="PubIO" />
            <TeamDropItem team="GHPT" /> */}
      </Dropdown.Menu>
    </Dropdown>

    // {/* <Dropdown>
    //   <Dropdown.Toggle variant="outline-light" className="NavDropdown" id="dropdown-basic" >
    //     {props.title === "Team" ? <FaUsers fontSize="22px"/> : <FaUser /> }
    //   </Dropdown.Toggle>

    //   <Dropdown.Menu>
    //     {props.items.map((item, i) => <Dropdown.Item href={`#/action-${i}`}>{item}</Dropdown.Item>)}
    //   </Dropdown.Menu>
    // </Dropdown> */}
  );
}

export default TeamDropdown;
