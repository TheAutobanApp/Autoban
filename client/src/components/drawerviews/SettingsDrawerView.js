import { MdClose } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { Input, Dropdown, Label } from 'semantic-ui-react';
import React, { useContext, useState, useEffect } from 'react';
import { AutoContext } from '../../AutoContext';

export default function SettingsDrawerView(props) {
  const closeButton = {
    margin: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 5,
    width: 150,
    color: 'red',
    border: '1px solid gray',
    boxShadow: '2px 3px 8px lightgray',
    position: 'absolute',
    bottom: 50,
  };

  const changeBGButton = {
    borderRadius: 5,
    color: 'white',
    border: '1px solid lightgray',
    marginLeft: 3,
    background:
      'linear-gradient(to bottom, var(--nav-color), var(--nav-color2))',
  };

  const linebreak = {
    margin: 20,
    borderBottom: '1px solid lightgray',
  };

  const rowFormat = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  };
  const [project, setProject] = useState({
    description: '',
    name: '',
  });

  const context = useContext(AutoContext);

  useEffect(() => {
    context[8].projects.filter((proj, index) => {
      if (proj.id_project === context[10].project) {
        setProject({
          ...project,
          name: proj.project_name,
          description: proj.project_description,
        });
      }
    });
  }, [context[10].project]);

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 5,
          padding: 3,
        }}
      >
        <p>Settings</p>
        <MdClose
          size="1.5em"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            context[1]({ ...context[0], open: false });
          }}
        />
      </div>
      {/* title */}
      <h5 style={{ alignSelf: 'center' }}>{project.name}</h5>
      {/* description */}

      <div style={{ padding: 5, textAlign: 'center' }}>
        <p style={{ color: 'gray' }}>{project.description}</p>{' '}
        {/* <input
          defaultValue="https://autobanprod.herokuapp.com/autobanproj"
          style={{
            border: '1px solid lightgray',
            borderRadius: 10,
          }}
        /> */}
        {/* <span style={{ fontSize: 10, color: 'lightgray' }}>
          project url
        </span> */}
      </div>

      {/* <div style={linebreak}></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span>
          <img
            style={{ width: 30, height: 30, borderRadius: 5 }}
            src="https://starwarsblog.starwars.com/wp-content/uploads/2019/08/d23-the-mandalorian-poster-tall-A-1088x816.jpg"
            alt="background"
          />{' '}
        </span>{' '}
        <button style={changeBGButton}>Change Background</button>
      </div> */}

      <div style={linebreak}></div>

      <div style={rowFormat}>
        {context[12].projectLabels !== null &&
          context[12].projectLabels.map((item, i) => {
            return (
              <Label
                // size="mini"
                color={item.color}
                circular
                id={item.id_label}
                key={i}
                style={{ margin: 2 }}
              >
                {item.label_name}
              </Label>
            );
          })}
        <p
          style={{ color: 'gray', fontSize: 12 }}
          onClick={() =>
            context[5]({
              ...context[4],
              showLabel: !context[4].showLabel,
            })
          }
          className="clickable"
        >
          Add Labels
          <span>
            <FaPlus />
          </span>
        </p>
      </div>

      <div style={linebreak}></div>
      {/* <div style={rowFormat}>
        <span>
          <GrHistory /> archived
        </span>
        <button style={closeButton}>Close Project</button>
      </div> */}
    </>
  );
}
