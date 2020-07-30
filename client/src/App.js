import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';

function App() {
  const [drawer, setDrawer] = useState({
    open: false,
  });

  return (
    <div>
      <Navbar drawer={drawer} setdrawer={setDrawer} />;
      <OptionsDrawer drawer={drawer} />
    </div>
  );
}

export default App;
