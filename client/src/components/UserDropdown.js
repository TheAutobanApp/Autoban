import React, { useContext } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';
import firebase from '../Firebase';

export default function UserDropdown() {
  const context = useContext(AutoContext);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        context[9](false);
      });
  };

  const handleAccount = () => {
    console.log('Account View');
  };

  return (
    <>
      {/* user dropdown */}
      <Dropdown
        trigger={<Button icon="user" inverted compact basic />}
        options={[
          {
            key: 'user',
            text: (
              <span>
                Signed in as <strong>{'tanx'}</strong>
              </span>
            ),
            disabled: true,
          },
          {
            key: 'account',
            text: 'Account',
            icon: 'user',
            onClick: handleAccount,
          },
          {
            key: 'sign-out',
            text: 'Sign Out',
            icon: 'sign out',
            onClick: handleSignOut,
          },
        ]}
        pointing="top left"
        icon={null}
      />
    </>
  );
}
