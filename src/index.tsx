import App from "./App";
import * as React from "react";
import * as ReactDOM from "react-dom";

const container = document.querySelector("#video-container");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);
