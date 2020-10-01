import React, { useContext } from 'react';
import TeamMenu from './TeamMenu';
import TeamView from './TeamView';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import { AutoContext } from '../AutoContext';
import Fade from 'react-reveal/Fade';

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
      <div className="home-view-cont transition-size">
        <TeamMenu />
        <div className="project-list">
          <AddProject />
          {renderProjects()}
        </div>
        {/* {context[8].team &&
          context[8].team.team_name !== 'Personal' && <TeamView />} */}

        <Fade
          right
          unmountOnExit
          mountOnEnter
          when={
            context[8].team &&
            context[8].team.team_name !== 'Personal'
          }
        >
          <div
            style={{
              width: 300,
              height: '100%',
              maxHeight: '600px',
            }}
          >
            <TeamView />
          </div>
        </Fade>
      </div>
    </div>
  );
}
