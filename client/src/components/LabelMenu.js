import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AutoContext } from '../AutoContext';
import axios from 'axios';
import {
  Icon,
  Label,
  Dropdown,
  DropdownDivider,
  Input,
} from 'semantic-ui-react';

export default function LabelMenu(props) {
  const context = useContext(AutoContext);
  const target = useRef(null);
  const [menu, setMenu] = useState({
    offsetTop: 0,
    offsetLeft: 0,
    addLabel: '',
  });

  // move label to card's label state and remove from available label state
  const handleAddLabel = (i) => {
    // create copies of state arrays
    const availCopy = Array.from(props.labels[2]);
    const labelsCopy = Array.from(props.labels[0]);
    // find the index of the label to be added using the label id
    const foundIndex = availCopy.findIndex(
      (item) => item.id_label === i,
    );
    // copy of added label object, update task with the id label from that object
    const newLabel = availCopy[foundIndex];
    // use label array length to determine which column to update
    switch (props.labels[0].length) {
      case 0:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_project: context[10].project,
            id_label1: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
      case 1:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_project: context[10].project,
            id_label2: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
      case 2:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_project: context[10].project,
            id_label3: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
      default:
        console.log('Label length is invalid');
    }
    // push added label into task label array and remove from available array
    labelsCopy.push(newLabel);
    availCopy.splice(foundIndex, 1);
    // update state with new copies
    props.labels[1](labelsCopy);
    props.labels[3](availCopy);
  };

  const handleCreateLabel = () => {
    context[5]({
      ...context[4],
      showLabel: true,
      labelName: menu.addLabel,
    });
  };

  return (
    <Dropdown
      compact
      ref={target}
      pointing="top left"
      trigger={
        <Label
          size="mini"
          color="blue"
          circular
          basic
          className="clickable"
        >
          <Icon name="add" />
          Label
        </Label>
      }
      icon={null}
      labeled
      id={`add${props.id}`}
      onClose={() => {
        setMenu({ ...menu, addLabel: '' });
      }}
      onClick={(e) => {
        // manually set positioning in DOM using offset of parents and element
        // allows us to position the dropdown exactly where we want
        const targ = ReactDOM.findDOMNode(target.current);
        setMenu({
          offsetTop:
            targ.parentElement.offsetTop +
            targ.parentElement.parentElement.offsetTop +
            80,
          offsetLeft:
            targ.offsetLeft +
            targ.parentElement.parentElement.offsetLeft,
        });
      }}
    >
      <Dropdown.Menu
        style={{
          position: 'fixed',
          top: menu.offsetTop,
          left: menu.offsetLeft,
          minWidth: 'fit-content',
          zIndex: 1000,
        }}
      >
        {/* input for adding a label */}
        <Input
          maxLength={16}
          scrolling
          size="mini"
          className="search"
          search
          value={menu.addLabel}
          options={props.labels[2].map((option) => {
            return {
              key: option.label_name,
              text: option.label_name,
              value: option.label_name,
              label: {
                empty: true,
                circular: true,
                color: option.color,
              },
            };
          })}
          // prevents closing of dropdown when selecting input
          onClick={(e) => e.stopPropagation()}
          // prevents closing of dropdown when hitting space bar
          onKeyDown={(e) => {
            if (e.keyCode === 32) {
              e.stopPropagation();
            }
          }}
          onChange={(e) =>
            setMenu({ ...menu, addLabel: e.target.value })
          }
        />
        <Dropdown.Divider />
        <Dropdown.Menu scrolling>
          {/* if input has more than 1 character, show the add label item */}
          {menu.addLabel && menu.addLabel.length > 1 && (
            <>
              <Dropdown.Item onClick={handleCreateLabel}>
                <div className="flex-row">
                  <Icon name="add circle" size="small" />
                  <p style={{ fontSize: 13 }}>
                    New label "{menu.addLabel}"
                  </p>
                </div>
              </Dropdown.Item>
              <DropdownDivider />
            </>
          )}
          {props.labels[2].map((option, i) => {
            return (
              <Dropdown.Item
                key={option.label_name}
                text={option.label_name}
                value={option.label_name}
                onClick={() => handleAddLabel(option.id_label)}
                label={{
                  color: option.color,
                  empty: true,
                  circular: true,
                }}
              />
            );
          })}
          {/* if input is more than 1 letter, show create label selection */}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
}
