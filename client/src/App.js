import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Column from './components/Column';

function App() {
  const [drawer, setDrawer] = useState({
    open: false,
  });

  return (
    <div>
      <Navbar drawer={drawer} setdrawer={setDrawer} />;
      <OptionsDrawer drawer={drawer} />
      <ProjectView>
        <Column title="Would Be Nice">
        </Column>
        <Column title="MVP">
        </Column>
        <Column title="In Progress">
        </Column>
      </ProjectView>
    </div>
  );
}

export default App;
