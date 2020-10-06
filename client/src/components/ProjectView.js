import React from 'react';
import Fade from 'react-reveal/Fade';
import { ItemTypes } from './utils/Constants'
import { useDrop, useDrag } from 'react-dnd'

export default function ProjectView(props) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    drop: () => {
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <Fade duration={2000}>
        <div className="project-view" ref={drop}>{props.children}</div>
    </Fade>
  );
}
