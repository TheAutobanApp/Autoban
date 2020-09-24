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
    width: '350px',
    backgroundColor: 'whitesmoke',
  };

  // hide modal, reset state and modal context
  const hideModal = () => {
    context[5]({ ...context[4], showInvite: false });
  };

  const removeInvite = (id) => {
    const newInvites = Array.from(context[8].invites);
    newInvites.splice(
      newInvites.findIndex((invite) => invite.id === id),
      1,
    );
    context[9]({ ...context[8], invites: newInvites });
  };

  const handleAccept = (team, id) => {
    axios
      .put('/api/team/invite', {
        id_team: team,
        id_user: context[8].id_user,
      })
      .then((res) => {
        console.log('success', res);
        console.log(id);
        removeInvite(id);
      });
  };

  const handleReject = (id) => {
    axios
      .delete(
        `/api/team/invite/?id=${id}&id_user=${context[8].id_user}`,
      )
      .then((res) => {
        console.log('success', res);
        console.log(id);
        removeInvite(id);
      });
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

        <List
          celled
          style={{
            width: '90%',
            border: '1px solid lightgrey',
            borderRadius: '4px',
          }}
        >
          {context[8].invites.length === 0 ? (
            <List.Item style={{ textAlign: 'center' }}>
              No Invites
            </List.Item>
          ) : (
            context[8].invites.map((invite) => {
              return (
                <List.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <List.Content>
                    <List.Header>{invite.team}</List.Header>
                    Invited by {invite.inviter}
                  </List.Content>
                  <div style={{ position: 'absolute', right: 35 }}>
                    <Button
                      compact
                      color="green"
                      size="mini"
                      icon="check"
                      onClick={() =>
                        handleAccept(invite.id_team, invite.id)
                      }
                    />
                    <Button
                      compact
                      color="red"
                      size="mini"
                      icon="x"
                      onClick={() => handleReject(invite.id)}
                    />
                  </div>
                </List.Item>
              );
            })
          )}
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
