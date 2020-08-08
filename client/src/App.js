import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Homeview from './components/Homeview';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import AddColumn from './components/AddColumn';
import Timeline from './components/Timeline';
import Login from './components/Login';
import TaskModal from './components/modals/TaskModal';
import LabelModal from './components/modals/LabelModal';
import ProjectModal from './components/modals/ProjectModal';
import { AutoProvider } from './AutoContext';
import './styles/style.css';

import socketIOClient from 'socket.io-client';

const socket = socketIOClient();

function App() {
  const [user, setUser] = useState({
    signedIn: false,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    team: null,
    id_user: '',
    teams: [],
    projects: [],
  });

  const [tasks, setTasks] = useState(null);
  const [labels, setLabels] = useState({
    projectLabels: [],
    // get both project labels and default labels and add to context state
    getLabels: () => {
      // make project id responsive
      axios.get(`/api/label/?proj=${1}`).then((res) => {
        const projLabels = [];
        res.data.forEach((label) => projLabels.push(label));
        axios.get(`/api/label/default`).then((res) => {
          res.data.forEach((label) => projLabels.push(label));
          setLabels({ ...labels, projectLabels: projLabels });
        });
      });
    },
  });

  const [drawer, setDrawer] = useState({
    open: false,
    timeline: false,
    type: 'settings',
    edit: 0,
  });

  const [columns, setColumns] = useState([]);

  const [view, setView] = useState({
    type: 'project',
  });

  const [modal, setModal] = useState({
    show: false,
    column: null,
    card: null,
    edit: 0,
    showLabel: false,
    labelName: '',
    showProject: false,
  });

  useEffect(() => {
    if (user.signedIn && view.type === 'project') {
      // make project id responsive
      axios.get(`/api/columns/?proj=${1}`).then((res) => {
        setColumns(res.data);
      });
      socket.on('newColumn', (data) => {
        axios.get(`/api/columns/?proj=${1}`).then((res) => {
          setColumns(res.data);
        });
      });
      axios.get('/api/task/get/all/1').then((tasks) => {
        setTasks(tasks.data);
      });
      socket.on('newTask', (data) => {
        axios.get('/api/task/get/all/1').then((tasks) => {
          setTasks(tasks.data);
        });
      });
      console.log(user.id_user);
      axios
        .get(`/api/team/all/${user.id_user}`)
        .then((response) => console.log(response));

      labels.getLabels();
      socket.on('newLabel', (data) => {
        labels.getLabels();
      });
    }
  }, [user.signedIn]);

  useEffect(() => {
    if (user.id_user) {
      axios.get(`/api/team/all/${user.id_user}`).then((response) => {
        axios.get(`/api/project/all/${user.id_user}`).then((res) => {
          setUser({
            ...user,
            teams: response.data,
            projects: res.data,
          });
          // console.log(res);
        });
      });
    }
  }, [user.id_user]);

  return (
    <AutoProvider
      value={[
        drawer,
        setDrawer,
        columns,
        setColumns,
        modal,
        setModal,
        tasks,
        setTasks,
        user,
        setUser,
        view,
        setView,
        labels,
        setLabels,
      ]}
    >
      <div style={{ height: '100vh' }}>
        <TaskModal />
        {modal.showLabel && <LabelModal />}
        {modal.showProject && <ProjectModal />}
        <Navbar />
        {!user.signedIn ? (
          <Login />
        ) : view.type === 'home' ? (
          <Homeview />
        ) : (
          <ProjectView>
            {/* if toggle is set to project view */}
            {!drawer.timeline ? (
              <>
                {/* map through columns array and render each column with the title */}
                {columns.map((item, i) => {
                  return (
                    <Column title={item.column_name} key={i} id={i}>
                      {/* inside each column, map through the cards and render each one that matches the column index */}
                      {tasks !== null &&
                        tasks.map(
                          (card) =>
                            card.id_column === i && (
                              <CardComponent
                                id={card.id_task}
                                title={card.task_title}
                                description={card.task_description}
                                key={card.id_task}
                              />
                            ),
                        )}
                    </Column>
                  );
                })}
                <AddColumn
                  columns={columns}
                  setcolumns={setColumns}
                />
              </>
            ) : (
              <Timeline />
            )}
          </ProjectView>
        )}
        <OptionsDrawer />
      </div>
    </AutoProvider>
  );
}

export default App;
