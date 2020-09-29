import React, { useContext } from 'react';
import { AutoContext } from '../../AutoContext';
import { MdClose } from 'react-icons/md';

export default function ColumnDrawerView(props) {
  const context = useContext(AutoContext);

  return (
    <div className="drawer-header">
      <p>Card Edit</p>
      <MdClose
        size="1.5em"
        className="clickable"
        onClick={() => {
          context[1]({ ...context[0], open: false });
        }}
      />
    </div>
  );
}
