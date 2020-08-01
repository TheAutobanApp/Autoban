import React from 'react';

export default function Label(props) {
  const labelStyle = {
    border: `1px solid ${props.color}`,
    backgroundColor: props.color,
    color: 'white',
    borderRadius: 5,
    margin: 2,
    padding: 3,
  };
  return <div style={labelStyle}>{props.name}</div>;
}
