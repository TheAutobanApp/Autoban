import React from 'react';
import Fade from 'react-reveal/Fade';

export default function ProjectView(props) {
  return (
    <Fade duration={2000}>
      <div className="project-view">{props.children}</div>
    </Fade>
  );
}
