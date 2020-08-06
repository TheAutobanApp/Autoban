import React, { useState, useContext, useEffect } from 'react';
import { AutoContext } from '../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Input, Dropdown, Label } from 'semantic-ui-react';
const axios = require('axios');

export default function TaskModal(props) {
  const context = useContext(AutoContext);

  const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
  ];

  const options = colors.map((color) => {
    return {
      key: color,
      value: color,
      text: color.charAt(0).toUpperCase() + color.slice(1),
      label: { color: color, empty: true, circular: true },
    };
  });

  const initialState = {
    id_project: 1,
    color: '',
    label_name: '',
  };
  const [label, setLabel] = useState(initialState);

  useEffect(() => {
    setLabel({ ...label, label_name: context[4].labelName });
  }, [context[4].labelName]);

  const titleInput = {
    width: '100%',
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
    background:
      'linear-gradient(to bottom, var(--nav-color), var(--nav-color2))',
  };

  const hideModal = () => {
    context[5]({ ...context[4], showLabel: false, labelName: '' });
    setLabel(initialState);
  };

  const postTask = () => {
    const contextName = context[4].labelName;

    axios.post(`/api/label/?proj=${1}`, label).then((res) => {
      setLabel(initialState);
    });
  };

  //   const editTask = () => {
  //     axios
  //       .put(`/api/task/edit/${context[4].card}/1`, {
  //         task_title: task.task_title,
  //         task_description: task.task_description,
  //       })
  //       .then((res) => context[7](res.data));
  //   };

  const modalStyle = {
    height: '250px',
    width: '300px',
    backgroundColor: 'whitesmoke',
  };

  return (
    <Rodal
      visible={context[4].showLabel}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <h5>Create Label</h5>
        <div>
          <Input
            icon="tag"
            style={titleInput}
            onChange={(e) => {
              setLabel({ ...label, label_name: e.target.value });
              context[5]({
                ...context[4],
                labelName: e.target.value,
              });
            }}
            defaultValue={context[4].labelName}
            placeholder="Name"
          />
        </div>
        <div className="flex-column">
          <Dropdown
            defaultValue="true"
            placeholder="Color"
            search
            selection
            options={options}
            onChange={(e, data) => {
              setLabel({ ...label, color: data.value });
            }}
          />
          <div
            className="flex-row"
            style={{
              height: 30,
              width: '100%',
              justifyContent: 'center',
              margin: '5px',
            }}
          >
            {label.color && (
              <Label circular color={label.color}>
                {label.label_name}
              </Label>
            )}
          </div>
          {/* <Input
            icon="paint brush"
            style={titleInput}
            onChange={(e) =>
              setLabel({ ...label, color: e.target.value })
            }
            value={label.color}
            placeholder="Color"
          /> */}
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
    </Rodal>
  );
}
