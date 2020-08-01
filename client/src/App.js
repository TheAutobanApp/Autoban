import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import AddColumn from './components/AddColumn';
import './styles/style.css';

function App() {
  const [drawer, setDrawer] = useState({
    open: false,
    timeline: false,
  });
  const [columns, setColumns] = useState([
    'Would Be Nice',
    'MVP',
    'In Progress',
  ]);

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
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
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
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
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
    <div style={{ height: '100vh' }}>
      <Navbar drawer={drawer} setdrawer={setDrawer} />
      <ProjectView>
        {/* if toggle is set to project view */}
        {!drawer.timeline ? (
          <>
            {/* map through columns array and render each column with the title */}
            {columns.map((item, i) => {
              return (
                <Column title={item}>
                  {/* inside each column, map through the cards and render each one that matches the column index */}
                  {dummy.map(
                    (card) =>
                      card.column === i && (
                        <CardComponent
                          title={card.title}
                          description={card.description}
                          key={card.id}
                        />
                      ),
                  )}
                </Column>
              );
            })}
            <AddColumn columns={columns} setcolumns={setColumns}/>
          </>
        ) : (
          <p>Timeline View</p>
        )}
        <OptionsDrawer drawer={drawer} />
      </ProjectView>
    </div>
  );
}

export default App;
