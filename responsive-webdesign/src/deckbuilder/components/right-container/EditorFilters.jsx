import React from 'react';

const EditorFilters = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange(name, checked);
  };

  return (
    <div className="editor-filters">
      <label>
        Monster
        <input type="checkbox" name="monster" onChange={handleFilterChange} />
      </label>
      <label>
        Spell
        <input type="checkbox" name="spell" onChange={handleFilterChange} />
      </label>
      <label>
        Trap
        <input type="checkbox" name="trap" onChange={handleFilterChange} />
      </label>
    </div>
  );
};

export default EditorFilters;
