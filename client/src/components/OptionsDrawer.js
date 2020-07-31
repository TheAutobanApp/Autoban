import React, { useContext } from 'react';
import { AutoContext } from '../AutoContext';
import SettingsDrawerView from './drawerviews/SettingsDrawerView';
import CardDrawerView from './drawerviews/CardDrawerView';
import ColumnDrawerView from './drawerviews/ColumnDrawerView';

export default function OptionsDrawer(props) {
  const context = useContext(AutoContext);

  return (
    <>
      {context[0].type === 'settings' ? (
        <SettingsDrawerView />
      ) : context[0].type === 'card' ? (
        <CardDrawerView />
      ) : (
        <ColumnDrawerView />
      )}
    </>
  );
}
