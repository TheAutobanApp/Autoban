import React, { useState, useRef } from 'react';
import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { Icon, Label } from 'semantic-ui-react';
// import { IoIosArrowDropright } from 'react-icons/io';
// import { FaEllipsisV } from 'react-icons/fa';
import DropMenu from './DropMenu';

function CardComponent(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const dummy = [
    {
      color: 'green',
      text: 'Back End',
    },
    {
      color: 'teal',
      text: 'Front End',
    },
    {
      color: 'yellow',
      text: 'MVP',
    },
    {
      color: 'red',
      text: 'Bug',
    },
  ];
  return (
    <Card className="card">
      <Card.Body style={{ display: 'inline-block' }}>
        <Card.Title
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {props.title}
          <DropMenu option="card" id={props.id} />
        </Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer
        className="flex-row card-footer"
        style={{
          alignItems: 'center',
          height: 'fit-content',
          flexWrap: 'wrap',
        }}
      >
        {dummy.map((item, i) => {
          return (
            <Label size="mini" color={item.color} circular>
              {item.text}
              <Icon name="delete" />
            </Label>
          );
        })}
        <Label
          size="mini"
          color="blue"
          circular
          basic
          className="clickable"
        >
          <Icon name="add" />
          Label
        </Label>

        {/* <Button
          size="sm"
          variant="outline-dark"
          ref={target}
          className="label"
          onClick={() => setShow(!show)}
        >
          Labels
        </Button>
        <Overlay
          target={target.current}
          show={show}
          placement="right"
        >
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {' '}
              P1,{' '}
            </Tooltip>
          )}
        </Overlay> */}
      </Card.Footer>
    </Card>
  );
}
export default CardComponent;
