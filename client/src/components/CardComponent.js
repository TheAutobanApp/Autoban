import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import {
  Icon,
  Label,
  Dropdown,
  DropdownDivider,
  Input,
} from 'semantic-ui-react';
// import { IoIosArrowDropright } from 'react-icons/io';
// import { FaEllipsisV } from 'react-icons/fa';
import DropMenu from './DropMenu';
import { AutoContext } from '../AutoContext';

function CardComponent(props) {
  const context = useContext(AutoContext);
  const target = useRef(null);
  const [menu, setMenu] = useState({
    offsetTop: 0,
    offsetLeft: 0,
    addLabel: '',
  });
  const [labels, setLabels] = useState([]);
  const [availLabels, setAvailLabels] = useState([]);

  // on mount and when project label context is updated,
  // find which labels are on the task and fill the available labels and task labels accordingly
  useEffect(() => {
    // get task label ids
    axios.get(`/api/task/?task_id=${props.id}`).then((res) => {
      const task = res.data;
      let cardLabels = [
        task.id_label1,
        task.id_label2,
        task.id_label3,
      ];
      const taskLabels = [];
      // create a copy of project labels from context and find matching ids from task
      const projLabels = Array.from(context[12].projectLabels);
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
      setLabels(taskLabels);
      setAvailLabels(projLabels);
    });
  }, [context[12].projectLabels]);

  // move added card label to available state and remove from it's label state
  const handleLabelDelete = (i) => {
    // create copies of state arrays
    const availCopy = Array.from(availLabels);
    const labelsCopy = Array.from(labels);
    // find the index of the deleted label using the label id
    const foundIndex = labels.findIndex(
      (item) => item.id_label === i,
    );
    // copy of deleted label object, push into avaiable array and remove from task label array
    const deleteLabel = labelsCopy[foundIndex];
    availCopy.push(deleteLabel);
    labelsCopy.splice(foundIndex, 1);
    // send id_label to be removed from task
    axios.put(`/api/task/label/remove/?id_task=${props.id}`, {
      id_label: deleteLabel.id_label,
    });
    // update state with new copies
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
  };

  // move label to card's label state and remove from available label state
  const handleAddLabel = (i) => {
    // create copies of state arrays
    const availCopy = Array.from(availLabels);
    const labelsCopy = Array.from(labels);
    // find the index of the label to be added using the label id
    const foundIndex = availCopy.findIndex(
      (item) => item.id_label === i,
    );
    // copy of added label object, update task with the id label from that object
    const newLabel = availCopy[foundIndex];
    // use label array length to determine which column to update
    switch (labels.length) {
      case 0:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_label1: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
      case 1:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_label2: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
      case 2:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
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
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
  };

  // update modal context when selecting to create a label from dropdown
  const handleCreateLabel = () => {
    context[5]({
      ...context[4],
      showLabel: true,
      labelName: menu.addLabel,
    });
  };

  return (
    <Card className="card">
      <Card.Body style={{ display: 'inline-block' }}>
        <Card.Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {props.title}
          <DropMenu option="card" id={props.id} />
        </Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer
        className="flex-row card-footer"
        style={{
          alignItems: 'center',
          height: 'fit-content',
          flexWrap: 'wrap',
        }}
      >
        {/* map through task labels array and render each */}
        {labels.map((item, i) => {
          return (
            <Label
              size="mini"
              color={item.color}
              circular
              id={item.id_label}
              key={i}
            >
              {item.label_name}
              <Icon
                name="delete"
                onClick={() => handleLabelDelete(item.id_label)}
              />
            </Label>
          );
        })}
        {/* only allow 3 labels by rendering add button when task label array length is less than 3*/}
        {labels.length < 3 && (
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
                options={availLabels.map((option) => {
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
                {availLabels.map((option, i) => {
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
        )}
      </Card.Footer>
    </Card>
  );
}
export default CardComponent;
