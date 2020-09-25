import React, { useState, useContext, useEffect } from 'react';
import { AutoContext } from '../../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Input, Dropdown, Form, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function TaskModal(props) {
  const context = useContext(AutoContext);

  // inital state for reseting state
  const initialState = {
    id_team: context[8].team.id_team,
    project_name: null,
    project_description: null,
    start_date: null,
    end_date: null,
    created_by: context[8].id_user,
  };
  const [project, setProject] = useState(initialState);

  const titleInput = {
    width: '80%',
    height: 35,
    borderRadius: 5,
  };

  const saveButton = {
    borderRadius: 5,
    color: 'white',
    border: 'none',
    padding: 10,
    background:
      'linear-gradient(to bottom, var(--nav-color), var(--nav-color2))',
  };

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

  //   const editTask = () => {
  //     axios
  //       .put(`/api/task/edit/${context[4].card}/1`, {
  //         task_title: task.task_title,
  //         task_description: task.task_description,
  //       })
  //       .then((res) => context[7](res.data));
  //   };

  return (
    <Rodal
      visible={context[4].showProject}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <h5>Create Project</h5>

        <div className="flex-column" style={{ width: '100%' }}>
          <Input
            error={!project.project_name}
            icon="clipboard list"
            style={titleInput}
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
            style={{ margin: '6px', width: '80%' }}
            placeholder="Team"
            defaultValue={options.findIndex(team => team.id === context[8].team.id_team) + 1}
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
          <div
            className="flex-row"
            style={{
              height: 30,
              width: '100%',
              justifyContent: 'center',
              margin: '5px',
            }}
          >
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
        <button
          style={saveButton}
          onClick={() => {
            postProject();
          }}
        >
          Save
        </button>
      </div>
    </Rodal>
  );
}
