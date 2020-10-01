import React, { useContext, useState, useEffect } from 'react';
import { AutoContext } from '../AutoContext';
import {
  Icon,
  Image,
  Menu,
  Label,
  Popup,
  Input,
  TextArea,
  Form,
} from 'semantic-ui-react';
import axios from 'axios';
import ModalButton from './ModalButton';
import Fade from 'react-reveal/Fade';

export default function TeamView(props) {
  const context = useContext(AutoContext);

  const collabStyle = {
    // margin: 8,
    // display: 'flex',
  };

  const [height, setHeight] = useState('')

  const menu = {
    marginLeft: 5,
    // marginTop: '20%',
    position: 'absolute',
    overflow: 'hidden',
    width: 200,
    height: '100%',
    maxHeight: '600px',
  };

  const [team, setTeam] = useState({
    name: '',
    description: '',
    color: '',
  });

  const [description, setDescription] = useState({
    setting: false,
    description: '',
  });

  const [collabs, setCollabs] = useState({
    active: [],
    pending: [],
  });

  const [name, setName] = useState({
    setting: false,
    name: '',
  });

  useEffect(() => {
    if (context[8].team !== null) {
      axios
        .get(`/api/team/?id_team=${context[8].team.id_team}`)
        .then((response) => {
          const teamInfo = response.data;
          setTeam({
            ...team,
            name: teamInfo.team_name,
            description: teamInfo.team_description,
            color: teamInfo.team_color,
          });
        });

      // get accepted users
      axios
        .get(
          `/api/team/acceptedusers/?id_team=${context[8].team.id_team}`,
        )
        .then((response) => {
          axios
            .get(
              `/api/team/pendingusers/?id_team=${context[8].team.id_team}`,
            )
            .then((res) => {
              setCollabs({
                ...collabs,
                active: response.data,
                pending: res.data,
              });
            });
        });
      // get pending users
    }
    setHeight('75%')
    console.log(height)
  }, [context[8].team]);

  const updateTeam = (value, type) => {
    if (type === 'description') {
      axios
        .put(`/api/team/description`, {
          newdescription: value,
          tm: team.name,
          tmid: context[8].team.id_team,
        })
        .then((response) => {
          setTeam({
            ...team,
            description: response.data.team_description,
          });
          setDescription({ ...description, setting: false });
        });
    } else if (type === 'name' && value.length > 2) {
      axios
        .put(`/api/team/name`, {
          tm: team.name,
          newtm: value,
          tmid: context[8].team.id_team,
        })
        .then((response) => {
          setTeam({
            ...team,
            name: response.data.team_name,
          });
          setName({ ...name, setting: false });
        });
    }
  };

  return (
    <Menu vertical style={menu} className={team-menu}>
      <Menu.Item style={{ minHeight: '25%' }}>
        <Menu.Header
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 30,
            flexWrap: 'wrap',
          }}
        >
          <Label
            empty
            size="mini"
            circular
            color={team.color}
          ></Label>
          {!name.setting ? (
            <span
              style={{ fontSize: 18, marginLeft: 2 }}
              onClick={() => {
                setName({ ...name, setting: true });
                // document.getElementById('team-name').focus();
              }}
            >
              {team.name}
            </span>
          ) : (
            <div style={{ display: 'flex' }}>
              <Input
                autoFocus
                id="team-name"
                error={team.name.length < 3}
                value={team.name}
                onBlur={(e) => {
                  updateTeam(e.target.value.trim(), 'name');
                }}
                size="mini"
                placeholder={team.name}
                style={{
                  width: 125,
                  height: 29,
                  fontSize: 15,
                  marginLeft: 2,
                }}
                onChange={(e) => {
                  setTeam({ ...team, name: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateTeam(e.target.value.trim(), 'name');
                  }
                }}
              />
            </div>
          )}{' '}
        </Menu.Header>

        {!description.setting ? (
          <p
            style={{
              color: 'gray',
              fontStyle: 'italic',
              whiteSpace: 'pre-wrap',
            }}
            onClick={() => {
              setDescription({ ...description, setting: true });
            }}
          >
            {team.description === null || team.description === ''
              ? `Add description`
              : team.description}
          </p>
        ) : (
          <Form>
            <TextArea
              rows={3}
              autoFocus
              value={team.description}
              onBlur={(e) => {
                updateTeam(e.target.value.trim(), 'description');
              }}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     updateTeam(e.target.value.trim(), 'description');
              //   }
              // }}
              style={{ fontStyle: 'italic' }}
              placeholder="Add a description"
              onChange={(e) => {
                setTeam({
                  ...team,
                  description: e.target.value,
                });
              }}
            />
          </Form>
        )}
      </Menu.Item>

      <Menu.Item style={{ maxHeight: '35%' }}>
        <Menu.Header>Collaborators</Menu.Header>

        <Menu.Menu style={{}}>
          <div
            style={{
              display: 'flex',
              padding: '5px 15px',
              height: '100%',
            }}
          >
            {collabs.active.map((collab, index) => {
              return (
                <>
                  {collab.avatar === null ? (
                    <Popup
                      position="bottom center"
                      content={collab.username}
                      key={index}
                      header={`${collab.first_name} ${collab.last_name}`}
                      trigger={
                        <Image
                          avatar
                          src="https://avatarfiles.alphacoders.com/916/91685.jpg"
                        />
                      }
                    />
                  ) : (
                    <Popup
                      position="bottom left"
                      content={collab.username}
                      key={index}
                      header={`${collab.first_name} ${collab.last_name}`}
                      trigger={<Image avatar src={collab.avatar} />}
                    />
                  )}
                </>
              );
            })}
          </div>
        </Menu.Menu>
      </Menu.Item>

      {collabs.pending.length > 0 && (
        <Menu.Item style={{ maxHeight: '35%', overflow: 'hidden' }}>
          <Menu.Header>Pending</Menu.Header>
          <Menu.Menu style={{ opacity: 0.5, overflow: 'auto' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '5px 15px',
              }}
            >
              {collabs.pending.map((collab, index) => {
                return (
                  <>
                    {collab.avatar === null ? (
                      <Image
                        avatar
                        src="https://avatarfiles.alphacoders.com/916/91685.jpg"
                      />
                    ) : (
                      <Image avatar src={collab.avatar} />
                    )}
                  </>
                );
              })}
            </div>
          </Menu.Menu>
        </Menu.Item>
      )}
      <ModalButton
        style={{
          position: 'absolute',
          bottom: 3,
          margin: '4px 6px',
          width: '187px',
        }}
        disabled={false}
        onclick={() =>
          context[5]({ ...context[4], showSearch: true })
        }
      >
        {' '}
        Add a collaborator
      </ModalButton>
      {/* <Icon
        style={{
          position: 'absolute',
          bottom: 3,
          right: 3,
          cursor: 'pointer',
          opacity: 0.7,
        }}
        name="user plus"
        color="grey"
        size="big"
        onClick={() =>
          context[5]({ ...context[4], showSearch: true })
        }
      /> */}
    </Menu>
  );
}
