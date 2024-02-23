import React from 'react';
import LeftContainer from './LeftContainer';
import MiddleContainer from './MiddleContainer';
import RightContainer from './RightContainer';

const Container = () => {
  return (
    <div className="container">
      <LeftContainer />
      <MiddleContainer />
      <RightContainer />
    </div>
  );
};

export default Container;