import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { AutoContext } from '../AutoContext';
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
    height: '500px',
    width: '500px',
    border: '1px solid lightgray',
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    zIndex: 1000,
    padding: 20,
    margin: 25,
  };

  const modalContainer = {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgb(0,0,0,0.3)',
    zIndex: 999,
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
      <Fade top when={context[4].show} collapse duration={1000}>
        <div style={modalStyle} onClick={modalClick}>
          <div>
            <input
              onChange={(e) => {
                setTask({ ...task, task_title: e.target.value });
              }}
              value={task.value}
              placeholder="title"
            />
          </div>
          <div>
            <textarea
              onChange={(e) =>
                setTask({ ...task, task_description: e.target.value })
              }
              value={task.description}
              placeholder="description"
            />
          </div>
          <button
            onClick={() => {
              postTask();
              hideModal();
            }}
          >
            Add
          </button>
        </div>
      </Fade>
    </div>
  );
}
