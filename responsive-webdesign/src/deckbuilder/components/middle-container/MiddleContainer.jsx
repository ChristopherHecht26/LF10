import React from 'react';
import MiddleHeader from './MiddleHeader';
import MiddleDeck from './MiddleDeck';

const MiddleContainer = () => {
  return (
    <div className="middle-container">
      <MiddleHeader />
      <MiddleDeck />
    </div>
  );
};

export default MiddleContainer;