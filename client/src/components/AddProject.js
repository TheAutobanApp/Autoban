import React, { useState, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { AutoContext } from '../AutoContext';

export default function AddProject() {
  const context = useContext(AutoContext);
  const handleAddProject = () => {
    context[5]({
      ...context[4],
      showProject: !context[4].showProject,
    });
  };
  return (
    <div
      className="flex-column  add-column addhover clickable"
      style={{
        height: '100px',
        width: '175px',
        borderRadius: '5px',
        boxShadow: '1px 1px 5px grey',
      }}
      onClick={handleAddProject}
    >
      <FaPlus size={20} style={{}} />
    </div>
  );
}
