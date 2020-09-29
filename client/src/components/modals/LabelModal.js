import React, { useState, useContext } from 'react';
import { AutoContext } from '../../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Input, Dropdown, Label } from 'semantic-ui-react';
import ModalButton from '../ModalButton';
import axios from 'axios';
import colors from '../utils/colors';

export default function TaskModal() {
  const context = useContext(AutoContext);

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
    id_project: context[10].project,
    color: '',
    label_name: context[4].labelName,
  };
  const [label, setLabel] = useState(initialState);

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
    axios.post(`/api/label/`, label).then((res) => {
      // create copy of project labels from context
      // and update that context with new label from response
      const labelsCopy = Array.from(context[12].projectLabels);
      labelsCopy.push(res.data);
      context[13]({ ...context[13], projectLabels: labelsCopy });
      // reset state
      setLabel(initialState);
    });
  };

  return (
    <Rodal
      visible={context[4].showLabel}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div className="label-modal">
        <h5>Create Label</h5>
        <div>
          <Input
            icon="tag"
            className="title-input"
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
          <div className="flex-row label-colors">
            {/* if a color is selected, render example */}
            {label.color && (
              <Label circular color={label.color}>
                {label.label_name}
              </Label>
            )}
          </div>
        </div>
        <ModalButton
          disabled={false}
          onclick={() => {
            postLabel();
            hideModal();
          }}
        >
          Save
        </ModalButton>
      </div>
    </Rodal>
  );
}
