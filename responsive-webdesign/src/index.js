import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import DeckCollection from '../src/deck-collection/DeckCollection';
import CardComponent  from './deck-collection/CardComponent/CardComponent';
import DeckComponent from './deck-collection/DeckComponent/DeckComponent';
import EditorSearchColumn from './deck-collection/SearchComponent/SearchComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DeckCollection />
    <CardComponent/>
    <DeckComponent/>
    <EditorSearchColumn/>
  </React.StrictMode>
);


