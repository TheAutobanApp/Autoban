import React, { useContext } from 'react';
import TeamMenu from './TeamMenu';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import { AutoContext } from '../AutoContext';

export default function Homeview(props) {
  const context = useContext(AutoContext);
  const renderProjects = () => {
    return context[8].projects.map((element) => {
      if (element.id_team === context[8].team) {
        console.log(
          element.id_team,
          context[8].team,
          element.project_name,
        );
        return <ProjectCard title={element.project_name} />;
      } else if (context[8].team === null) {
        return <ProjectCard title={element.project_name} />;
      }
    });
  };

  return (
    <div className="project-view home-view">
      <div
        style={{
          width: '70%',
          height: '75%',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <TeamMenu />
        <div
          style={{ height: '100%', width: '100%', padding: '10px' }}
        >
          <AddProject />
          {renderProjects()}
        </div>
      </div>
    </div>
  );
}
