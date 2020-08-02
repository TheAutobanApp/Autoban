import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import AddColumn from './components/AddColumn';
import Timeline from './components/Timeline';
import TaskModal from './components/TaskModal';
import { AutoProvider } from './AutoContext';
import './styles/style.css';

function App() {
  const [tasks, setTasks] = useState(null);

  const [drawer, setDrawer] = useState({
    open: false,
    timeline: false,
    type: 'settings',
    edit: 0,
  });

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get(`/api/columns/?proj=${1}`).then((res) => {
      console.log(res.data);
      setColumns(res.data);
    });
    axios.get('/api/task/get/all/1').then((tasks) => {
      setTasks(tasks.data);
    });
  }, []);

  const [modal, setModal] = useState({
    show: false,
    column: null,
  });

  return (
    <AutoProvider
      value={[
        drawer,
        setDrawer,
        columns,
        setColumns,
        modal,
        setModal,
        tasks,
        setTasks,
      ]}
    >
      <div style={{ height: '100vh' }}>
        {modal.show && <TaskModal />}

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
                    {tasks !== null &&
                      tasks.map(
                        (card) =>
                          card.id_column === i && (
                            <CardComponent
                              id={card.id_task}
                              title={card.task_title}
                              description={card.task_description}
                              key={card.id_task}
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
