import React, { useContext, useState, useEffect } from 'react';
import { AutoContext } from '../AutoContext';
import { Icon, Image, Menu, Label } from 'semantic-ui-react';
import axios from 'axios';

export default function TeamView(props) {
  const context = useContext(AutoContext);

  const collabStyle = {
    margin: 8,
    display: 'flex',
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

  const [collabs, setCollabs] = useState([]);

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

      axios
        .get(
          `/api/team/teamusers/?id_team=${context[8].team.id_team}`,
        )
        .then((response) => {
          setCollabs(response.data);
        });
    }
  }, [context[8].team]);

  const updateTeam = (value, type) => {
    if (type === 'description') {
      axios
        .put(`/api/team/description`, {
          description: team.description,
          newdescription: value,
          tm: team.name,
          tmid: context[8].team,
        })
        .then((response) => {
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
          tmid: context[8].team,
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
      <Menu.Item>
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
              <Icon
                name="close"
                onClick={() => {
                  setName({ ...name, setting: false });
                }}
              />
              <input
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
            {team.description === null
              ? `Add description`
              : team.description}
          </p>
        ) : (
          <div style={{ display: 'flex' }}>
            <Icon
              name="close"
              onClick={() => {
                setDescription({ ...description, setting: false });
              }}
            />
            <textarea
              placeholder={team.description}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateTeam(e.target.value, 'description');
                }
              }}
              style={{ border: 0, fontStyle: 'italic' }}
              onChange={(e) => {
                setDescription({
                  ...description,
                  description: e.target.value,
                });
              }}
            />
          </div>
        )}
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Collaborators</Menu.Header>

        <Menu.Menu>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {collabs.map((collab, index) => {
              if (collab.accepted) {
                return (
                  <div style={collabStyle}>
                    {collab.avatar === null ? (
                      <Image
                        avatar
                        src="https://avatarfiles.alphacoders.com/916/91685.jpg"
                      />
                    ) : (
                      <Image avatar src={collab.avatar} />
                    )}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <span
                        style={{ color: 'gray' }}
                      >{`${collab.first_name} ${collab.last_name}`}</span>
                      <span>{collab.username}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* <div style={collabStyle}>
              {context[8].avatar && (
                <Image avatar src={context[8].avatar} />
              )}{' '}
              <div
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={{ color: 'gray' }}>John Jones</span>
                <span>jjones</span>
              </div>
            </div>
            <div style={collabStyle}>
              {context[8].avatar && (
                <Image
                  avatar
                  src={
                    'https://avatarfiles.alphacoders.com/916/91685.jpg'
                  }
                />
              )}{' '}
              <div
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={{ color: 'gray' }}>Sally Sanders</span>
                <span>sallysoo</span>
              </div>
            </div>
            <div style={collabStyle}>
              {context[8].avatar && (
                <Image
                  avatar
                  src={
                    'https://blog.orangecarton.com/wp-content/uploads/2013/05/mona_lisa_iphone.jpg'
                  }
                />
              )}{' '}
              <div
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={{ color: 'gray' }}>Patty Potts</span>
                <span>ppotts</span>
              </div>
            </div>
            <div style={collabStyle}>
              {context[8].avatar && (
                <Image
                  avatar
                  src={
                    'https://www.pngkey.com/png/detail/468-4685836_funny-avatar-png-graphic-transparent-library-dream-league.png'
                  }
                />
              )}{' '}
              <div
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={{ color: 'gray' }}>Pooty Booty</span>
                <span>pootboots</span>
              </div>
            </div>
          </div> */}
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Pending</Menu.Header>
        <Menu.Menu style={{ opacity: 0.5 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {collabs.map((collab, index) => {
              if (!collab.accepted) {
                return (
                  <div style={collabStyle}>
                    {collab.avatar === null ? (
                      <Image
                        avatar
                        src="https://avatarfiles.alphacoders.com/916/91685.jpg"
                      />
                    ) : (
                      <Image avatar src={collab.avatar} />
                    )}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <span
                        style={{ color: 'gray' }}
                      >{`${collab.first_name} ${collab.last_name}`}</span>
                      <span>{collab.username}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Menu.Menu>
      </Menu.Item>
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
