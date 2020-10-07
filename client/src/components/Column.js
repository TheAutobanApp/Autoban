import React, { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import DropMenu from './DropMenu';
import { AutoContext } from '../AutoContext';
import Card from './CardComponent';
import { ItemTypes } from './utils/Constants';
import { useDrop, useDrag } from 'react-dnd';
import { Input } from 'semantic-ui-react';

export default function Column(props) {
  const context = useContext(AutoContext);
  let numOfCards = React.Children.toArray(props.children).length;
  const [edit, setEdit] = useState({
    show: false,
    text: props.title,
  });
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: () => {
      // copy of columns from context
      const newColumns = Array.from(context[2]);
      const startColumn = newColumns[context[10].startColumn];
      const endColumn = newColumns[props.index];
      // copy of task being dragged
      const moveTask = startColumn.tasks[context[10].startIndex];
      // if drop column is different from original column, update column id for task
      if (props.index !== context[10].startColumn) {
        moveTask.id_column = props.id;
      }
      // splice out the dragged task from column task array using original index
      startColumn.tasks.splice(context[10].startIndex, 1);
      // splice in the dragged task at hovered index in dropped column
      endColumn.tasks.splice(context[10].dropIndex, 0, moveTask);
      // reset each tasks column_place id according to their current place in array in original column
      if (props.index !== context[10].startColumn) {
        startColumn.tasks.forEach((task, index) => {
          task.column_place = startColumn.tasks.length - index - 1;
        });
      }
      // reset each tasks column_place id according to their current place in array in new column
      endColumn.tasks.forEach((task, index) => {
        task.column_place = endColumn.tasks.length - index - 1;
      });
      // update columns state with changes
      // context[3](newColumns);
      // update new columns changes in db
      axios.put(
        `/api/mdb/drop/${props.id}`,
        newColumns[props.index].tasks,
      );
      // update old column changes in db
      if (props.index !== context[10].startColumn) {
        axios.put(
          `/api/mdb/drop/${
            newColumns[context[10].startColumn].id_column
          }`,
          newColumns[context[10].startColumn].tasks,
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.COLUMN },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const showModal = () => {
    context[5]({ ...context[4], show: true, column: props.id });
  };

  const editColumn = (e, type) => {
    if (e.type === 'change') {
      setEdit({ ...edit, text: e.target.value });
    } else if (e.type === 'click') {
      setEdit({ ...edit, show: true });
    }
  };

  const updateColumn = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      if (edit.text.length > 0 && edit.text !== props.title) {
        console.log('worked');
        axios
          .put(`/api/columns/?proj=${context[10].project}`, {
            id_column: props.id,
            column_name: edit.text,
          })
          .then(() => {
            setEdit({ ...edit, show: false });
          });
      } else {
        setEdit({ text: props.title, show: false });
      }
    }
  };

  return (
    <>
      {/* column div */}
      <div className="column" ref={drag}>
        {/* header div */}
        <div className="column-header">
          {/* title and number of cards */}
          <div className="flex-row">
            <span className="card-counter">{numOfCards}</span>
            {!edit.show ? (
              <h3 style={{ margin: '3px 0' }} onClick={editColumn}>
                {props.title}
              </h3>
            ) : (
              <div style={{ display: 'flex' }}>
                <Input
                  maxLength={50}
                  autoFocus
                  error={edit.text.length < 1}
                  defaultValue={props.title}
                  value={edit.text}
                  onBlur={updateColumn}
                  size="mini"
                  placeholder={edit.text}
                  style={{
                    width: 125,
                    height: 29,
                    fontSize: 15,
                    marginLeft: 2,
                  }}
                  onChange={editColumn}
                  onKeyDown={updateColumn}
                />
              </div>
            )}
          </div>
          {/* add card and options */}
          <div className="flex-row">
            <FaPlus
              className="clickable"
              onClick={() => {
                showModal();
              }}
              style={{ margin: '0 5px' }}
            />
            <DropMenu
              option="column"
              id={props.id}
              editcolumn={editColumn}
            />
          </div>
        </div>
        {/* cards div */}
        <div className="card-container" ref={drop}>
          <div className="overlay"></div>
          {/* inside each column, map through the cards and render each one that matches the column index */}
          {props.tasks !== null &&
            props.tasks.map(
              (card, index) =>
                card.id_column === props.id && (
                  <Card
                    column={props.id}
                    id={card._id}
                    columnIndex={props.index}
                    index={index}
                    title={card.task_title}
                    description={card.task_description}
                    key={card._id}
                    createdBy={card.created_by}
                  />
                ),
            )}
        </div>
      </div>
    </>
  );
}
