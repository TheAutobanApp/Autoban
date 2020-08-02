import React, { useContext } from 'react';
import { AutoContext } from '../../AutoContext';
import { MdClose } from 'react-icons/md';

export default function ColumnDrawerView(props) {
  const context = useContext(AutoContext);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 3,
      }}
    >
      <p>Card Edit</p>
      <MdClose
        size="1.5em"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          context[1]({ ...context[0], open: false });
        }}
      />
    </div>
  );
}
