import React, { FC, Suspense } from "react";
import { hot } from "react-hot-loader";

import classes from "./App.less";

const Button = React.lazy(() => import("remoteApp/Button"));

const App: FC = () => {
  return (
    <div className={classes.container}>
      Hello React Template Webpack!
      <Suspense fallback="loading...">
        <Button />
      </Suspense>
    </div>
  );
};

export default hot(module)(App);
