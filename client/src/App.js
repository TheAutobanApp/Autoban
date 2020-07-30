import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import './styles/style.css'

function App() {
  const [drawer, setDrawer] = useState({
    open: false,
  });

  return (
    <div>
      <Navbar drawer={drawer} setdrawer={setDrawer} />
      <OptionsDrawer drawer={drawer} />
      <ProjectView>
        <Column title="Would Be Nice">
          <CardComponent/>
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
