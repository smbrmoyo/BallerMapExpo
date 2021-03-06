import React from "react";

import Navigation from "./navigation";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

const SnapClone = () => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

export default SnapClone;
