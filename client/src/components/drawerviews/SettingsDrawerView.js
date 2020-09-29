import { MdClose } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { Label } from 'semantic-ui-react';
import React, { useContext, useState, useEffect } from 'react';
import { AutoContext } from '../../AutoContext';

export default function SettingsDrawerView(props) {
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
    <div className="flex-column">
      <div className="drawer-header">
        <p>Settings</p>
        <MdClose
          size="1.5em"
          className="clickable"
          onClick={() => {
            context[1]({ ...context[0], open: false });
          }}
        />
      </div>
      {/* title */}
      <h5>{project.name}</h5>
      {/* description */}

      <div className="drawer-description">
        <p>{project.description}</p>{' '}
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
      <div className="linebreak"></div>
      <div className="flex-column label-column">
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
          // style={{ color: 'gray', fontSize: 12 }}
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
            <FaPlus size={10} style={{ margin: '0 0 3px 3px' }} />
          </span>
        </p>
      </div>

      <div className="linebreak"></div>
      {/* <div style={rowFormat}>
        <span>
          <GrHistory /> archived
        </span>
        <button style={closeButton}>Close Project</button>
      </div> */}
    </div>
  );
}
