import React, { useContext } from 'react';
import { AutoContext } from '../AutoContext';
import SettingsDrawerView from './drawerviews/SettingsDrawerView';
import CardDrawerView from './drawerviews/CardDrawerView';
import ColumnDrawerView from './drawerviews/ColumnDrawerView';
import Fade from 'react-reveal/Fade';

export default function OptionsDrawer(props) {
  const context = useContext(AutoContext);

  const drawerStyle = {
    width: '250px',
    height: '100%',
    backgroundColor: 'whitesmoke',
    boxShadow: '4px 8px 16px gray',
    position: 'fixed',
    right: 0,
    top: 50,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
  };

  return (
    <Fade right when={context[0].open} collapse duration={400}>
      <div style={drawerStyle}>
        {context[0].type === 'settings' ? (
          <SettingsDrawerView />
        ) : context[0].type === 'card' ? (
          <CardDrawerView />
        ) : (
          <ColumnDrawerView />
        )}
      </div>
    </Fade>
  );
}
