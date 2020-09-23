import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Homeview from './components/Homeview';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import AddColumn from './components/AddColumn';
import Login from './components/Login';
import TaskModal from './components/modals/TaskModal';
import LabelModal from './components/modals/LabelModal';
import ProjectModal from './components/modals/ProjectModal';
import InviteModal from './components/modals/InviteModal';
import { AutoProvider } from './AutoContext';
import './styles/style.css';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient();

export const initialUserState = {
  signedIn: false,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  team: null,
  id_user: '',
  teams: [],
  projects: [],
  invites: [],
}

function App() {
  const [user, setUser] = useState(initialUserState);
  const [tasks, setTasks] = useState(null);
  const [labels, setLabels] = useState({
    projectLabels: [],
    // get both project labels and default labels and add to context state
    getLabels: () => {
      axios.get(`/api/label/?proj=${view.project}`).then((res) => {
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
    type: 'home',
    project: null,
  });

  const [modal, setModal] = useState({
    show: false,
    showLabel: false,
    showProject: false,
    showInvite: false,
    column: null,
    card: null,
    edit: 0,
    labelName: '',
  });

  useEffect(() => {
    if (user.signedIn && view.type === 'project') {
      // get columns for project
      axios.get(`/api/columns/?proj=${view.project}`).then((res) => {
        setColumns(res.data);
      });
      // listen for column updates, on update refresh column state
      socket.on(`newColumn${view.project}`, (data) => {
        axios
          .get(`/api/columns/?proj=${view.project}`)
          .then((res) => {
            setColumns(res.data);
          });
      });
      // listen for a column delete, set column state to new columns
      socket.on(`columnDelete${view.project}`, (data) => {
        setColumns(data);
      });
      // get tasks for project
      axios.get(`/api/task/get/all/${view.project}`).then((tasks) => {
        setTasks(tasks.data);
      });
      // listen for task updates, on update refresh task state
      socket.on(`newTask${view.project}`, (data) => {
        axios
          .get(`/api/task/get/all/${view.project}`)
          .then((tasks) => {
            setTasks(tasks.data);
          });
      });
      // get labels for project
      // adjust to collect labels using function in label state
      axios.get(`/api/label/?proj=${view.project}`).then((res) => {
        const projLabels = [];
        res.data.forEach((label) => projLabels.push(label));
        axios.get(`/api/label/default`).then((res) => {
          res.data.forEach((label) => projLabels.push(label));
          setLabels({ ...labels, projectLabels: projLabels });
        });
      });
      // listen for label updates, on update refresh label state
      socket.on(`newLabel${view.project}`, (data) => {
        axios.get(`/api/label/?proj=${view.project}`).then((res) => {
          const projLabels = [];
          res.data.forEach((label) => projLabels.push(label));
          axios.get(`/api/label/default`).then((res) => {
            res.data.forEach((label) => projLabels.push(label));
            setLabels({ ...labels, projectLabels: projLabels });
          });
        });
      });
    }
  }, [view.type]);

  useEffect(() => {
    if (user.id_user) {
      axios.get(`/api/team/all/${user.id_user}`).then((response) => {
        axios.get(`/api/project/all/${user.id_user}`).then((res) => {
          axios
            .get(`/api/team/invite/${user.id_user}`)
            .then((invite) => {
              if (
                Array.isArray(res.data) &&
                Array.isArray(response.data)
              ) {
                console.log('teams and projects');
                setUser({
                  ...user,
                  teams: response.data,
                  projects: res.data,
                  invites: invite.data,
                });
              } else if (Array.isArray(response.data)) {
                console.log(res.data);
                setUser({
                  ...user,
                  teams: response.data,
                  invites: invite.data,
                });
              }
            });
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
        {modal.show && <TaskModal />}
        {modal.showLabel && <LabelModal />}
        {modal.showProject && <ProjectModal />}
        {modal.showInvite && <InviteModal />}
        <Navbar />
        {!user.signedIn ? (
          <Login />
        ) : view.type === 'home' ? (
          <Homeview />
        ) : (
          <ProjectView>
            {/* if toggle is set to project view
            {!drawer.timeline ? (
              <> */}
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
            <AddColumn columns={columns} setcolumns={setColumns} />
            {/* </>
            ) : (
              <Timeline />
            )} */}
          </ProjectView>
        )}
        <OptionsDrawer />
      </div>
    </AutoProvider>
  );
}

export default App;
