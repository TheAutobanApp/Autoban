import React, { useState } from 'react'
import { Grid, Menu, Segment, MenuHeader } from 'semantic-ui-react'

export default function TeamMenu() {
const [team, setTeam] = useState({
    activeItem: "All"
}) 

 const handleItemClick = (e, { name }) => setTeam({ ...team, activeItem: name })

    return (
      <Grid style={{maxHeight:"100%", height: "inherit"}}>
        <Grid.Column width={2} style={{maxHeight:"100%"}}>
          <Menu fluid vertical tabular style={{overflowX:"hidden", overflowY:"auto", maxHeight:"100%"}}>
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