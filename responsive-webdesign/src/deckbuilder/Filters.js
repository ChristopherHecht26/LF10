// Filters.js
import React from "react";
import './filters.css';

const Filters = ({ filter, races, attributes, levels, handleFilterChange }) => {
  return (
    <div className="filters-container">
      <div className="atk-def-filter">
        <label style={{ color: "white" }}>ATK Range:</label>
        <input
          type="number"
          name="minATK"
          value={filter.minATK}
          onChange={handleFilterChange}
          placeholder="Min"
        />
        <input
          type="number"
          name="maxATK"
          value={filter.maxATK}
          onChange={handleFilterChange}
          placeholder="Max"
        />
      </div>
      <div className="atk-def-filter">
        <label style={{ color: "white" }}>DEF Range:</label>
        <input
          type="number"
          name="minDEF"
          value={filter.minDEF}
          onChange={handleFilterChange}
          placeholder="Min"
        />
        <input
          type="number"
          name="maxDEF"
          value={filter.maxDEF}
          onChange={handleFilterChange}
          placeholder="Max"
        />
      </div>
      <div className="race-attribute-filter">
        <label style={{ color: "white" }}>Race:</label>
        <select
          name="race"
          value={filter.race}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {races.map((race, index) => (
            <option key={index} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>
      <div className="race-attribute-filter">
        <label style={{ color: "white" }}>Attribute:</label>
        <select
          name="attribute"
          value={filter.attribute}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {attributes.map((attribute, index) => (
            <option key={index} value={attribute}>
              {attribute}
            </option>
          ))}
        </select>
      </div>
      <div className="race-attribute-filter">
        <label style={{ color: "white" }}>Level:</label>
        <select
          name="level"
          value={filter.level}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {levels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
