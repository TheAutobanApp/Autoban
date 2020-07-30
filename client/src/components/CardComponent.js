import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IoIosArrowDropright } from 'react-icons/io';

function CardComponent() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Task Title</Card.Title>
        <Card.Text>
          What is the description of this task? What is your exit
          criteria?
        </Card.Text>
        <Button
          style={{
            height: '20px',
            // width: '10px',
            right: '10px',
            bottom: '10px',
          }}
          className="openCard"
          variant="primary"
        >
          <IoIosArrowDropright style={{ alignSelf: 'center' }} />
        </Button>
      </Card.Body>
    </Card>
  );
}
export default CardComponent;
