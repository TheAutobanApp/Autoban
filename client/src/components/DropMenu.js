import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';

const DropMenu = (props) => {
  const context = useContext(AutoContext);
  return (
    <>
      {props.option === 'column' ? (
        <Dropdown
          icon="ellipsis vertical"
          floating
          direction="left"
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                context[1]({
                  ...context[0],
                  open: !context[0].open,
                  type: 'column',
                });
              }}
            >
              Edit Column
            </Dropdown.Item>
            <Dropdown.Item>Archive Cards</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Delete Column</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown
          icon="ellipsis vertical"
          floating
          direction="left"
          className="icon"
          style={{ fontSize: '15px' }}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                context[1]({
                  ...context[0],
                  open: !context[0].open,
                  type: 'card',
                });
              }}
            >
              Edit Card
            </Dropdown.Item>
            <Dropdown.Item>Add Label</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Delete Card</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default DropMenu;
