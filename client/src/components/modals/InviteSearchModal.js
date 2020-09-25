import React, { useContext, useState } from 'react';
import Rodal from 'rodal';
import { AutoContext } from '../../AutoContext';
import 'rodal/lib/rodal.css';
import { List, Button, Icon, Image, Search } from 'semantic-ui-react';
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
  const [selectedUser, setSelectedUser] = useState({
    selected: false,
    username: '',
    id_user: '',
    name: '',
  });

  const initialState = {
    selected: false,
    username: '',
    id_user: '',
    name: '',
  };
  // hide modal, reset state and modal context
  const hideModal = () => {
    context[5]({ ...context[4], showSearch: false });
  };

  const searchUser = (searchTxt) => {
    if (searchTxt.length > 1) {
      axios
        .get(`/api/user/search/?search=${searchTxt}`)
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
        team: context[8].team,
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
        {selectedUser.selected ? (
          <List
            className="invite-list"
            style={{ backgroundColor: 'white' }}
          >
            <List.Item className="invite-item">
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
              />
              <List.Content>
                {/* <div style={{ display: 'flex' }}> */}
                <List.Header as="a">{selectedUser.name}</List.Header>
                {/* </div> */}
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
            placeholder="Search"
            value={search}
            onResultSelect={(e, data) =>
              setSelectedUser({
                ...selectedUser,
                selected: true,
                id_user: data.result.id,
                username: data.result.description,
                name: data.result.title,
              })
            }
            results={users.map((user) => {
              return {
                id: user.id_user,
                title: `${user.first_name} ${user.last_name}`,
                description: user.username,
              };
            })}
            onSearchChange={(e) => {
              setSearch(e.target.value);
              searchUser(e.target.value);
            }}
          />
        )}
        <Button
          className={selectedUser.selected && 'saveButton'}
          style={{ width: '90%', marginTop: 10 }}
          onClick={() => {
            sendInvite();
          }}
          disabled={!selectedUser.selected}
        >
          {selectedUser.selected
            ? `Add ${selectedUser.username} to team`
            : `Select user above`}
        </Button>
      </div>
    </Rodal>
  );
}
