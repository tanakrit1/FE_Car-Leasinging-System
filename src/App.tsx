import Navbar from "./components/Navbar/index";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Dashboard from "./pages/Dashboard/index.tsx";
import { useEffect, useState } from "react";
const App = () => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState<boolean>(sessionStorage.getItem("loginMode")==="true" ? true : false);

  useEffect(() => {
    sessionStorage.setItem("loginMode", loginMode.toString());
    if (loginMode === true) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [loginMode]);

  const resultLogin = (result: boolean) => {
    setLoginMode(result);
  }

  return (
    <div>
      {loginMode ? (
        <>
          <Navbar returnLogin={resultLogin} />
          <div className="py-5 px-8" style={{ overflowX: "auto" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login returnLogin={resultLogin} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
