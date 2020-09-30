import { MdClose } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { Label, Input, TextArea } from 'semantic-ui-react';
import React, { useContext, useState, useEffect } from 'react';
import { AutoContext } from '../../AutoContext';
import axios from 'axios';

export default function SettingsDrawerView(props) {
  const [project, setProject] = useState({
    description: '',
    name: '',
  });
  const [name, setName] = useState({
    name: '',
    setting: false,
  });
  const [description, setDescription] = useState({
    description: '',
    setting: false,
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

  const updateProject = (value, type) => {
    if (type === 'name') {
      axios
        .put('api/project/name', {
          pn: project.name,
          newpn: value,
          pid: context[10].project,
        })
        .then((response) => {
          setProject({
            ...project,
            name: response.data.project_name,
          });
          setName({ ...name, setting: false });
        });
    } else {
      axios
        .put('api/project/description', {
          description: project.description,
          newDescription: value,
          pn: project.name,
          pid: context[10].project,
        })
        .then((response) => {
          setProject({
            ...project,
            description: response.data.project_description,
          });
          setDescription({ ...description, setting: false });
        });
    }
  };
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
      <Input
        onBlur={(e) => {
          updateProject(e.target.value, 'name');
        }}
        placeholder={project.name}
        style={{ border: 0, width: 150 }}
        onChange={(e) => {
          setName({ ...project, name: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            updateProject(e.target.value, 'name');
          }
        }}
      />
      {/* description */}

      <div className="drawer-description">
        <TextArea
          onBlur={(e) => {
            updateProject(e.target.value, 'description');
          }}
          placeholder={project.description}
          style={{ border: 0, width: 150 }}
          onChange={(e) => {
            setDescription({
              ...project,
              description: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateProject(e.target.value, 'description');
            }
          }}
        />
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
