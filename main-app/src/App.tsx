import React, { FC } from "react";
import { hot } from "react-hot-loader";
import add from "add";

import classes from "./App.less";
// import math from "remoteApp/math";

console.log(add([1, 2]));

const getMath = async () => {
  const math = await import("remoteApp/math");
  console.log((math as CommonObject).addPlus([1, 2]));
};

const App: FC = () => {
  getMath();
  return <div className={classes.container}>Hello React Template Webpack!</div>;
};

export default hot(module)(App);
