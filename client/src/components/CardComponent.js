import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IoIosArrowDropright } from 'react-icons/io';

function CardComponent() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body style={{ display: 'inline-block' }}>
        <Card.Title>Task Title</Card.Title>
        <Card.Text>
          What is the description of this task? What is your exit
          criteria?
        </Card.Text>

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
