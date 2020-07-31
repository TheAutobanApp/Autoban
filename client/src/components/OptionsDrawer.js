import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { MdClose } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { GrHistory } from 'react-icons/gr';
import Label from './Label';

function OptionsDrawer(props) {
  const drawerStyle = {
    width: '250px',
    height: '100%',
    backgroundColor: 'whitesmoke',
    boxShadow: '4px 8px 16px gray',
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
  };

  const closeButton = {
    margin: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'red',
    border: '1px solid black',
    boxShadow: '2px 3px 8px lightgray',
  };

  const changeBGButton = {
    borderRadius: 5,
    color: 'white',
    border: '1px solid lightgray',
    marginLeft: 3,
    background:
      'linear-gradient(to bottom, var(--nav-color), var(--nav-color2))',
  };

  const linebreak = {
    margin: 20,
    borderBottom: '1px solid lightgray',
  };

  return (
    <Fade right when={props.drawer.open} collapse duration={400}>
      <div style={drawerStyle}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 5,
            padding: 3,
          }}
        >
          <p>Settings</p>
          <MdClose
            size="1.5em"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              props.setdrawer({ ...props.drawer, open: false });
            }}
          />
        </div>
        {/* title */}
        <h5 style={{ alignSelf: 'center' }}>Project Autoban</h5>
        {/* description */}
        <div style={{ padding: 5, textAlign: 'center' }}>
          <p style={{ color: 'gray' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
          </p>
          <input
            value="https://autobanprod.herokuapp.com/autobanproj"
            style={{
              border: '1px solid lightgray',
              borderRadius: 10,
            }}
          />
          <span style={{ fontSize: 10, color: 'lightgray' }}>
            project url
          </span>
        </div>
        <div style={linebreak}></div>
        <div
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span>
            <img
              style={{ width: 30, height: 30, borderRadius: 5 }}
              src="https://starwarsblog.starwars.com/wp-content/uploads/2019/08/d23-the-mandalorian-poster-tall-A-1088x816.jpg"
            />{' '}
          </span>{' '}
          <button style={changeBGButton}>Change Background</button>
        </div>

        <div style={linebreak}></div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Label name="Backend" color="red" />
          <Label name="Frontend" color="blue" />
          <Label name="Testing" color="green" />
          <Label name="Docs" color="purple" />

          <p style={{ color: 'gray', fontSize: 12 }}>
            Add Labels
            <span>
              <FaPlus />
            </span>
          </p>
        </div>

        <div style={linebreak}></div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>
            <GrHistory /> archived
          </span>
          <button style={closeButton}>Close Project</button>
        </div>
      </div>
    </Fade>
  );
}

export default OptionsDrawer;
