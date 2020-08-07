import React, { useState, useContext } from 'react';
import { Grid, Menu, Input } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';
import axios from 'axios';

export default function TeamMenu() {
  const context = useContext(AutoContext);

  const [team, setTeam] = useState({
    activeItem: 'All',
    teamAdd: false,
    teamName: '',
  });

  const handleItemClick = (e, { name }) =>
    setTeam({ ...team, activeItem: name });

  const handleAddTeam = () => {
    setTeam({ ...team, teamAdd: !team.teamAdd });
  };

  const postTeam = () => {
    axios
      .post('/api/team/', {
        team_name: team.teamName,
        id_user: context[8].id_user,
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
    <Grid style={{ maxHeight: '100%', height: 'inherit' }}>
      <Grid.Column width={2} style={{ maxHeight: '100%' }}>
        <Menu
          fluid
          vertical
          tabular
          style={{
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: '100%',
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
            <Menu.Item>
              <Input
                placeholder="team name"
                value={team.teamName}
                maxLength={20}
                action={{
                  icon: 'add',
                  onClick: postTeam,
                }}
                onChange={(e) =>
                  setTeam({ ...team, teamName: e.target.value })
                }
              />
            </Menu.Item>
          )}
          {context[8].teams.map((tm, index) => {
            return (
              <Menu.Item
                key={index}
                name={tm.team_name}
                active={team.activeItem === tm.team_name}
                onClick={handleItemClick}
              />
            );
          })}
        </Menu>
      </Grid.Column>
    </Grid>
  );
}
