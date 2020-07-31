import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'

import {FaUsers, FaUser } from 'react-icons/fa'

function TeamDropdown(props) {
return (

<Dropdown>
  <Dropdown.Toggle variant="outline-light" className="NavDropdown" id="dropdown-basic" >
    {props.title === "Team" ? <FaUsers fontSize="22px"/> : <FaUser /> }
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">{props.item1}</Dropdown.Item>
    <Dropdown.Item href="#/action-2">{props.item2}</Dropdown.Item>
    <Dropdown.Item href="#/action-3">{props.item3}</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
)
}

export default TeamDropdown

