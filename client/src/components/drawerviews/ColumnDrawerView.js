import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AutoContext } from '../../AutoContext';
import { MdClose } from 'react-icons/md';
import { Input } from 'semantic-ui-react';

export default function ColumnDrawerView(props) {
  const context = useContext(AutoContext);
  const [name, setName] = useState('');

  // update columns state with new column title, using concat method
  const updateColumnName = () => {
    // post column to database
    axios
      .put(`/api/columns/${1}`, {
        id_place: context[0].edit,
        column_name: name,
      })
      .then((res) => {
        // create copy of context, then splice the edited column with new one
        const columnsCopy = Array.from(context[2])
        columnsCopy.splice(context[0].edit, 1, res.data);
        // update context
        context[3](columnsCopy)
      }
      );
    // reset local add state
    setName('');
  };

  // if enter is pressed when there is a value in the new column input, run the addColumn function
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && name !== '') {
      updateColumnName();
    }
  };

  return (
    <div className="flex-column">
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 5,
          padding: 3,
        }}
      >
        <p>Column Edit</p>
        <MdClose
          size="1.5em"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            context[1]({ ...context[0], open: false });
          }}
        />
      </div>
      <h5>Edit Column Name</h5>
      <Input
        style={{ margin: '5px 10px' }}
        action={{ icon: 'edit', onClick: updateColumnName }}
        placeholder="Column Name..."
        onKeyDown={handleKeyPress}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
}
