import React from "react";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
