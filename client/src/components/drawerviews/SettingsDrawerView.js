import { MdClose } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import {
  Label,
  Input,
  TextArea,
  Form,
  Message,
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import React, { useContext, useState, useEffect } from 'react';
import { AutoContext } from '../../AutoContext';
import axios from 'axios';

export default function SettingsDrawerView(props) {
  const [project, setProject] = useState({
    description: '',
    newDescription: '',
    descSetting: false,
    name: '',
    newName: '',
    nameSetting: false,
  });
  const context = useContext(AutoContext);

  useEffect(() => {
    context[8].projects.filter((proj, index) => {
      if (proj.id_project === context[10].project) {
        setProject({
          ...project,
          name: proj.project_name,
          newName: proj.project_name,
          description: proj.project_description,
          newDescription: proj.project_description,
        });
      }
    });
  }, [context[10].project]);

  const updateProject = (value, type) => {
    if (type === 'name' && project.name !== project.newName) {
      axios
        .put('api/project/name', {
          newpn: value,
          pid: context[10].project,
        })
        .then((response) => {
          setProject({
            ...project,
            nameSetting: false,
            name: response.data.project_name,
            newName: response.data.project_name,
          });
        });
    } else if (
      type === 'description' &&
      project.description !== project.newDescription
    ) {
      axios
        .put('api/project/description', {
          newDescription: value,
          pn: project.name,
          pid: context[10].project,
        })
        .then((response) => {
          setProject({
            ...project,
            descSetting: false,
            description: response.data.project_description,
            newDescription: response.data.project_description,
          });
        });
    } else {
      setProject({
        ...project,
        nameSetting: false,
        descSetting: false,
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
      <Form
        className="flex-column"
        style={{ width: '90%' }}
        error={project.newName.length === 0}
      >
        {!project.nameSetting ? (
          <span
            style={{
              fontSize: 18,
              marginLeft: 2,
              fontWeight: 'bold',
              textAlign: 'center',
              height: 29,
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              setProject({ ...project, nameSetting: true });
            }}
          >
            {project.name}
          </span>
        ) : (
          <Input
            maxLength={50}
            autoFocus
            value={project.newName}
            onBlur={(e) => {
              updateProject(e.target.value.trim(), 'name');
            }}
            style={{
              width: '100%',
              height: 29,
              fontSize: 15,
              marginLeft: 2,
            }}
            onChange={(e) => {
              setProject({ ...project, newName: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateProject(e.target.value.trim(), 'name');
              }
            }}
          />
        )}
        <Message error size="mini" content="Project name required." />
        {/* description */}

        {/* <div className="drawer-description"> */}
        {!project.descSetting ? (
          <p
            style={{
              color: 'gray',
              // fontStyle: 'italic',
              width: '100%',
              minHeight: 40,
              // textAlign: 'center',
              whiteSpace: 'pre-wrap',
            }}
            onClick={() => {
              setProject({ ...project, descSetting: true });
            }}
          >
            {project.description === null ||
            project.description === '' ? (
              `Add description`
            ) : (
              <ReactMarkdown source={project.description} />
            )}
          </p>
        ) : (
          <TextArea
            maxLength={200}
            rows={5}
            autoFocus
            onBlur={(e) => {
              updateProject(e.target.value.trim(), 'description');
            }}
            value={project.newDescription}
            style={{ width: '100%', margin: 4 }}
            onChange={(e) => {
              setProject({
                ...project,
                newDescription: e.target.value,
              });
            }}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter') {
            //     updateProject(e.target.value.trim(), 'description');
            //   }
            // }}
          />
        )}
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
        {/* </div> */}
      </Form>
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
