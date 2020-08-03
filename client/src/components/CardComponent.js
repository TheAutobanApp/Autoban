import React, { useState, useRef } from 'react';
import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
// import { IoIosArrowDropright } from 'react-icons/io';
// import { FaEllipsisV } from 'react-icons/fa';
import DropMenu from './DropMenu';

function CardComponent(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
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
        style={{ alignItems: 'center' }}
      >
        <Button
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
        </Overlay>
      </Card.Footer>
    </Card>
  );
}
export default CardComponent;
