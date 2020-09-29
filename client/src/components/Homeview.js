import React, { useContext } from 'react';
import TeamMenu from './TeamMenu';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import { AutoContext } from '../AutoContext';

export default function Homeview(props) {
  const context = useContext(AutoContext);

  const renderProjects = () => {
    if (context[8].projects.length > 0) {
      return context[8].projects.map((element, i) => {
        if (
          context[8].team &&
          element.id_team === context[8].team.id_team
        ) {
          const foundIndex = context[8].teams.findIndex(
            (team) => team.id_team === element.id_team,
          );
          let color = 'red';
          if (foundIndex !== -1) {
            color = context[8].teams[foundIndex].team_color;
          }
          return (
            <ProjectCard
              title={element.project_name}
              key={i}
              id={element.id_project}
              color={color}
            />
          );
        } else if (context[8].team === null) {
          const foundIndex = context[8].teams.findIndex(
            (team) => team.id_team === element.id_team,
          );
          let color = 'red';
          if (foundIndex !== -1) {
            color = context[8].teams[foundIndex].team_color;
          }
          return (
            <ProjectCard
              title={element.project_name}
              key={i}
              id={element.id_project}
              color={color}
            />
          );
        }
      });
    }
  };

  return (
    <div className="project-view home-view">
      <div className="home-view-cont">
        <TeamMenu />
        <div className="project-list">
          <AddProject />
          {renderProjects()}
        </div>
        {context[8].team &&
          context[8].team.team_name !== 'Personal' && (
            <button
              onClick={() =>
                context[5]({ ...context[4], showSearch: true })
              }
            >
              Add Collaborator
            </button>
          )}
      </div>
    </div>
  );
}
