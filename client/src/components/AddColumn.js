import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

export default function AddColumn() {
  const [add, setAdd] = useState({ show: false });
  const addColumn = () => {
    setAdd({ ...add, show: !add.show });
  };
  return (
    <>
      {!add.show ? (
        <div
          className="flex-column column add-column clickable"
          onClick={() => setAdd({ ...add, show: !add.show })}
        >
          <FaPlus size={20} />
          <h5>Add Column</h5>
        </div>
      ) : (
        <div className="flex-row column add-column clickable" style={{justifyContent: "space-around"}}>
          <input placeholder="Column Name" onChange={e => {setAdd({ ...add, name: e.target.value })}}></input>
          <button onClick={addColumn}>Add</button>
          <MdClose onClick={() => setAdd({ ...add, show: !add.show })}/>

        </div>
      )}
    </>
  );
}
