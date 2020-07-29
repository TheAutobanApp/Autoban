import React from 'react';

export default function ProjectView(props) {
    return (
        <div style={{height: '100%', width: '100%', display: 'flex'}}>
            {props.children}
        </div>
    )
}