import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Router } from "./components/router";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
