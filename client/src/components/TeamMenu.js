import React, { useState } from 'react';
import { Grid, Menu, Input } from 'semantic-ui-react';

export default function TeamMenu() {
  const [team, setTeam] = useState({
    activeItem: 'All',
    teamAdd: false,
    teamName: '',
  });

  const handleItemClick = (e, { name }) =>
    setTeam({ ...team, activeItem: name });

  const handleAddTeam = () => {
    console.log('team added');
    setTeam({ ...team, teamAdd: !team.teamAdd });
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
                action={{ icon: 'add' }}
                onChange={(e) =>
                  setTeam({ ...team, teamName: e.target.value })
                }
              />
            </Menu.Item>
          )}
          <Menu.Item
            name="links"
            active={team.activeItem === 'links'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="links"
            active={team.activeItem === 'links'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="links"
            active={team.activeItem === 'links'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="links"
            active={team.activeItem === 'links'}
            onClick={handleItemClick}
          />
        </Menu>
      </Grid.Column>
    </Grid>
  );
}
