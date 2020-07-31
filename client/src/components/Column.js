import React from 'react';
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import Fade from 'react-reveal/Fade';

export default function Column(props) {
  let numOfCards = React.Children.toArray(props.children).length;

  const addCard = () => {
    console.log('add card');
  }

  const showOptions = () => {
    console.log('show options');
  }

  return (
    <Fade>
    {/* column div */}
    <div className="column">
      {/* header div */}
      <div className="column-header">
        {/* title and number of cards */}
        <div style={{ display: 'flex' }}>
          <span className="card-counter">
            {numOfCards}
          </span>
          <h5 style={{ margin: '3px 0' }}>{props.title}</h5>
        </div>
        {/* add card and options */}
        <div>
          <FaPlus className="clickable" onClick={addCard}/>
          <FaEllipsisV className="clickable" onClick={showOptions}/>
        </div>
      </div>
      {/* cards div */}
      <div className="card-container">{props.children}</div>
    </div>
    </Fade>
  );
}