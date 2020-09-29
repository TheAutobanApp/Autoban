import React, { useContext } from 'react';
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
      className="flex-column add-column add-project addhover clickable"
      onClick={handleAddProject}
    >
      <h5>Add Project</h5>
      <FaPlus size={20} />
    </div>
  );
}
