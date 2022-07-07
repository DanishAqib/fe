import "./App.css";
import React, { Fragment } from "react";
import Books from "./Component/Books";
import Students from "./Component/Students";

function App() {
  return (
    <Fragment>
      <Books />
      <Students />
    </Fragment>
  );
}

export default App;
