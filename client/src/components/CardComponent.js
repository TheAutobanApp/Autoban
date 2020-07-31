import React, { useState, useRef } from 'react';
import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { IoIosArrowDropright } from 'react-icons/io';
import { FaEllipsisV } from 'react-icons/fa';

function CardComponent(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <Card className="card">
      <Card.Body style={{ display: 'inline-block' }}>
        <Card.Title>{props.title}</Card.Title>
        <FaEllipsisV
          style={{ position: 'absolute', top: '20px', right: '10px' }}
          className="clickable"
        />

        <Card.Text>
          {props.description}
        </Card.Text>
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
        <IoIosArrowDropright
          fontSize="30px"
          className="clickable"
          style={{
            bottom: '10px',
            right: '10px',
            position: 'absolute',
          }}
        />
      </Card.Body>
    </Card>
  );
}
export default CardComponent;
