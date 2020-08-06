import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Icon, Label, Dropdown, DropdownDivider, Input } from 'semantic-ui-react';
// import { IoIosArrowDropright } from 'react-icons/io';
// import { FaEllipsisV } from 'react-icons/fa';
import DropMenu from './DropMenu';
import { AutoContext } from '../AutoContext';

function CardComponent(props) {
  const context = useContext(AutoContext);
  const target = useRef(null);
  const [menu, setMenu] = useState({
    offsetTop: 0,
    offsetLeft: 0,
    addLabel: '',
  });
  const [labels, setLabels] = useState([]);
  const [availLabels, setAvailLabels] = useState([]);

  useEffect(() => {
    axios.get(`/api/label/?proj=${1}`).then((res) => {
      const defLabels = [];
      res.data.forEach((label) => {
        defLabels.push(label);
      });
      axios.get(`/api/label/default`).then((res) => {
        res.data.forEach((label) => defLabels.push(label));
        axios.get(`/api/task/?task_id=${props.id}`).then((res) => {
          const task = res.data;
          let cardLabels = [
            task.id_label1,
            task.id_label2,
            task.id_label3,
          ];
          // console.log (cardLabels);
          const labelsCopy = [];
          cardLabels.forEach((label, i) => {
            // console.log(label);
            // console.log(defLabels[label]);
            if (label !== null) {
              let foundIndex = defLabels.findIndex(
                (item) => item.id_label === label,
              );
              // console.log(foundIndex)
              const newLabel = defLabels[foundIndex];
              if (newLabel) {
                labelsCopy.push(newLabel);
                defLabels.splice(foundIndex, 1);
              }
            }
          });
          setLabels(labelsCopy);
          setAvailLabels(defLabels);
        });
      });
      // console.log(defLabels)
    });
  }, [context[4].showLabel]);

  // move added card label to available state and remove from it's label state
  const handleLabelDelete = (i) => {
    const availCopy = Array.from(availLabels);
    const labelsCopy = Array.from(labels);
    console.log(availCopy, labelsCopy);
    const foundIndex = labels.findIndex(
      (item) => item.id_label === i,
    );
    const deleteLabel = labelsCopy[foundIndex];
    console.log(deleteLabel);
    availCopy.push(deleteLabel);
    labelsCopy.splice(foundIndex, 1);
    // send id_label to be removed
    axios.put(`/api/task/label/remove/?id_task=${props.id}`, {
      id_label: deleteLabel.id_label,
    });
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
  };

  // move label to card's label state and remove from available label state
  const handleAddLabel = (i) => {
    const availCopy = Array.from(availLabels);
    const foundIndex = availCopy.findIndex(
      (item) => item.id_label === i,
    );
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
      default:
        console.log('Label length is invalid');
    }
    labelsCopy.push(newLabel);
    availCopy.splice(foundIndex, 1);
    setLabels(labelsCopy);
    setAvailLabels(availCopy);
  };

  const handleCreateLabel = () => {
    context[5]({
      ...context[4],
      showLabel: true,
      labelName: menu.addLabel,
    });
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
              <Icon
                name="delete"
                onClick={() => handleLabelDelete(item.id_label)}
              />
            </Label>
          );
        })}

        {labels.length < 3 && (
          <Dropdown
            compact
            ref={target}
            pointing="top left"
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
            onClose={() => {
              setMenu({ ...menu, addLabel: '' });
            }}
            onClick={(e) => {
              const targ = ReactDOM.findDOMNode(target.current);
              setMenu({
                offsetTop:
                  targ.parentElement.offsetTop +
                  targ.parentElement.parentElement.offsetTop +
                  80,
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
              <Input
                maxLength={16}
                scrolling
                size="mini"
                className="search"
                search
                value={menu.addLabel}
                options={availLabels.map((option) => {
                  return {
                    key: option.label_name,
                    text: option.label_name,
                    value: option.label_name,
                    label: {
                      empty: true,
                      circular: true,
                      color: option.color,
                    },
                  };
                })}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.keyCode === 32) {
                    e.stopPropagation();
                  }
                }}
                onChange={(e) =>
                  setMenu({ ...menu, addLabel: e.target.value })
                }
              />
              <Dropdown.Divider />
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
                {/* if input is more than 1 letter, show create label selection */}
                {menu.addLabel && menu.addLabel.length > 1 && (
                  <>
                  <DropdownDivider/>
                  <Dropdown.Item onClick={handleCreateLabel}>
                    <div className="flex-row">
                      <Icon name="add circle" size="small" />
                      <p style={{ fontSize: 13 }}>
                        New label "{menu.addLabel}"
                      </p>
                    </div>
                  </Dropdown.Item>
                  </>
                )}
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
