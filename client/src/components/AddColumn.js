import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AutoContext } from '../AutoContext';
import { FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Input } from 'semantic-ui-react';

export default function AddColumn(props) {
  const context = useContext(AutoContext);
  const [add, setAdd] = useState({ show: false, name: '' });

  // update columns state with new column title, using concat method
  const addColumn = () => {
    // post column to database
    axios.post(`/api/columns/${1}`, {
      id_place: context[2].length,
      column_name: add.name,
      column_description: '',
    }).then(res => console.log(res.data))
    // update context
    context[3](() => {
      const newColumns = context[2].concat(add.name);
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
