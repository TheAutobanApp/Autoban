import React, { useContext } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';

function DropMenu(props) {
  const context = useContext(AutoContext);

  const handleDeleteColumn = () => {
    axios
      .delete(`/api/columns/?proj=${context[10].project}`, {
        data: { id_place: props.id },
      })
      .then((res) => context[3](res.data));
  };

  const handleDeleteCard = () => {
    axios
      .delete(`/api/task/delete/${context[10].project}`, {
        data: { id_task: props.id },
      })
      .then((response) => {
        context[7](response.data);
      });
  };

  const editCard = () => {
    context[5]({
      ...context[4],
      show: true,
      edit: 1,
      card: props.id,
    });
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
                  edit: props.id,
                });
              }}
            >
              Edit Column
            </Dropdown.Item>
            {/* <Dropdown.Item>Archive Cards</Dropdown.Item> */}
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
        >
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item onClick={editCard}>
              Edit Card
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleDeleteCard}>
              Delete Card
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

export default DropMenu;
