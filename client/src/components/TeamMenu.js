import React, { useState, useContext } from 'react';
import { Menu, Input, Label } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';
import axios from 'axios';
import colors from './utils/colors';

export default function TeamMenu() {
  const context = useContext(AutoContext);

  const [team, setTeam] = useState({
    activeItem: context[8].team && context[8].team.id_team,
    teamAdd: false,
    teamName: '',
  });

  const handleItemClick = (e, { id, name }) => {
    setTeam({ ...team, activeItem: id });
    if (e.target.id) {
      context[9]({
        ...context[8],
        team: { id_team: id, team_name: name },
      });
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
        team_color: colors[context[8].teams.length],
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
    <Menu vertical className="team-menu">
      <Menu.Item
        name="All"
        id={null}
        active={team.activeItem === null}
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
            fluid
            placeholder="Team Name"
            value={team.teamName}
            maxLength={20}
            size="mini"
            action={{
              icon: 'add',
              size: 'mini',
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
            active={team.activeItem === tm.id_team}
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
