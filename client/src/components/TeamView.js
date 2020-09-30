import React, { useContext, useState, useEffect } from 'react';
import { AutoContext } from '../AutoContext';
import {
  Icon,
  Image,
  Menu,
  Label,
  Popup,
  Input,
} from 'semantic-ui-react';
import axios from 'axios';

export default function TeamView(props) {
  const context = useContext(AutoContext);

  const collabStyle = {
    // margin: 8,
    // display: 'flex',
  };

  const menu = {
    marginLeft: 5,
    marginTop: 0,
    position: 'relative',
    overflow: 'hidden',
    width: 300,
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
    if (context[8].team !== 'null') {
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
  }, [context[8].team]);

  const updateTeam = (value, type) => {
    if (type === 'description') {
      console.log(team.description, value);
      axios
        .put(`/api/team/description`, {
          newdescription: value,
          tm: team.name,
          tmid: context[8].team.id_team,
        })
        .then((response) => {
          console.log(response);

          setTeam({
            ...team,
            description: response.data.team_description,
          });
          setDescription({ ...description, setting: false });
        });
    } else {
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
    <Menu vertical style={menu}>
      <Menu.Item style={{ height: '20%' }}>
        <Menu.Header style={{ display: 'flex' }}>
          {!name.setting ? (
            <span
              onClick={() => {
                setName({ ...name, setting: true });
              }}
            >
              {team.name}
            </span>
          ) : (
            <div style={{ display: 'flex' }}>
              <Input
                action={{
                  icon: 'close',
                  size: 'mini',
                  onClick: () => {
                    setName({ ...name, setting: false });
                  },
                }}
                size="mini"
                placeholder={team.name}
                style={{ border: 0, width: 125 }}
                onChange={(e) => {
                  setName({ ...name, name: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateTeam(e.target.value, 'name');
                  }
                }}
              />
            </div>
          )}{' '}
          <Label
            empty
            size="mini"
            circular
            color={team.color}
          ></Label>
        </Menu.Header>

        {!description.setting ? (
          <p
            style={{ color: 'gray', fontStyle: 'italic' }}
            onClick={() => {
              setDescription({ ...description, setting: true });
            }}
          >
            {team.description === null || team.description === ''
              ? `Add description`
              : team.description}
          </p>
        ) : (
          <div style={{ display: 'flex' }}>
            <textarea
              value={team.description}
              onBlur={(e) => {
                updateTeam(e.target.value, 'description');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateTeam(e.target.value, 'description');
                }
              }}
              style={{ border: 0, fontStyle: 'italic' }}
              onChange={(e) => {
                setTeam({
                  ...team,
                  description: e.target.value,
                });
              }}
            />
          </div>
        )}
      </Menu.Item>

      <Menu.Item style={{ height: '30%' }}>
        <Menu.Header>Collaborators</Menu.Header>

        <Menu.Menu style={{}}>
          <div
            style={{
              display: 'flex',
              padding: '5px',
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
        <Menu.Item style={{ height: '30%', overflow: 'hidden' }}>
          <Menu.Header>Pending</Menu.Header>
          <Menu.Menu style={{ opacity: 0.5, overflow: 'auto' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '5px',
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
      <Icon
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
      />
    </Menu>
  );
}
