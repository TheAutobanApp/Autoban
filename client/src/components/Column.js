import React, { useContext, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import DropMenu from './DropMenu';
import { AutoContext } from '../AutoContext';
import Card from './CardComponent';
import { ItemTypes } from './utils/Constants';
import { useDrop, useDrag } from 'react-dnd';

export default function Column(props) {
  const context = useContext(AutoContext);
  let numOfCards = React.Children.toArray(props.children).length;
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: () => {
      // const newTasks = Array.from(context[6]);
      // const moveTask = newTasks.filter(
      //   (task) => task._id === context[10].drag,
      // )[0];
      // const updateIndex = newTasks.filter(
      //   (task) => task.id_column === props.id,
      // );
      // // console.log(props.id, context[10].startColumn)
      // if (props.id !== context[10].startColumn) {
      //   console.log('different column')
      //   if (updateIndex.length > 0) {
      //     updateIndex.forEach((task, index) => {
      //       if (task.column_place > context[10].dropIndex) {
      //         task.column_place += 1;
      //       }
      //     });
      //     moveTask.id_column = props.id;
      //     moveTask.column_place = context[10].dropIndex + 1;
      //   } else {
      //     moveTask.id_column = props.id;
      //     moveTask.column_place = 0;
      //   }

      // } else {
      //   console.log('same column')
      //   console.log(context[10].dropIndex)
      //   updateIndex.forEach(task => {
      //     if (task.column_place >= context[10].dropIndex) {

      //     } else {

      //     }
      //   })
      //   if(updateIndex.filter(task => task.column_place === context[10].dropIndex)[0]) {
      //     updateIndex.filter(task => task.column_place === context[10].dropIndex)[0] += 1
      //   };
      //   // console.log(updateIndex.filter(task => task.column_place === context[10].dropIndex)[0]);
      //   moveTask.column_place = context[10].dropIndex;
      // }

      // console.log(newTasks);
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
          `/api/mdb/drop/${newColumns[context[10].startColumn].id_column}`,
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

  return (
    <>
      {/* column div */}
      <div className="column" ref={drag}>
        {/* header div */}
        <div className="column-header">
          {/* title and number of cards */}
          <div className="flex-row">
            <span className="card-counter">{numOfCards}</span>
            <h3 style={{ margin: '3px 0' }}>{props.title}</h3>
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
            <DropMenu option="column" id={props.id} />
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
