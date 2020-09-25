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
    name: '',
  });
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

  return (
    <Rodal
      visible={context[4].showSearch}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div className="invite-modal">
        {selectedUser.selected ? (
          <List>
            <List.Item>
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
              />
              <List.Content>
                <List.Header as="a">{selectedUser.name}</List.Header>
                <List.Description>
                  {selectedUser.username}
                </List.Description>
              </List.Content>
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
                username: data.result.description,
                name: data.result.title,
              })
            }
            results={users.map((user) => {
              return {
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
        <button
          className="saveButton"
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
