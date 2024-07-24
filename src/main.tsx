import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./app.tsx";
import { LoadingProvider } from "./context/loading-context.tsx";
// import Loading from "./components/Loading/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //   <React.StrictMode>
  <LoadingProvider>
    <BrowserRouter>
      {/* <Loading/> */}
      <App />
    </BrowserRouter>
  </LoadingProvider>
  //   </React.StrictMode>
);
