import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AutoContext } from '../../AutoContext';
import { MdClose } from 'react-icons/md';
import { Input } from 'semantic-ui-react';

export default function ColumnDrawerView(props) {
  const context = useContext(AutoContext);
  const [name, setName] = useState('');

  // update columns state with new column title, using concat method
  const updateColumnName = (e) => {
    // post column to database
    axios
      .put(`/api/columns/?proj=${context[10].project}`, {
        id_place: context[0].edit,
        column_name: name,
      })
      .then((res) => {
        // create copy of context, then splice the edited column with new one
        const columnsCopy = Array.from(context[2]);
        columnsCopy.splice(context[0].edit, 1, res.data);
        // update context
        context[3](columnsCopy);
      });
    // reset local name state
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
      <div className="drawer-header">
        <p>Column Edit</p>
        <MdClose
          size="1.5em"
          className="clickable"
          onClick={() => {
            context[1]({ ...context[0], open: false });
          }}
        />
      </div>
      <h5>Edit Column Name</h5>
      <Input
        value={name}
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
