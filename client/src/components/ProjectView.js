import React from 'react';
import Fade from 'react-reveal/Fade';

export default function ProjectView(props) {
  return (
    <Fade>
      <div className="project-view">{props.children}</div>
    </Fade>
  );
}
