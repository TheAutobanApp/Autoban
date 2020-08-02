import React, { useContext } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';

function DropMenu(props) {
  const context = useContext(AutoContext);

  const handleDeleteColumn = () => {
    axios
      .delete(`/api/columns/${1}`, { data: { id_place: props.id } })
      .then((res) => context[3](res.data));
  };

  return (
    <>
      {props.option === 'column' ? (
        <Dropdown
          icon="ellipsis vertical"
          direction="left"
          className="icon"
        >
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item
              onClick={() => {
                context[1]({
                  ...context[0],
                  open: true,
                  type: 'column',
                });
              }}
            >
              Edit Column
            </Dropdown.Item>
            <Dropdown.Item>Archive Cards</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleDeleteColumn}>
              Delete Column
            </Dropdown.Item>
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
            <Dropdown.Item
              onClick={() => {
                context[1]({
                  ...context[0],
                  open: true,
                  type: 'card',
                });
              }}
            >
              Edit Card
            </Dropdown.Item>
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
