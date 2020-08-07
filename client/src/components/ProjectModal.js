import React, { useState, useContext, useEffect } from 'react';
import { AutoContext } from '../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Input, Dropdown, Label } from 'semantic-ui-react';
import axios from 'axios';

export default function TaskModal(props) {
  const context = useContext(AutoContext);

  // color choices for new labels
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

  // create color objects for dropdown menu options
  const options = colors.map((color) => {
    return {
      key: color,
      value: color,
      text: color.charAt(0).toUpperCase() + color.slice(1),
      label: { color: color, empty: true, circular: true },
    };
  });

  // inital state for reseting state
  const initialState = {
    // make project id responsive
    id_project: 1,
    color: '',
    label_name: '',
  };
  const [label, setLabel] = useState(initialState);

  // when modal is mounted, set local state label name from context
  useEffect(() => {
    setLabel({ ...label, label_name: context[4].labelName });
  }, [context[4].labelName]);

  const titleInput = {
    width: '100%',
    border: 'none',
    height: 35,
    borderRadius: 5,
  };

  const saveButton = {
    borderRadius: 5,
    color: 'white',
    border: 'none',
    padding: 10,
    background:
      'linear-gradient(to bottom, var(--nav-color), var(--nav-color2))',
  };

  const modalStyle = {
    height: '250px',
    width: '300px',
    backgroundColor: 'whitesmoke',
  };

  // hide modal, reset state and modal context
  const hideModal = () => {
    context[5]({ ...context[4], showLabel: false, labelName: '' });
    setLabel(initialState);
  };

  // post label using settings in state
  const postLabel = () => {
    // make project id responsive
    axios.post(`/api/label/?proj=${1}`, label).then((res) => {
      // create copy of project labels from context
      // and update that context with new label from response
      const labelsCopy = Array.from(context[12].projectLabels);
      labelsCopy.push(res.data);
      context[13]({ ...context[13], projectLabels: labelsCopy });
      // reset state
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
            }}
            defaultValue={context[4].labelName}
            placeholder="Name"
          />
        </div>
        <div className="flex-column">
          <Dropdown
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
            {/* if a color is selected, render example */}
            {label.color && (
              <Label circular color={label.color}>
                {label.label_name}
              </Label>
            )}
          </div>
        </div>
        <button
          style={saveButton}
          onClick={() => {
            postLabel();
            hideModal();
          }}
        >
          Save
        </button>
      </div>
    </Rodal>
  );
}
