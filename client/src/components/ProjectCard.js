import React, { useContext } from 'react';
import { Label } from 'semantic-ui-react';
import { RiMenu4Line } from 'react-icons/ri';
import { AutoContext } from '../AutoContext';

export default function ProjectCard(props) {
  const context = useContext(AutoContext);

  const handleProjectSelect = () => {
    context[11]({ type: 'project', project: props.id });
    context[9]({ ...context[8], team: null });
  };

  return (
    <Label
      className="clickable projcard"
      color={props.color}
      onClick={handleProjectSelect}
    >
      <div className="flex-row projcard-logo">
        <RiMenu4Line size={20} />
        <h1 className="race-font">A</h1>
      </div>
      <div className="projcard-overlay">{props.title}</div>
    </Label>
  );
}
