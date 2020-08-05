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

  const [labelIDs, setLabelIDs] = useState([])
  const [labels, setLabels] = useState([]);
  const [availLabels, setAvailLabels] = useState([]);

  useEffect(() => {
    axios.get('/api/label/').then((res) => {
      const defLabels = [];
      res.data.forEach((label) => {
        defLabels.push(label);
      });
      // console.log(defLabels)
      axios.get(`/api/task/?task_id=${props.id}`).then((res) => {
        const task = res.data;
        let cardLabels = [
          task.id_label1,
          task.id_label2,
          task.id_label3,
        ];
        // console.log (cardLabels);
        setLabelIDs(cardLabels);
        const labelsCopy = Array.from(labels);
        cardLabels.forEach((label, i) => {
          // console.log(label);
          // console.log(defLabels[label]);
          if (label !== null) {
            let foundIndex = defLabels.findIndex(item => item.id_label == label)
            // console.log(foundIndex)
            const newLabel = defLabels[foundIndex];
            if (newLabel) {
              labelsCopy.push(newLabel);
              defLabels.splice(foundIndex, 1);
            }
          }
          // defLabels.splice(label - 1, 1);
        });
        setLabels(labelsCopy);
        setAvailLabels(defLabels);
      });
      // setAvailLabels(defLabels, () => console.log(availLabels));
    });
  }, []);

  // move added card label to available state and remove from it's label state
  const handleLabelDelete = (i) => {
    const availCopy = Array.from(availLabels);
    const labelsCopy = Array.from(labels);
    console.log(availCopy, labelsCopy)
    const foundIndex = labels.findIndex(item => item.id_label === i);
    const labelIdIndex = labelIDs.findIndex(item => item === i)
    const newLabel = labelsCopy[foundIndex];
    console.log(newLabel)
    availCopy.push(newLabel);
    labelsCopy.splice(foundIndex, 1);
    axios.put(`/api/task/label/remove/?id_task=${props.id}`, {
              id_label: newLabel.id_label,
            })
    // switch (foundIndex) {
    //   case 2:
    //     axios
    //       .put(`/api/task/?id_task=${props.id}`, {
    //         id_label3: null,
    //       })
    //       .then((res) => console.log(res, 'idlabel3'));
    //     break;
    //   case 1:
    //     axios
    //       .put(`/api/task/?id_task=${props.id}`, {
    //         id_label2: null,
    //       })
    //       .then((res) => console.log(res, 'idlabel2'));
    //     break;
    //   case 0:
    //     axios
    //       .put(`/api/task/?id_task=${props.id}`, {
    //         id_label1: null,
    //       })
    //       .then((res) => console.log(res, 'idlabel1'));
    //     break;
    // }
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
  };

  // move label to card's label state and remove from available label state
  const handleAddLabel = (i) => {
    const availCopy = Array.from(availLabels);
    const foundIndex = availCopy.findIndex(item => item.id_label === i)
    // console.log(foundIndex)
    const labelsCopy = Array.from(labels);
    const newLabel = availCopy[foundIndex];
    // console.log(newLabel)
    switch (labels.length) {
      case 0:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_label1: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
      case 1:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_label2: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
      case 2:
        axios
          .put(`/api/task/?id_task=${props.id}`, {
            id_label3: newLabel.id_label,
          })
          .then((res) => console.log(res));
        break;
    }
    labelsCopy.push(newLabel);
    availCopy.splice(foundIndex, 1);
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
              id={item.id_label}
              key={i}
            >
              {item.label_name}
              <Icon name="delete" onClick={() => handleLabelDelete(item.id_label)} />
            </Label>
          );
        })}

        {labels.length < 3 && (
          <Dropdown
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
                      key={option.label_name}
                      text={option.label_name}
                      value={option.label_name}
                      onClick={() => handleAddLabel(option.id_label)}
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
          </Dropdown>
        )}

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
