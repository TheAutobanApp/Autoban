import React, { useState, useContext } from 'react';
import { Grid, Menu, Input, Label } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';
import axios from 'axios';

export default function TeamMenu() {
  const context = useContext(AutoContext);

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
    <Grid style={{ height: 'calc((100vh - 50px) * .75)' }}>
      <Grid.Column width={2} style={{ height: 'calc((100vh - 50px) * .75)' }}>
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
                placeholder="Team Name"
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
                id={tm.id_team}
                name={tm.team_name}
                active={team.activeItem === tm.team_name}
                onClick={handleItemClick}
              >{tm.team_name}<Label color="red" circular size="mini"/></Menu.Item>
            );
          })}
        </Menu>
      </Grid.Column>
    </Grid>
  );
}
