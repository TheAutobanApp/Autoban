import React, { useState, useContext, useEffect } from 'react';
import { AutoContext } from '../../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Input, Dropdown, Form, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalButton from '../ModalButton';

export default function ProjectModal() {
  const context = useContext(AutoContext);

  // inital state for reseting state
  const initialState = {
    id_team: context[8].team && context[8].team.id_team,
    project_name: null,
    project_description: null,
    start_date: null,
    end_date: null,
    created_by: context[8].id_user,
  };
  const [project, setProject] = useState(initialState);

  const modalStyle = {
    height: 'fit-content',
    width: '300px',
    backgroundColor: 'whitesmoke',
  };

  const options = context[8].teams.map((team) => {
    return {
      key: team.id_team,
      id: team.id_team,
      value: team.id_team,
      text: team.team_name,
    };
  });

  // hide modal, reset state and modal context
  const hideModal = () => {
    context[5]({ ...context[4], showProject: false });
    setProject(initialState);
  };

  // post label using settings in state
  const postProject = () => {
    if (project.project_name && project.id_team) {
      axios.post(`/api/project/`, project).then((res) => {
        // create copy of project labels from context
        // and update that context with new label from response
        context[9]({
          ...context[8],
          projects: context[8].projects.concat([res.data]),
        });
      });
      hideModal();
    }
  };

  return (
    <Rodal
      visible={context[4].showProject}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div className="label-modal">
        <h5>Create Project</h5>
        <div className="flex-column" style={{ width: '100%' }}>
          <Input
            error={!project.project_name}
            icon="clipboard list"
            className="proj-title-input"
            onChange={(e) => {
              setProject({
                ...project,
                project_name: e.target.value,
              });
            }}
            placeholder="Name"
          />
          <Dropdown
            error={!project.id_team}
            className="proj-dropdown"
            placeholder="Team"
            defaultValue={context[8].team && context[8].team.id_team}
            search
            selection
            options={options}
            onChange={(e, data) => {
              setProject({ ...project, id_team: data.value });
            }}
          />
          <Form>
            <TextArea
              onChange={(e) => {
                setProject({
                  ...project,
                  project_description: e.target.value,
                });
              }}
              placeholder="Description"
            />
          </Form>
          <div className="flex-row datepicker-cont">
            <DatePicker
              placeholderText="Start Date"
              className="datepicker small"
              selected={project.start_date}
              onChange={(e) => {
                setProject({ ...project, start_date: e });
              }}
            />
            <DatePicker
              placeholderText="End Date"
              className="datepicker small"
              selected={project.end_date}
              onChange={(e) => {
                setProject({ ...project, end_date: e });
              }}
            />
          </div>
        </div>
        <ModalButton
          disabled={false}
          onclick={() => {
            postProject();
          }}
        >
          Save
        </ModalButton>
      </div>
    </Rodal>
  );
}
