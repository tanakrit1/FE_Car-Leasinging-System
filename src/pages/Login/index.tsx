// import { useLocation } from "react-router-dom";
import logo from '../../assets/images/logo.png'
interface Props {
    returnLogin: (result: boolean) => void
}

const Login = ({returnLogin}: Props) => {
  //   const location = useLocation();
  //   const state = location.state; // รับค่า state

  //   if (state && state.key) {
  //     console.log(`ค่า key: ${state.key}`); // แสดงค่า key
  //   }

  const onLogin = (event:any) => {
    event.preventDefault();
    returnLogin(true)
    console.log("login");
  }

  return (
    <>
      <form onSubmit={onLogin}>
        <div className="flex">
          <div className="w-1/2 flex items-center justify-center">
            <img src={logo} className='h-full w-full' />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center h-screen bg-white">
            <p className="text-3xl text-black font-bold mb-6">Login เพื่อเข้าใช้งานนะบบ</p>
            <input
              type="text"
              placeholder="Username"
              className="w-3/4 h-12 border border-black bg-white rounded-lg px-3 text-black mb-3"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-3/4 h-12 border border-black bg-white rounded-lg px-3 text-black mb-6"
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-3/4 h-12 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
            >
                เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
