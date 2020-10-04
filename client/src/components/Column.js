import React, { useContext, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import DropMenu from './DropMenu';
import { AutoContext } from '../AutoContext';
import { ItemTypes } from './utils/Constants'
import { useDrop, useDrag } from 'react-dnd'

export default function Column(props) {
  let numOfCards = React.Children.toArray(props.children).length;
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: () => {
      const newTasks = Array.from(context[6]);
      newTasks[newTasks.findIndex(item => item._id === context[10].drag)].id_column = props.id;
      context[7](newTasks);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.COLUMN },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const context = useContext(AutoContext);

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
          {props.children}
        </div>
      </div>
    </>
  );
}
