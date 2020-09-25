import React, { useContext } from 'react';
import Rodal from 'rodal';
import { AutoContext } from '../../AutoContext';
import 'rodal/lib/rodal.css';
import { List, Button, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';

export default function InviteSearchModal(props) {
  const context = useContext(AutoContext);

  const modalStyle = {
    height: 'fit-content',
    width: '370px',
    backgroundColor: 'whitesmoke',
  };

  // hide modal, reset state and modal context
  const hideModal = () => {
    context[5]({ ...context[4], showSearch: false });
  };

  return (
    <Rodal
      visible={context[4].showSearch}
      onClose={hideModal}
      customStyles={modalStyle}
    >
      <div className="invite-modal">
        <Input placholder="Search" />
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
