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
    // delete tasks in column from db
    if (c !== 'column') {
      axios
      .delete(`/api/mdb/cdelete`, {
        data: { id_column: props.id, id_project: context[10].project },
      })
    }
  }

  const handleDeleteColumn = () => {
    // if tasks are in column, confirm with user
    if (context[2].filter((column) => column.id_column === props.id)[0].tasks.length > 0) {
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
        .delete(`/api/mdb/delete/`, {
          data: { _id: props.id, id_project: context[10].project },
        })
    }
  };

  const editCard = (e) => {
    console.log(e.id)
    context[5]({
      ...context[4],
      show: true,
      edit: 1,
      card: props.id,
      column: props.column
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
              onClick={props.editcolumn}
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
