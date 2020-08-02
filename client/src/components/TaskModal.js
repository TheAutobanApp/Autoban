import React, { useState, useContext } from 'react';
import { AutoContext } from '../AutoContext';
import { MdClose } from 'react-icons/md';
const axios = require('axios');

export default function TaskModal(props) {
  const context = useContext(AutoContext);

  const [task, setTask] = useState({
    id_user: 1,
    id_column: context[4].column,
    column_place: 0,
    task_title: '',
    task_description: null,
    start_date: null,
    end_date: null,
    complete: false,
    created_by: 1,
  });

  const modalStyle = {
    height: '80vh',
    width: '45vw',
    minHeight: 500,
    minWidth: 500,
    border: '1px solid lightgray',
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    zIndex: 1000,
    padding: 20,
    margin: 55,
  };

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

  const modalContainer = {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgb(0,0,0,0.5)',
    zIndex: 999,
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
  };

  const modalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={hideModal} style={modalContainer}>
      <div style={modalStyle} onClick={modalClick}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <input
            style={titleInput}
            onChange={(e) => {
              setTask({ ...task, task_title: e.target.value });
            }}
            value={task.value}
            placeholder="Title"
          />

          <MdClose
            size="1.5em"
            style={{ cursor: 'pointer' }}
            onClick={hideModal}
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
            value={task.description}
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
      </div>
    </div>
  );
}
