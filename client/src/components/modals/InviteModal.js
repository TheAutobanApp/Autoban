import React, { useContext } from 'react';
import { AutoContext } from '../../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { List, Icon, Button } from 'semantic-ui-react';
import ModalButton from '../ModalButton';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

// inital state for reseting state

export default function InviteModal(props) {
  const context = useContext(AutoContext);

  const modalStyle = {
    height: 'fit-content',
    width: '370px',
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
        removeInvite(id);
      });
  };

  return (
    <Rodal
      visible={context[4].showInvite}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div className="invite-modal">
        <Icon name="users" size="large" /><h5 style={{margin: 2}}>Team Invites</h5>
        <List celled className="invite-list">
          {context[8].invites.length === 0 ? (
            <List.Item style={{ textAlign: 'center' }}>
              No Invites
            </List.Item>
          ) : (
            context[8].invites.map((invite, index) => {
              return (
                <List.Item className="invite-item" key={index}>
                  <List.Content className="invite-content">
                    <List.Header>{invite.team}</List.Header>
                    Invited by {invite.inviter}
                  </List.Content>
                  <div className="invite-buttons">
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
        <ModalButton
          class={true}
          onclick={() => {
            hideModal();
          }}
        >
          Close
        </ModalButton>
      </div>
    </Rodal>
  );
}
