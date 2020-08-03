import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card, Button, Overlay, Tooltip } from 'react-bootstrap';
import { Icon, Label, Dropdown, Input } from 'semantic-ui-react';
// import { IoIosArrowDropright } from 'react-icons/io';
// import { FaEllipsisV } from 'react-icons/fa';
import DropMenu from './DropMenu';

function CardComponent(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [menu, setMenu] = useState({
    offsetTop: 0,
    offsetLeft: 0,
  });

  const [labels, setLabels] = useState([]);
  const [availLabels, setAvailLabels] = useState([]);

  useEffect(() => {
    axios.get('/api/label/').then((res) => {
      const defLabels = [];
      res.data.forEach((label) => {
        defLabels.push({
          color: label.color,
          text: label.label_name,
          added: false,
        });
        setAvailLabels(defLabels);
      });
    });
  }, []);

  const handleLabelDelete = (e) => {
    let i = e.target.parentElement.id;
    const availCopy = Array.from(availLabels);
    const labelsCopy = Array.from(labels);
    const newLabel = labelsCopy[i];
    availCopy.push(newLabel);
    labelsCopy.splice(i, 1);
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
  };

  const handleAddLabel = (i) => {
    const availCopy = Array.from(availLabels);
    const newLabel = availCopy[i];
    const labelsCopy = Array.from(labels);
    labelsCopy.push(newLabel);
    availCopy.splice(i, 1);
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
  };

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
        {labels.map((item, i) => {
          return (
            <Label
              size="mini"
              color={item.color}
              circular
              id={i}
              key={i}
            >
              {item.text}
              <Icon name="delete" onClick={handleLabelDelete} />
            </Label>
          );
        })}

        {availLabels.length > 0 && <Dropdown
          ref={target}
          trigger={
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
          }
          icon={null}
          labeled
          id={`add${props.id}`}
          onClick={(e) => {
            const targ = ReactDOM.findDOMNode(target.current);
            setMenu({
              offsetTop:
                targ.offsetTop +
                targ.parentElement.offsetTop +
                targ.parentElement.parentElement.offsetTop -
                10,
              offsetLeft:
                targ.offsetLeft +
                targ.parentElement.parentElement.offsetLeft,
            });
            // console.log(offsetTop)
          }}
        >
          <Dropdown.Menu
            style={{
              position: 'fixed',
              top: menu.offsetTop,
              left: menu.offsetLeft,
              minWidth: 'fit-content',
              zIndex: 1000,
            }}
          >
            {/* <Input
              size="mini"
              icon="search"
              iconPosition="left"
              className="search"
            />
            <Dropdown.Divider /> */}
            <Dropdown.Menu scrolling>
              {availLabels.map((option, i) => {
                return (
                  <Dropdown.Item
                    key={option.text}
                    text={option.text}
                    value={option.text}
                    onClick={() => handleAddLabel(i)}
                    label={{
                      color: option.color,
                      empty: true,
                      circular: true,
                    }}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>}

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
