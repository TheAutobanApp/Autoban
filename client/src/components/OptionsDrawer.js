import React, { useContext, useEffect } from 'react';
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

  const closeClick = (e) => {
    if (
      !e.path.some(
        (el) =>
          el.id === 'drawer' ||
          el.id === 'settings' ||
          el.id === 'label-modal',
      )
    ) {
      context[1]({ ...context[0], open: false });
    }
  };

  useEffect(() => {
    if (context[0].open) {
      document.addEventListener('mousedown', closeClick);

      return () => {
        document.removeEventListener('mousedown', closeClick);
      };
    }
  }, [context[0].open]);

  return (
    <Fade right when={context[0].open} collapse duration={400}>
      <div style={drawerStyle} id="drawer">
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
