import React from 'react';
import { Button } from 'semantic-ui-react';

export default function ModalButton(props) {
    return (
        <Button
          className={!props.disabled ? 'saveButton' : ''}
          style={props.style}
          onClick={props.onclick}
          disabled={props.disabled}
        >
          {props.children}
        </Button>
    )
}