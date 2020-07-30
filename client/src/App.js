import React from 'react';
import Navbar from './components/Navbar';
import Column from './components/Column';
import ProjectView from './components/ProjectView';
import './styles/style.css'

function App() {
  return (
    <>
      <Navbar />
      <ProjectView>
        <Column title="Would Be Nice">
        </Column>
        <Column title="MVP">
        </Column>
        <Column title="In Progress">
        </Column>
      </ProjectView>
    </>
  );
}

export default App;
