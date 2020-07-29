import React from 'react';

export default function Column(props) {
  let numOfCards = React.Children.toArray(props.children).length;
  return (
    <div
      style={{
        width: '15%',
        minWidth: '290px',
        height: 'fit-content',
        minHeight: '150px',
        backgroundColor: 'whitesmoke',
        margin: '10px',
        paddingTop: '5px',
        borderRadius: '5px',
        boxShadow: '1px 1px 5px grey',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '40px',
          borderBottom: '1px solid lightgray',
          boxShadow: '0 4px 5px -5px lightgray',
          padding: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex' }}>
          <span
            style={{
              backgroundColor: 'gray',
              borderRadius: '20px',
              color: 'white',
              padding: '4px 8px',
              margin: '2px 5px',
              fontSize: '12px',
            }}
          >
            {numOfCards}
          </span>
          <h5 style={{margin: '3px 0'}}>{props.title}</h5>
        </div>
        <div>
          <span>+ </span>
          <span>...</span>
        </div>
      </div>
      <div style={{ padding: '4px' }}>{props.children}</div>
    </div>
  );
}
