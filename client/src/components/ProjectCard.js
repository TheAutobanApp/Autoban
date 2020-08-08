import React, { useContext } from 'react';
import { AutoContext } from '../AutoContext';

export default function ProjectCard(props) {
  const context = useContext(AutoContext);

  const handleProjectSelect = () => {
    context[11]({ type: 'project', project: props.id });
  };

  return (
    <div
      style={{
        height: '100px',
        width: '175px',
        backgroundColor: 'purple',
        borderRadius: '5px',
        boxShadow: '1px 1px 5px grey',
      }}
      onClick={handleProjectSelect}
    >
      {props.title}
    </div>
  );
}
