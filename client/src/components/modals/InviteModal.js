import React, { useContext } from 'react';
import { AutoContext } from '../../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { List, Button } from 'semantic-ui-react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

// inital state for reseting state

export default function InviteModal(props) {
  const context = useContext(AutoContext);

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
    context[5]({ ...context[4], showInvite: false });
  };

  const handleAccept = (team, user) => {
    axios.put('/api/team/invite', { id_team: team, id_user: user }).then((res) => {
        console.log('success', res);
    })
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
                  <List.Header>{invite.team}</List.Header>
                  Invited by {invite.inviter}
                </List.Content>
                <div>
                  <Button
                    compact
                    color="green"
                    size="mini"
                    icon="check"
                    onClick={() => handleAccept(invite.id_team, invite.id_user)}
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
