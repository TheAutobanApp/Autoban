import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { AutoContext } from '../../AutoContext';

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
    <Fade right when={context[0].open} collapse duration={400}>
      <div style={drawerStyle}>Column Edit</div>
    </Fade>
  );
}
