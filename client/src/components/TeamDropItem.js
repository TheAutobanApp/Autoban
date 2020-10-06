import React, {useContext, useEffect} from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';

export default function TeamDropItem(props) {
  const context = useContext(AutoContext);

  const handleProjectSelect = (e) => {
      context[11]({view: 'project', project: e.target.id})
  };

  let teamProjects = [];

  useEffect(() => {
    context[8].projects.forEach((project, i) => {
      if (project.id_team === props.id) {
        let projectItem = {
          key: i,
          text: project.project_name,
          onClick: handleProjectSelect,
          value: project.id_project
        }
        teamProjects.push(projectItem);
      }
    })
  }, [context[8].projects]);

  return (
    <Dropdown.Item id="team-drop">
      <Dropdown
        text={props.team}
        className="link item"
        options={teamProjects}
      />
    </Dropdown.Item>
  );
}
