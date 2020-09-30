import React, { useContext } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';

function DropMenu(props) {
  const context = useContext(AutoContext);

  const cascadeDelete = (c) => {
    // delete column from db
    axios
    .delete(`/api/columns/?proj=${context[10].project}`, {
      data: { id_column: props.id },
    })
    .then((res) => context[3](res.data));
    // delete tasks in column from db
    if (c !== 'column') {
      console.log('test')
      axios
      .delete(`/api/task/cdelete/${context[10].project}`, {
        data: { id_column: props.id },
      })
      .then((response) => {
        context[7](response.data);
      });
    }
  }

  const handleDeleteColumn = () => {
    // if tasks are in column, confirm with user
    if (context[6].filter((task) => task.id_column === props.id).length > 0) {
      if (window.confirm('This will delete all tasks in this column. Are you sure?')) {
        cascadeDelete();
      }
    } else {
      cascadeDelete('column');
    }
    
  };

  const handleDeleteCard = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios
        .delete(`/api/task/delete/${context[10].project}`, {
          data: { id_task: props.id },
        })
        .then((response) => {
          context[7](response.data);
        });
    }
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
