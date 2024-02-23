import React from 'react';
import EditorSearchResult from './EditorSearchResult';

const EditorSearchResults = ({ searchResults }) => {
  return (
    <div className="editor-search-results">
      {searchResults.map((result) => (
        <EditorSearchResult key={result.id} card={result} />
      ))}
    </div>
  );
};

export default EditorSearchResults;