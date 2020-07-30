import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { MdClose } from 'react-icons/md';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import { GrHistory } from 'react-icons/gr';

function OptionsDrawer(props) {
  return (
    <Fade right when={props.drawer.open} duration={400}>
      <div
        style={{
          width: '250px',
          height: '94.8vh',
          backgroundColor: 'whitesmoke',
          boxShadow: '4px 8px 16px gray',
          position: 'absolute',
          right: 0,
          top: 50,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
        }}
      >
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
          <MdClose size="1.5em" />
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
        <div
          style={{ margin: 20, borderBottom: '1px solid lightgray' }}
        ></div>
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
          <button
            style={{
              borderRadius: 5,
              color: 'white',
              border: '1px solid lightgray',
              marginLeft: 3,
              backgroundColor: 'gray',
            }}
          >
            Change Background
          </button>
        </div>

        <div
          style={{ margin: 20, borderBottom: '1px solid lightgray' }}
        ></div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              border: '1px solid green',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: 5,
              margin: 2,
            }}
          >
            Backend
          </div>
          <div
            style={{
              border: '1px solid red',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: 5,
              margin: 2,
            }}
          >
            Docs
          </div>
          <div
            style={{
              border: '1px solid purple',
              backgroundColor: 'purple',
              color: 'white',
              borderRadius: 5,
              margin: 2,
            }}
          >
            Frontend
          </div>
          <div
            style={{
              border: '1px solid orange',
              backgroundColor: 'orange',
              color: 'white',
              borderRadius: 5,
              margin: 2,
            }}
          >
            Testing
          </div>
          <p style={{ color: 'gray', fontSize: 12 }}>
            Add Labels
            <span>
              <FaPlus />
            </span>
          </p>
        </div>

        <div
          style={{
            margin: 20,
            borderBottom: '1px solid lightgray',
          }}
        ></div>
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
          <button
            style={{
              margin: 10,
              borderRadius: 8,
              backgroundColor: 'white',
              color: 'red',
              border: '1px solid black',
              boxShadow: '2px 3px 8px lightgray',
            }}
          >
            Close Project
          </button>
        </div>
      </div>
    </Fade>
  );
}

export default OptionsDrawer;
