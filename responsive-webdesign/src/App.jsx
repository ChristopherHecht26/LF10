import React, { useState } from 'react';
import Container from './deckbuilder/components/Container';
import SearchBar from './deckbuilder/components/right-container/SearchBar'; // Stelle sicher, dass du die SearchBar-Komponente implementierst
import EditorSearchResults from "./deckbuilder/components/right-container/EditorSearchResults";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <SearchBar />
      <EditorSearchResults searchResults={searchResults} />
      <Container />
    </div>
  );
};

export default App;