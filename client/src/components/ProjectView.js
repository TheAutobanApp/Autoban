import React from 'react';
import Fade from 'react-reveal/Fade';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function ProjectView(props) {
  return (
    <Fade duration={2000}>
      <DndProvider backend={HTML5Backend}>
        <div className="project-view">{props.children}</div>
      </DndProvider>
    </Fade>
  );
}
