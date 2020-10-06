import React, { useContext, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AutoContext } from '../AutoContext';
import axios from 'axios';
import {
  Icon,
  Label,
  Dropdown,
  DropdownDivider,
  Input,
  Search,
} from 'semantic-ui-react';

export default function LabelMenu(props) {
  const context = useContext(AutoContext);
  const target = useRef(null);
  const [menu, setMenu] = useState({
    offsetTop: 0,
    offsetLeft: 0,
    addLabel: '',
    open: false,
    available: []
  });

  const [availLabels, setAvailLabels] = useState([]);

  useEffect(() => {
    // get task label ids
    const foundIndex = context[6].findIndex(
      (task) => task._id === props.id,
    );
    // create a copy of project labels from context and find matching ids from task
    const projLabels = Array.from(context[12].projectLabels);
    if (foundIndex !== -1) {
      let cardLabels = context[6][foundIndex].labels;
      const taskLabels = [];
      cardLabels.forEach((label) => {
        if (label !== null) {
          let foundIndex = projLabels.findIndex(
            (item) => item.id_label === label,
          );
          const newLabel = projLabels[foundIndex];
          if (newLabel) {
            taskLabels.push(newLabel);
            projLabels.splice(foundIndex, 1);
          }
        }
      });
    }
    setAvailLabels(projLabels);
    setMenu({...menu, available: projLabels})

  }, [context[12].projectLabels, context[6]]);

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
    // push added label into task label array and remove from available array
    labelsCopy.push(newLabel);
    availCopy.splice(foundIndex, 1);
    if (!props.modal) {
      axios.put(
        `/api/mdb/?_id=${props.id}&id_project=${context[10].project}`,
        { labels: labelsCopy.map((item) => item.id_label) },
      );
      // update state with new copies
      props.labels[1](labelsCopy);
      props.labels[3](availCopy);
    } else {
      props.task[1]({...props.task[0], labels: labelsCopy.map(label => label.id_label)})
      props.labels[1](labelsCopy);
      props.labels[3](availCopy);
    }
    
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
          onClick={(e) => {
            console.log(e)
            // manually set positioning in DOM using offset of parents and element
            // allows us to position the dropdown exactly where we want
            if (!props.modal) {
              const targ = ReactDOM.findDOMNode(target.current);
              console.log(window.innerHeight)
              console.log(window.innerHeight - targ.getBoundingClientRect().bottom);
              if ((window.innerHeight - targ.getBoundingClientRect().bottom) > 120) {
                setMenu({
                  ...menu,
                  open: !menu.open,
                  offsetTop:
                    targ.getBoundingClientRect().top + 10,
                  offsetLeft:
                    targ.getBoundingClientRect().left
                });
              } else {
                setMenu({
                  ...menu,
                  open: !menu.open,
                  offsetTop:
                    targ.getBoundingClientRect().top - 200,
                  offsetLeft:
                    targ.getBoundingClientRect().left
                });
              }
              
            }
            
          }}
        >
          <Icon name="add" />
          Label
        </Label>
      }
      icon={null}
      labeled
      id={`add${props.id}`}
      onClose={() => {
        setMenu({ ...menu, open: !menu.open, addLabel: '', available: availLabels });
      }}
      
    >
      <Dropdown.Menu
        style={
          props.modal
            ? { minWidth: 'fit-content', zIndex: 1000 }
            : {
                position: 'fixed',
                top: menu.offsetTop,
                left: menu.offsetLeft,
                minWidth: 'fit-content',
                zIndex: 1000,
              }
        }
      >
        {/* input for adding a label */}
        <Input
          maxLength={16}
          autoFocus
          scrolling
          size="mini"
          className="search"
          placeholder="Search or create"
          value={menu.addLabel}
          options={menu.available.map((option) => {
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
          onChange={(e) => {
            console.log(menu.available)
            setMenu({
              ...menu,
              addLabel: e.target.value,
              available: props.labels[2].filter(
                (item) => item.label_name.toLowerCase().includes(e.target.value.toLowerCase()),
              ),
            });
          }}
        />
        <Dropdown.Divider />
        <Dropdown.Menu scrolling style={{ maxHeight: 115 }}>
          {/* if input has more than 1 character, show the add label item */}
          {(menu.addLabel && menu.addLabel.length > 1 || menu.available.length === 0) && (
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
          {menu.available.map((option, i) => {
            return (
              <Dropdown.Item
              style={{height: 20, display: 'flex', alignItems: 'center'}}
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
