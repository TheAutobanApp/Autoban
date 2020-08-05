import React, { useState } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export default function TeamMenu() {
const [team, setTeam] = useState({
    activeItem: "All"
}) 

 const handleItemClick = (e, { name }) => setTeam({ ...team, activeItem: name })

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='All'
              active={team.activeItem === 'All'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='pics'
              active={team.activeItem === 'pics'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='companies'
              active={team.activeItem === 'companies'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
                        <Menu.Item
              name='links'
              active={team.activeItem === 'links'}
              onClick={handleItemClick}
            />
            
          </Menu>
        </Grid.Column>
      </Grid>
    )
}