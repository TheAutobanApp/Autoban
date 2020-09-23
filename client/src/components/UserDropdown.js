import React, { useContext } from 'react';
import { Button, Dropdown, Label } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';
import { initialUserState } from '../App';
import firebase from '../Firebase';

export default function UserDropdown() {
  const context = useContext(AutoContext);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        context[9](initialUserState);
      });
  };

  const handleAccount = () => {
    console.log('Account View');
  };

  const handleInvites = () => {
    console.log('Invites View');
  };

  return (
    <>
      {/* user dropdown */}
      <Dropdown
        trigger={
          <div>
            <Button icon="user" inverted compact basic></Button>
            {context[8].invites.length > 0 && (
              <Label
                color="red"
                floating
                empty
                circular
                className="invite-label"
              />
            )}
          </div>
        }
        options={[
          {
            key: 'user',
            text: (
              <span>
                Signed in as <strong>{context[8].username}</strong>
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
            key: 'invites',
            text: `Invites (${context[8].invites.length})`,
            icon: 'user plus',
            onClick: handleInvites,
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
