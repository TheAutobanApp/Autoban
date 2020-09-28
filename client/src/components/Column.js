import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';
import DropMenu from './DropMenu';
import { AutoContext } from '../AutoContext';

export default function Column(props) {
  let numOfCards = React.Children.toArray(props.children).length;

  const context = useContext(AutoContext);

  const showModal = () => {
    context[5]({ ...context[4], show: true, column: props.id });
  };

  return (
    <>
      {/* column div */}
      <div className="column">
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
        <div className="card-container">
          <div className="overlay"></div>
          {props.children}
        </div>
      </div>
    </>
  );
}
