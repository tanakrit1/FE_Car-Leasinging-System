import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./app.tsx";
// import Loading from "./components/Loading/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <Loading/> */}
      <App />
      
    </BrowserRouter>
  </React.StrictMode>
);
