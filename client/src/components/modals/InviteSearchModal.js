import React, { useContext, useState } from 'react';
import Rodal from 'rodal';
import { AutoContext } from '../../AutoContext';
import 'rodal/lib/rodal.css';
import { List, Icon, Image, Search } from 'semantic-ui-react';
import ModalButton from '../ModalButton';
import axios from 'axios';

export default function InviteSearchModal(props) {
  const context = useContext(AutoContext);

  const modalStyle = {
    height: 'fit-content',
    width: '370px',
    backgroundColor: 'whitesmoke',
  };

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const initialState = {
    selected: false,
    username: '',
    id_user: '',
    name: '',
  };
  const [selectedUser, setSelectedUser] = useState(initialState);

  // hide modal, reset state and modal context
  const hideModal = () => {
    context[5]({ ...context[4], showSearch: false });
  };

  const searchUser = (searchTxt) => {
    if (searchTxt.length > 1) {
      axios
        .get(
          `/api/user/search/?search=${searchTxt}&id_team=${context[8].team.id_team}`,
        )
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        });
    }
  };

  const sendInvite = () => {
    axios
      .post('/api/team/invite', {
        inviter: context[8].id_user,
        invitee: selectedUser.id_user,
        team: context[8].team.id_team,
      })
      .then((response) => {
        console.log(response.data);

        hideModal();
      });
  };

  return (
    <Rodal
      visible={context[4].showSearch}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div className="invite-modal">
        <Icon name="users" size="large" />
        <h5 style={{ margin: 2 }}>Invite Collaborator</h5>
        {selectedUser.selected ? (
          <List className="invite-list">
            <List.Item className="invite-item">
              <Image avatar src={selectedUser.avatar ? selectedUser.avatar : '/default.png'} />
              <List.Content>
                <List.Header>{selectedUser.name}</List.Header>
                <List.Description>
                  {selectedUser.username}
                </List.Description>
              </List.Content>
              <Icon
                className="invite-buttons"
                name="x"
                color="grey"
                onClick={() => {
                  setSearch('');
                  setSelectedUser(initialState);
                }}
              />
            </List.Item>
          </List>
        ) : (
          <Search
            minCharacters={2}
            fluid
            placeholder="Search"
            value={search}
            onResultSelect={(e, data) =>
              setSelectedUser({
                ...selectedUser,
                selected: true,
                id_user: data.result.id,
                username: data.result.description,
                name: data.result.title,
                avatar: data.result.image,
              })
            }
            results={users.map((user) => {
              return {
                id: user.id_user,
                title: `${user.first_name} ${user.last_name}`,
                description: user.username,
                image: user.avatar ? user.avatar : '/default.png',
              };
            })}
            onSearchChange={(e) => {
              setSearch(e.target.value);
              searchUser(e.target.value);
            }}
          />
        )}
        <ModalButton
          style={{ width: '90%', marginTop: 10 }}
          onclick={() => {
            sendInvite();
          }}
          disabled={!selectedUser.selected}
        >
          {selectedUser.selected
            ? `Add ${selectedUser.username} to team`
            : `Select user above`}
        </ModalButton>
      </div>
    </Rodal>
  );
}
