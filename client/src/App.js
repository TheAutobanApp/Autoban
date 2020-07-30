import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import './styles/style.css';

function App() {
  const [drawer, setDrawer] = useState({
    open: false,
  });

  const dummy = [
    {
      title: 'Task Title',
      id: 0,
      column: 0,
      description:
        'What is the description of this task? What is your exit criteria?',
    },
    {
      title: 'Task Title 2',
      id: 1,
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
    },
    {
      title: 'Task Title 2',
      id: 1,
      column: 1,
      description:
        'What is the description of this task? What is your strategy?',
    },
  ];

  return (
    <div style={{height: '100vh'}}>
      <Navbar drawer={drawer} setdrawer={setDrawer} />
      <ProjectView>
        <Column title="Would Be Nice">
          {dummy.map(
            (item) =>
              item.column === 0 && (
                <CardComponent
                  title={item.title}
                  description={item.description}
                />
              ),
          )}
        </Column>
        <Column title="MVP">
          {dummy.map(
            (item) =>
              item.column === 1 && (
                <CardComponent
                  title={item.title}
                  description={item.description}
                />
              ),
          )}
        </Column>
        <Column title="In Progress"></Column>

      <OptionsDrawer drawer={drawer} />
      </ProjectView>
    </div>
  );
}

export default App;
