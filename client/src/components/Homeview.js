import React from 'react';
import TeamMenu from './TeamMenu';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';

export default function Homeview(props) {
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
          <ProjectCard title="autoban" />
        </div>
      </div>
    </div>
  );
}
