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
  Input,
  Form,
  TextArea,
} from 'semantic-ui-react';
import ModalButton from '../ModalButton';
import LabelMenu from '../LabelMenu';

export default function TaskModal(props) {
  const context = useContext(AutoContext);
  const [task, setTask] = useState({
    id_user: context[8].id_user,
    id_project: context[10].project,
    id_column: null,
    column_place: 0,
    task_title: '',
    task_description: '',
    start_date: null,
    end_date: null,
    complete: false,
    created_by: context[8].username,
    labels: [],
    _id: context[4].card
  });
  const [labels, setLabels] = useState([]);
  const [availLabels, setAvailLabels] = useState([]);
  // if user is editing task in modal search for the task that they are editing else create new task
  useEffect(() => {
    if (context[4].edit) {
      context[6].filter((tsk, index) => {
        if (tsk._id === context[4].card) {
          setTask({
            ...task,
            task_title: tsk.task_title,
            task_description: tsk.task_description,
            labels: [tsk.labels],
            id_column: context[4].column,
            column_place: tsk.column_place
          });
        }
      });
    } else {
      setTask({ ...task, id_column: context[4].column });
    }
  }, [context[4]]);
  // on mount and when project label context is updated,
  // find which labels are on the task and fill the available labels and task labels accordingly
  useEffect(() => {
    // get task label ids
    if (context[4].card) {
      axios
        .get(`/api/mdb/${context[4].card}`)
        .then((res) => {
          const task = res.data;
          let cardLabels = task.labels;
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
    axios.put(`/api/mdb/?_id=${task._id}&id_project=${context[10].project}`, {
      labels: labelsCopy.map((item) => item.id_label),
    });
    // update state with new copies
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
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
    axios
      .post(`/api/mdb/create/`, task)
      .then((res) => {
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
      .put(
        `/api/mdb/edit/${context[4].card}`,
        {
          task_title: task.task_title,
          task_description: task.task_description,
        },
      )
      .then((res) => context[7](res.data));
  };

  const modalStyle = {
    height: 'fit-content',
    width: '45vw',
    backgroundColor: 'whitesmoke',
    minWidth: 500,
    maxWidth: 600,
  };

  return (
    <Rodal
      visible={context[4].show}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div className="space-between">
        <Input
          className="title-input"
          onChange={(e) => {
            setTask({ ...task, task_title: e.target.value });
          }}
          value={task.task_title}
          placeholder="Title"
        />
      </div>
      <Form className="task-description">
        <TextArea
          className="task-textarea"
          onChange={(e) =>
            setTask({ ...task, task_description: e.target.value })
          }
          value={task.task_description}
          placeholder="Description"
        />
      </Form>
      {/* <div className="function-container">
          <div className="task-function">Labels</div>
          <div className="task-function">Assign</div>
        </div> */}
      <div className="space-between">
        <ModalButton
          disabled={false}
          onclick={() => {
            context[4].edit ? editTask() : postTask();
            hideModal();
          }}
        >
          Save
        </ModalButton>
        <div style={{ margin: '5px' }}>
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
          {labels.length < 5 && (
            <LabelMenu
              modal={true}
              id={context[4].card}
              labels={[
                labels,
                setLabels,
                availLabels,
                setAvailLabels,
              ]}
            />
          )}
        </div>
      </div>
    </Rodal>
  );
}
