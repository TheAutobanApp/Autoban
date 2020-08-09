import React, { useState, useContext } from 'react';
import {
  Grid,
  Menu,
  Input,
  Label,
  Dropdown,
} from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';
import axios from 'axios';

export default function TeamMenu() {
  const context = useContext(AutoContext);

  const colors = [
    'red',
    'blue',
    'green',
    'purple',
    'orange',
    'teal',
    'pink',
    'yellow',
    'olive',
    'violet',
    'brown',
    'grey',
    'black',
  ];

  const [team, setTeam] = useState({
    activeItem: 'All',
    teamAdd: false,
    teamName: '',
  });

  const handleItemClick = (e, { name }) => {
    setTeam({ ...team, activeItem: name });
    if (e.target.id) {
      context[9]({ ...context[8], team: parseInt(e.target.id) });
    } else context[9]({ ...context[8], team: null });
  };

  const handleAddTeam = () => {
    setTeam({ ...team, teamAdd: !team.teamAdd });
  };

  const postTeam = () => {
    axios
      .post('/api/team/', {
        team_name: team.teamName,
        id_user: context[8].id_user,
        team_color: colors[context[8].teams.length]
      })
      .then((res) => {
        context[9]({
          ...context[8],
          teams: context[8].teams.concat([res.data]),
        });
        setTeam({ ...team, teamAdd: !team.teamAdd, teamName: '' });
      });
  };

  return (
    // <Grid style={{ height: 'calc((100vh - 50px) * .75)' }}>
    // <Grid.Column width={2} style={{ height: 'calc((100vh - 50px) * .75)' }}>
    <Menu
      vertical
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: '100%',
        height: 'calc((100vh - 50px) * .75)',
      }}
    >
      <Menu.Item
        name="All"
        active={team.activeItem === 'All'}
        onClick={handleItemClick}
      />
      <Menu.Item
        header
        name="Add Team"
        active={team.activeItem === 'Add Team'}
        icon={team.teamAdd ? 'angle up' : 'add'}
        onClick={handleAddTeam}
      />
      {team.teamAdd && (
        <Menu.Item fitted>
          <Input
            placeholder="Team Name"
            value={team.teamName}
            maxLength={20}
            size="mini"
            action={{
              icon: 'add',
              size:"mini",
              onClick: postTeam,
            }}
            onChange={(e) =>
              setTeam({ ...team, teamName: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' && team.teamName !== '') {
                postTeam();
              }
            }}
          />
        </Menu.Item>
      )}
      {context[8].teams.map((tm, index) => {
        return (
          <Menu.Item
            key={index}
            id={tm.id_team}
            name={tm.team_name}
            active={team.activeItem === tm.team_name}
            onClick={handleItemClick}
          >
            {tm.team_name}
            <Label
              empty
              size="mini"
              circular
              color={tm.team_color}
            ></Label>
          </Menu.Item>
        );
      })}
    </Menu>
    // </Grid.Column>
    // </Grid>
  );
}
