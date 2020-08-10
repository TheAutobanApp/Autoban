import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { AutoContext } from '../../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import axios from 'axios';
import {
  Icon,
  Label,
  Dropdown,
  DropdownDivider,
  Input,
} from 'semantic-ui-react';
import ReactDOM from 'react-dom';

export default function TaskModal(props) {
  const context = useContext(AutoContext);

  const target = useRef(null);
  const [menu, setMenu] = useState({
    offsetTop: 0,
    offsetLeft: 0,
    addLabel: '',
  });
  const [task, setTask] = useState({
    id_user: 1,
    id_column: null,
    column_place: 0,
    task_title: '',
    task_description: '',
    start_date: null,
    end_date: null,
    complete: false,
    created_by: 1,
    id_label1: null,
    id_label2: null,
    id_label3: null,
  });

  useEffect(() => {
    if (context[4].edit) {
      context[6].filter((tsk, index) => {
        if (tsk.id_task === context[4].card) {
          setTask({
            ...task,
            task_title: tsk.task_title,
            task_description: tsk.task_description,
            id_label1: tsk.id_label1,
            id_label2: tsk.id_label2,
            id_label3: tsk.id_label3,
          });
        }
      });
    } else {
      setTask({ ...task, id_column: context[4].column });
    }
  }, [context[4]]);

  const [labels, setLabels] = useState([]);
  const [availLabels, setAvailLabels] = useState([]);

  // on mount and when project label context is updated,
  // find which labels are on the task and fill the available labels and task labels accordingly
  useEffect(() => {
    // get task label ids
    if (context[4].card) {
      axios.get(`/api/task/?task_id=${context[4].card}`).then((res) => {
        console.log(context[4].card);
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
    } else {
      setAvailLabels(context[12].projectLabels);
    }
    
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
    switch (foundIndex) {
      case 0:
        setTask({...task, id_label1: task.id_label2, id_label2: task.id_label3, id_label3: null})
        break;
      case 1:
        setTask({...task, id_label2: task.id_label3, id_label3: null})
        break;
      case 2:
        setTask({...task, id_label3: null})
        break;
      default:
        console.log('Label length is invalid');
    }
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
        setTask({...task, id_label1: i})
        break;
      case 1:
        setTask({...task, id_label2: i})
        break;
      case 2:
        setTask({...task, id_label3: i})
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
    context[5]({ ...context[4], show: false, edit: 0, card: null });
    setTask({
      ...task,
      task_title: '',
      task_description: '',
      id_column: null,
    });
  };

  const postTask = () => {
    axios.post(`/api/task/create/${context[10].project}`, task).then((res) => {
      context[7](context[6].concat(res.data));
      setTask({
        ...task,
        task_title: '',
        task_description: '',
        id_column: null,
      });
    });
  };

  const editTask = () => {
    axios
      .put(`/api/task/edit/${context[4].card}/${context[10].project}`, {
        task_title: task.task_title,
        task_description: task.task_description,
        id_label1: task.id_label1,
        id_label2: task.id_label2,
        id_label3: task.id_label3,
      })
      .then((res) => context[7](res.data));
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
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <button
          style={saveButton}
          onClick={() => {
            context[4].edit ? editTask() : postTask();
            hideModal();
          }}
        >
          Save
        </button>
        <div>
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
                  value={menu.addLabel}
                  
                  // prevents closing of dropdown when selecting input
                  onClick={(e) => e.stopPropagation()}
                  // prevents closing of dropdown when hitting space bar
                  onKeyDown={(e) => {
                    if (e.keyCode === 32) {
                      e.stopPropagation();
                    }
                  }}
                  onChange={(e) =>
                    context[5]({
                      ...context[4],
                      labelName: e.target.value,
                    })
                  }
                />
                <Dropdown.Divider />
                <Dropdown.Menu scrolling>
                  {/* if input has more than 1 character, show the add label item */}
                  {context[4].labelName && context[4].labelName.length > 1 && (
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
                        onClick={() =>
                          handleAddLabel(option.id_label)
                        }
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
        </div>
      </div>
    </Rodal>
  );
}
