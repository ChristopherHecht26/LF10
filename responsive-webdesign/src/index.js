import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import SearchBar from "./deckbuilder/function";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchBar />
  </React.StrictMode>
);
