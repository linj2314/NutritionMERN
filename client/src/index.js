import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./style.css"
import { DataProvider } from "./DataContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
</React.StrictMode>);