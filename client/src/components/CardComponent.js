import React, { useState, useRef } from 'react';
import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { IoIosArrowDropright } from 'react-icons/io';
import { FaEllipsisV } from 'react-icons/fa';

function CardComponent() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <Card style={{ width: '18rem', borderRadius: '15px' }}>
      <Card.Body style={{ display: 'inline-block' }}>
        <Card.Title>Task Title</Card.Title>
        <FaEllipsisV
          style={{ position: 'absolute', top: '20px', right: '10px' }}
        />

        <Card.Text>
          What is the description of this task? What is your exit
          criteria?
        </Card.Text>
        <Button
          size="sm"
          variant="outline-dark"
          ref={target}
          style={{
            height: '15px',
            bottom: '10px',
            left: '15px',
            position: 'absolute',
            borderRadius: '15px',
            fontSize: '10px',
            lineHeight: '0.25em',
          }}
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
