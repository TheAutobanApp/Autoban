import React from 'react';
import Navbar from './components/Navbar';
import Column from './components/Column';
import ProjectView from './components/ProjectView';

function App() {
  return (
    <>
      <Navbar />
      <ProjectView>
        <Column title="MVP">
          <div>test</div>
          <div>test</div>
        </Column>
        <Column title="In Progress"/>
      </ProjectView>
    </>
  );
}

export default App;
