import Navbar from "./components/Navbar/index";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Dashboard from "./pages/Dashboard/index.tsx";
import { useContext, useEffect, useState } from "react";
import CarInformation from "./pages/Car-Information/index.tsx";
import CustomerInformation from "./pages/Customer-Information/index.tsx";
import Payment from "./pages/Payment/index.tsx";
import Employee from "./pages/Employee/index.tsx";
import { getLoginStorage } from "./helpers/set-storage.ts";
import Loading from "./components/Loading/index.tsx";
import { LoadContext } from "./context/loading-context.tsx";

const routesData = [
  { path: "/", component: <Dashboard /> },
  { path: "/car-information", component: <CarInformation /> },
  { path: "/customer-information", component: <CustomerInformation /> },
  { path: "/payment", component: <Payment /> },
  { path: "/employee", component: <Employee /> },
];

const App = () => {
  const context = useContext(LoadContext);
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState<boolean>(
    sessionStorage.getItem("loginMode") === "true" ? true : false
  );
  // const [loginMode, setLoginMode] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.setItem("loginMode", loginMode.toString());
    if (loginMode === true) {
      navigate(window.location.pathname);
    } else {
      navigate("/login");
    }
  }, [loginMode]);

  const fnCheckLogin = () => {
    const result = getLoginStorage();
    console.log("resultAAABBB---> ", result);

    if (window.location.pathname === "/login") {
      setLoginMode(false);
      navigate(window.location.pathname);
    }

    if (loginMode === true) {
      // login อยู่เเล้ว
      navigate(window.location.pathname);
    } else {
      // ยังไม่ได้ login
      if (result.token && result.profile) {
        setLoginMode(true);
        navigate("/");
      }
    }
  };

  const resultLogin = (result: boolean) => {
    if (result === false) {
      // logout
      sessionStorage.setItem("menuIndex", "0");
      window.location.href = "/login";
      return;
    }
    fnCheckLogin();
  };

  useEffect(() => {
    fnCheckLogin();
  }, []);

  return (
    <>
      {loginMode ? (
        <>
          {context?.loadingContext && <Loading />}
          <Navbar returnLogin={resultLogin} />
          <div className="py-5 px-8" style={{ overflowY: "hidden" }}>
            <Routes>
              {/* <Route path="/" element={<Dashboard />} />
              <Route path="/car-information" element={<CarInformation />} />
              <Route path="/customer-information" element={<CustomerInformation />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/employee" element={<Employee/>} /> */}
              {routesData.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login returnLogin={resultLogin} />} />
        </Routes>
      )}
    </>
  );
};

export default App;
