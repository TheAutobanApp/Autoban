import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import AddColumn from './components/AddColumn';
import Timeline from './components/Timeline';
import { AutoProvider } from './AutoContext';
import './styles/style.css';

function App() {
  const [drawer, setDrawer] = useState({
    open: false,
    timeline: false,
    type: 'settings',
    edit: 0,
  });

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get(`/api/columns/${1}`).then((res) => {
      console.log(res.data);
      setColumns(res.data);
    })
    // axios.get(`/api/columns/${1}`)
  }, [])

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
      id: 3,
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
    },
    {
      title: 'Task Title 2',
      id: 4,
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
    },
    {
      title: 'Task Title 2',
      id: 5,
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
    },
    {
      title: 'Task Title 2',
      id: 6,
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
    },
    {
      title: 'Task Title 2',
      id: 7,
      column: 1,
      description:
        'What is the description of this task? What is your strategy?',
    },
  ];

  return (
    <AutoProvider value={[drawer, setDrawer, columns, setColumns]}>
      <div style={{ height: '100vh' }}>
        <Navbar />
        <ProjectView>
          {/* if toggle is set to project view */}
          {!drawer.timeline ? (
            <>
              {/* map through columns array and render each column with the title */}
              {columns.map((item, i) => {
                return (
                  <Column title={item.column_name} key={i} id={i}>
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
              <AddColumn columns={columns} setcolumns={setColumns} />
            </>
          ) : (
            <Timeline />
          )}
          <OptionsDrawer />
        </ProjectView>
      </div>
    </AutoProvider>
  );
}

export default App;
