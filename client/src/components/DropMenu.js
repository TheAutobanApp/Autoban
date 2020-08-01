import React, {useContext} from 'react';
import { Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';

function DropMenu(props) {
  const context = useContext(AutoContext);

  const handleDeleteColumn = () => {
    console.log(context[2])
  }
  return (
    <>
      {props.option === 'column' ? (
        <Dropdown
          icon="ellipsis vertical"
          direction="left"
          className="icon"
        >
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item>Edit Column</Dropdown.Item>
            <Dropdown.Item>Archive Cards</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleDeleteColumn}>Delete Column</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown
          icon="ellipsis vertical"
          direction="left"
          className="icon"
          style={{ fontSize: '15px' }}
        >
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item>Edit Card</Dropdown.Item>
            <Dropdown.Item>Add Label</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Delete Card</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

export default DropMenu;
