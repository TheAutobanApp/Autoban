import React, { useContext } from 'react';
import { AutoContext } from '../AutoContext';
import SettingsDrawerView from './drawerviews/SettingsDrawerView';

export default function OptionsDrawer(props) {
  const context = useContext(AutoContext);

  return <SettingsDrawerView />;
}
