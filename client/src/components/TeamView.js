import React, { useContext, useState } from 'react';
import { AutoContext } from '../AutoContext';
import { List, Icon, Image, Search, Menu } from 'semantic-ui-react';
import axios from 'axios';

export default function TeamView(props) {
  const context = useContext(AutoContext);

  const collabStyle = {
    margin: 8,
    display: 'flex',
  };

  return (
    <Menu
      vertical
      style={{
        marginLeft: 5,
        marginTop: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Menu.Item>
        <Menu.Header>Engineering</Menu.Header>
        <p style={{ color: 'gray' }}>Kick butt team for Autoban</p>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Collaborators</Menu.Header>

        <Menu.Menu>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={collabStyle}>
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
          </div>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Pending</Menu.Header>
        <Menu.Menu style={{ opacity: 0.5 }}>
          <div style={collabStyle}>
            {context[8].avatar && (
              <Image
                avatar
                src={
                  'https://www.funnyjunksite.com/pictures/wp-content/uploads/2015/08/Funny-Avatar-Photo.jpg'
                }
              />
            )}{' '}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'gray' }}>Pending Pops</span>
              <span>ppops</span>
            </div>
          </div>
          <div style={collabStyle}>
            {context[8].avatar && (
              <Image
                avatar
                src={
                  'https://image.freepik.com/free-vector/cartoon-funny-monkey-face-avatar_6996-1147.jpg'
                }
              />
            )}{' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: 'gray' }}>Hey Hey Hey</span>
              <span>fatalbert</span>
            </div>
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
