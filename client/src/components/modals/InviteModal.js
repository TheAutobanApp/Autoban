import React, { useState, useContext, useEffect } from 'react';
import { AutoContext } from '../../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { List, Button } from 'semantic-ui-react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

// inital state for reseting state

export default function InviteModal(props) {
  const context = useContext(AutoContext);
  const initialState = {
    id_team: context[8].team,
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
    context[5]({ ...context[4], showInvite: false });
    setProject(initialState);
  };

  const handleAccept = () => {
    console.log('accept invite');
  };

  const handleReject = () => {
    console.log('reject invite');
  };

  return (
    <Rodal
      visible={context[4].showInvite}
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
        <h5>Team Invites</h5>

        <List celled style={{ width: '90%', border: '1px solid lightgrey', borderRadius: '4px'}}>
          {context[8].invites.map((invite) => {
            return (
              <List.Item
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}
              >
                <List.Content>
                  <List.Header>Test Team</List.Header>
                  Invited by tanx
                </List.Content>
                <div>
                  <Button
                    compact
                    color="green"
                    size="mini"
                    icon="check"
                    onClick={handleAccept}
                  />
                  <Button
                    compact
                    color="red"
                    size="mini"
                    icon="x"
                    onClick={handleReject}
                  />
                </div>
              </List.Item>
            );
          })}
        </List>
        <button
          style={saveButton}
          onClick={() => {
            hideModal();
          }}
        >
          Close
        </button>
      </div>
    </Rodal>
  );
}
