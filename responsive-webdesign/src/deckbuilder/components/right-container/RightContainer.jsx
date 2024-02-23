import React from 'react';
import EditorSearchBox from './EditorSearchBox';
import EditorSearchResults from './EditorSearchResults';

const RightContainer = () => {
  return (
    <div className="right-container">
      <EditorSearchBox />
      <EditorSearchResults />
    </div>
  );
};

export default RightContainer;
