import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Input } from 'semantic-ui-react';

export default function AddColumn() {
  const [add, setAdd] = useState({ show: false, name: '' });
  const addColumn = () => {
    setAdd({ ...add, show: !add.show, name: '' });
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
