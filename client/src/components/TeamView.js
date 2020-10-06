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

  const menu = {
    marginLeft: 5,
    position: 'absolute',
    overflow: 'hidden',
    width: 190,
    height: 'calc(75vh - 46px)',
    maxHeight: '600px',
  };

  const initialTeamState = {
    name: '',
    description: '',
    color: '',
  };

  const [team, setTeam] = useState(initialTeamState);

  const [description, setDescription] = useState({
    setting: false,
    description: '',
  });

  const [collabs, setCollabs] = useState([]);
  const [pending, setPending] = useState([]);

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
      // get accepted & pending users
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
              setCollabs(response.data);
              setPending(res.data);
            });
        });
    }
    return () => {
      setTeam(initialTeamState);
      setCollabs([]);
      setPending([]);
    };
  }, [context[8].team]);

  useEffect(() => {
    if (context[8].team !== null && context[4].showSearch === false) {
      axios
        .get(
          `/api/team/pendingusers/?id_team=${context[8].team.id_team}`,
        )
        .then((res) => {
          setPending(res.data);
        });
    }
  }, [context[4].showSearch]);

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
          // update team's name in context
          const newTeams = Array.from(context[8].teams);
          newTeams[
            newTeams.findIndex(
              (i) => i.id_team === context[8].team.id_team,
            )
          ].team_name = team.name;
          context[9]({ ...context[8], teams: newTeams });
        });
    }
  };

  return (
    <Menu vertical style={menu} className={team - menu}>
      {team.name && (
        <Fade cascade>
          <Menu.Item style={{ minHeight: 140 }}>
            <Menu.Header
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 30,
                flexWrap: 'wrap',
              }}
            >
              {!name.setting ? (
                <span
                  style={{ fontSize: 18, marginLeft: 2 }}
                  onClick={() => {
                    setName({ ...name, setting: true });
                  }}
                >
                  <Label
                    empty
                    size="mini"
                    circular
                    color={team.color}
                  ></Label>
                  {team.name}
                </span>
              ) : (
                <div style={{ display: 'flex' }}>
                  <Input
                    maxLength={50}
                    autoFocus
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
                  maxLength={200}
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
        </Fade>
      )}
      {collabs.length > 0 && (
        <Fade cascade>
          <Menu.Item>
            <Menu.Header>Collaborators</Menu.Header>
            <Menu.Menu style={{}}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '5px 15px',
                }}
              >
                {collabs.map((collab, index) => {
                  return (
                    <>
                      {collab.avatar === null ? (
                        <Popup
                          size="mini"
                          position="bottom left"
                          content={collab.username}
                          key={index}
                          header={`${collab.first_name} ${collab.last_name}`}
                          trigger={
                            <Image
                              className="avatars"
                              avatar
                              src={process.env.PUBLIC_URL + "/default.png"}
                            />
                          }
                        />
                      ) : (
                        <Popup
                          size="mini"
                          position="bottom left"
                          content={collab.username}
                          key={index}
                          header={`${collab.first_name} ${collab.last_name}`}
                          trigger={
                            <Image
                              className="avatars"
                              avatar
                              src={collab.avatar}
                            />
                          }
                        />
                      )}
                    </>
                  );
                })}
              </div>
            </Menu.Menu>
          </Menu.Item>
        </Fade>
      )}

      {pending.length > 0 && (
        <Fade cascade>
          <Menu.Item>
            <Menu.Header>Pending</Menu.Header>
            <Menu.Menu style={{ opacity: 0.5 }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '5px 15px',
                }}
              >
                {pending.map((collab, index) => {
                  return (
                    <>
                      {collab.avatar === null ? (
                        <Popup
                          size="mini"
                          position="bottom left"
                          content={collab.username}
                          key={index}
                          trigger={
                            <Image
                              className="avatars"
                              avatar
                              src={process.env.PUBLIC_URL + "/default.png"}
                            />
                          }
                        />
                      ) : (
                        <Popup
                          size="mini"
                          position="bottom left"
                          content={collab.username}
                          key={index}
                          trigger={
                            <Image
                              className="avatars"
                              avatar
                              src={collab.avatar}
                            />
                          }
                        />
                      )}
                    </>
                  );
                })}
              </div>
            </Menu.Menu>
          </Menu.Item>
        </Fade>
      )}
      <ModalButton
        style={{
          position: 'absolute',
          bottom: 3,
          margin: '4px 6px',
          width: '176px',
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
