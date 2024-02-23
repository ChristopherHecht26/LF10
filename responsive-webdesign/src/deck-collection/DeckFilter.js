// DeckFilter.js
import React from 'react';

const DeckFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <label style={{ fontSize: '20px' }}>
        Monster
        <input
          type="checkbox"
          name="monster"
          checked={filter.monster}
          onChange={onFilterChange}
        />
      </label>
      <label style={{ fontSize: '20px' }}>
        Spell
        <input
          type="checkbox"
          name="spell"
          checked={filter.spell}
          onChange={onFilterChange}
        />
      </label>
      <label style={{ fontSize: '20px' }}>
        Trap
        <input
          type="checkbox"
          name="trap"
          checked={filter.trap}
          onChange={onFilterChange}
        />
      </label>
    </div>
  );
};

export default DeckFilter;
