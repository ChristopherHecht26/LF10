import React from 'react';
import LeftContainer from './left-container/LeftContainer';
import MiddleContainer from './middle-container/MiddleContainer';
import RightContainer from './right-container/RightContainer';

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