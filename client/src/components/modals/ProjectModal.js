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
    // make project id responsive
    id_team: 1,
    project_name: '',
    project_description: '',
    start_date: '',
    end_date: '',
    created_by: context[8].id_user,
  };
  const [project, setProject] = useState(initialState);
  
  console.log(project)

  // when modal is mounted, set local state label name from context
  //   useEffect(() => {
  //     setProject({ ...label, label_name: context[4].labelName });
  //   }, [context[4].labelName]);

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

  // hide modal, reset state and modal context
  const hideModal = () => {
    context[5]({ ...context[4], showProject: false });
    setProject(initialState);
  };

  // post label using settings in state
  const postProject = () => {
    console.log(project)
    // make project id responsive
    axios.post(`/api/project/`, project).then((res) => {
      console.log(res);
      // create copy of project labels from context
      // and update that context with new label from response
      //   const projectCopy = Array.from(context[12].projectLabels);
      //   labelsCopy.push(res.data);
      //   context[13]({ ...context[13], projectLabels: labelsCopy });
      //   // reset state
      setProject(initialState);
    });
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

        <div className="flex-column" style={{width: '100%'}}>
        <Input
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
          style={{margin: '6px', width: '80%'}}
            placeholder="Team"
            search
            selection
            options={[]}
            onChange={(e, data) => {
              setProject({ ...project, id_team: '1' });
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
            hideModal();
          }}
        >
          Save
        </button>
      </div>
    </Rodal>
  );
}
