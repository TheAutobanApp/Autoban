import React, { useContext } from 'react';
import { AutoContext } from '../AutoContext';

export default function ProjectCard(props) {
  const context = useContext(AutoContext);

  const handleProjectSelect = () => {
    context[11]({ type: 'project', project: props.id });
    context[9]({...context[8], team: null });
  };

  return (
    <div
      className="clickable"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: '100px',
        width: '160px',
        background: 'linear-gradient(to bottom, rgb(73, 153, 219), rgb(55, 116, 165))',
        borderRadius: '5px',
        boxShadow: '1px 1px 5px grey',
        margin: '4px 4px 4px',
        padding: '5px',
        fontWeight: 'bold',
        color: 'white',
      }}
      onClick={handleProjectSelect}
    >
      {props.title}
    </div>
  );
}
