import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Input } from 'semantic-ui-react';

export default function AddColumn(props) {
  const [add, setAdd] = useState({ show: false, name: '' });

  // update columns state with new column title, using concat method
  const addColumn = () => {
    props.setcolumns(() => {
      const newColumns = props.columns.concat(add.name);
      return newColumns;
    });
    // reset local add state
    setAdd({ ...add, show: !add.show, name: '' });
  };

  // if enter is pressed when there is a value in the new column input, run the addColumn function
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && add.name !== '') {
      addColumn();
    }
  };

  return (
    <>
      {/* conditionally render the elements in the addcolumn div based on state
        one view is just text and icon, the other is the form for the column creation */}
      {!add.show ? (
        <div
          className="flex-column column add-column addhover clickable"
          onClick={() => setAdd({ ...add, show: !add.show })}
        >
          <FaPlus size={20} />
          <h5>Add Column</h5>
        </div>
      ) : (
        <div
          className="flex-row column add-column addform"
          style={{ justifyContent: 'space-around' }}
        >
          <Input
            action={{ icon: 'add', onClick: addColumn }}
            placeholder="Column Name..."
            onKeyDown={handleKeyPress}
            onChange={(e) => {
              setAdd({ ...add, name: e.target.value });
            }}
          />
          <div
            className="add-close"
            onClick={() => setAdd({ ...add, show: !add.show })}
          >
            <MdClose size={20} />
          </div>
        </div>
      )}
    </>
  );
}
