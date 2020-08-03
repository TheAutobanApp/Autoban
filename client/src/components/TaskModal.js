import React, { useState, useContext, useEffect } from 'react';
import { AutoContext } from '../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
const axios = require('axios');

export default function TaskModal(props) {
  const context = useContext(AutoContext);

  const [task, setTask] = useState({
    id_user: 1,
    id_column: null,
    column_place: 0,
    task_title: '',
    task_description: null,
    start_date: null,
    end_date: null,
    complete: false,
    created_by: 1,
  });

  useEffect(() => {
    setTask({ ...task, id_column: context[4].column });
  }, [context[4]]);

  const titleInput = {
    width: '90%',
    border: 'none',
    height: 35,
    borderRadius: 5,
  };

  const descriptionInput = {
    width: '100%',
    border: 'none',
    height: 200,
    borderRadius: 5,
  };

  const functionContainer = {
    width: 200,
  };

  const taskFunction = {
    backgroundColor: 'lightgray',
    borderRadius: 3,
    border: 'none',
    color: 'gray',
    padding: 8,
    margin: 8,
  };

  const saveButton = {
    borderRadius: 5,
    color: 'white',
    border: 'none',
    padding: 10,
    marginTop: 10,
    background:
      'linear-gradient(to bottom, var(--nav-color), var(--nav-color2))',
  };

  const hideModal = () => {
    context[5]({ ...context[4], show: false });
  };

  const postTask = () => {
    axios.post('/api/task/create/1', task);
    context[7](context[6].concat([task]));
    setTask({
      ...task,
      task_title: '',
      task_description: '',
      id_column: null,
    });
  };

  const modalStyle = {
    height: '80vh',
    width: '45vw',
    backgroundColor: 'whitesmoke',
    minWidth: 500,
    minHeight: 500,
  };

  return (
    <Rodal
      visible={context[4].show}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <input
          style={titleInput}
          onChange={(e) => {
            setTask({ ...task, task_title: e.target.value });
          }}
          value={task.task_title}
          placeholder="Title"
        />
      </div>
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <textarea
          style={descriptionInput}
          onChange={(e) =>
            setTask({ ...task, task_description: e.target.value })
          }
          value={task.task_description}
          placeholder="Description"
        />
        <div style={functionContainer}>
          <div style={taskFunction}>Labels</div>
          <div style={taskFunction}>Assign</div>
        </div>
      </div>
      <button
        style={saveButton}
        onClick={() => {
          postTask();
          hideModal();
        }}
      >
        Save
      </button>
    </Rodal>
  );
}
