import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, Icon } from 'semantic-ui-react';

const options = [
  { key: 100, text: '100', value: 100 },
  { key: 200, text: '200', value: 200 },
  { key: 300, text: '300', value: 300 },
  { key: 400, text: '400', value: 400 },
];

export default function SearchUser() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get('/api/user/all').then((res) => {
      setOptions(
        res.data.map((user) => {
          return {
            key: user.username,
            text: user.username,
            value: user.id_user,
            email: user.email,
            onClick: handleAddUser,
            // image: {
            //   avatar: true,
            //   src:
            //     'https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png',
            // },
          };
        }),
      );
    });
  }, []);

  const handleAddUser = (e, data) => {
      console.log('user added', data.value)
  }

  return (
    <Dropdown
      scrolling
      fluid
      fitted
      size="mini"
      search
      selection
      value={null}
      options={options}
      placeholder="Select amount..."
    />
  );
}
