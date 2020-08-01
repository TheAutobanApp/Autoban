import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { AutoContext } from '../../AutoContext';
import { MdClose } from 'react-icons/md';

export default function ColumnDrawerView(props) {
  const context = useContext(AutoContext);

  const drawerStyle = {
    width: '250px',
    height: '100%',
    backgroundColor: 'whitesmoke',
    boxShadow: '4px 8px 16px gray',
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 3,
      }}
    >
      <p>Card Edit</p>
      <MdClose
        size="1.5em"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          context[1]({ ...context[0], open: false });
        }}
      />
    </div>
  );
}
