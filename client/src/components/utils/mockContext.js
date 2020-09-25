import React, { useState } from 'react';
import { AutoProvider } from '../../AutoContext';

export const initialUserState = {
    signedIn: true,
    username: 'testy',
    firstName: 'Testy',
    lastName: 'Tester',
    email: 'test@gmail.com',
    team: null,
    id_user: '1',
    avatar: '',
    teams: [],
    projects: [],
    invites: [
      {
        id: 117,
        id_team: 9,
        id_inviter: 2,
        team: 'Test',
        inviter: 'Testy',
      },
      {
        id: 117,
        id_team: 9,
        id_inviter: 2,
        team: 'Test',
        inviter: 'Testy',
      },
    ],
  };

export default function Mock (props) {
    const [user, setUser] = useState(initialUserState);
    const [tasks, setTasks] = useState(null);
    const [labels, setLabels] = useState({
      projectLabels: [],
      // get both project labels and default labels and add to context state
      getLabels: (projId) => {
        axios.get(`/api/label/?proj=${projId}`).then((res) => {
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
      showSearch: false,
      column: null,
      card: null,
      edit: 0,
      labelName: '',
    });
  
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
        <props.component />
      </AutoProvider>
    );
  };