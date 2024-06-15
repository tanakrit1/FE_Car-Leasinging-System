import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const state = location.state; // รับค่า state

  if (state && state.key) {
    console.log(`ค่า key: ${state.key}`); // แสดงค่า key
  }

  return (
    <>
      <p>Login</p>
      {/* <p>{ location?.state }</p> */}
      <button className="px-6 py-1 rounded-lg bg-yellow-500 text-white">Login Go</button>
    </>
  );
};

export default Login;
