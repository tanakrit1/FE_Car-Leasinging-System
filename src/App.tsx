import Navbar from "./components/Navbar/index";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Dashboard from "./pages/Login/Dashboard/index.tsx";
import { useState } from "react";
const App = () => {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  return (
    <div>
      {loginMode ? (
        <>
          <Navbar />
          <div className="py-5 px-8" style={{ overflowX: "auto" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
