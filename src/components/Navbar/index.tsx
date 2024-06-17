import { useEffect, useState } from "react";
import logo from "../../assets/images/bangchak.png";
import { useNavigate } from "react-router-dom";

interface Props {
  returnLogin: (result: boolean) => void;
}

const Navbar = ({ returnLogin }: Props) => {
  const navigate = useNavigate();
  const [navItem, setNavItem] = useState<any[]>([]);
  const [menuIndexActive, setMenuIndexActive] = useState<number>(
    sessionStorage.getItem("menuIndex")
      ? parseInt(sessionStorage.getItem("menuIndex")!)
      : 0
  );

  const navItemBegin = [
    { label: "หน้าแรก", path: "/" },
    { label: "บันทึกข้อมูลรถ", path: "/car-information" },
    { label: "ข้อมูลลูกค้า", path: "/customer-information" },
    { label: "ชำระค่างวด", path: "/payment" },
    { label: "ทีมงาน", path: "/" },
  ];

  const onLogout = () => {
    sessionStorage.clear();
    returnLogin(false);
    navigate("/login");
  };

  const onChangeMenu = (path: string, index: number) => {
    sessionStorage.setItem("menuIndex", index.toString());
    setMenuIndexActive(index);
    navigate(path);
  };

  useEffect(() => {
    const permission = "Admin";
    if (permission === "Admin") {
      setNavItem([...navItemBegin, { label: "ผู้ใช้งาน", path: "/" }]);
    }
  }, []);
  return (
    <div className="h-20 px-6 flex items-center justify-between bg-slate-700 ">
      <div className="flex space-x-10 items-center">
        <img
          src={logo}
          alt="logo"
          className="w-14 h-10 cursor-pointer"
          onClick={() => onChangeMenu("/", 0)}
        />
        <div className="flex ">
          {navItem.map((item: any, key: number) => (
            <div key={"navItem" + key}>
              <button
                className={`px-8 hover:bg-amber-300 h-20 tooltip tooltip-bottom tooltip-primary ${
                  key === menuIndexActive && "bg-amber-300"
                }`}
                data-tip={item.label}
                onClick={() => onChangeMenu(item.path, key)}
              >
                <div className="flex justify-center">
                  {item.label === "หน้าแรก" ? (
                    <svg
                      className="text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z"
                      />
                      <path
                        fill="currentColor"
                        d="m490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97"
                      />
                    </svg>
                  ) : item.label === "บันทึกข้อมูลรถ" ? (
                    <svg
                      className="text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="-2 -2 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 17H6v1.5A1.5 1.5 0 0 1 4.5 20h-1A1.5 1.5 0 0 1 2 18.5v-1.67A3.001 3.001 0 0 1 0 14v-3c0-.62.188-1.196.51-1.674l1.086-6.8A3 3 0 0 1 4.56 0h10.88a3 3 0 0 1 2.96 2.527l1.083 6.79c.326.48.516 1.06.516 1.683v3a3.001 3.001 0 0 1-2 2.83v1.67a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm3.25-8.99l-.824-5.168A1 1 0 0 0 15.44 2H4.559a1 1 0 0 0-.988.842l-.825 5.169A3.04 3.04 0 0 1 3 8h14c.084 0 .168.003.25.01M15.5 14a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-11 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m.704-10.906a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1"
                      />
                    </svg>
                  ) : item.label === "ข้อมูลลูกค้า" ? (
                    <svg
                      className="text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M2 3h20c1.05 0 2 .95 2 2v14c0 1.05-.95 2-2 2H2c-1.05 0-2-.95-2-2V5c0-1.05.95-2 2-2m12 3v1h8V6zm0 2v1h8V8zm0 2v1h7v-1zm-6 3.91C6 13.91 2 15 2 17v1h12v-1c0-2-4-3.09-6-3.09M8 6a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                      />
                    </svg>
                  ) : item.label === "ชำระค่างวด" ? (
                    <svg
                      className="text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M10.6 9c-.4-.1-.8-.3-1.1-.6c-.3-.1-.4-.4-.4-.6s.1-.5.3-.6c.3-.2.6-.4.9-.3c.6 0 1.1.3 1.4.7l.9-1.2c-.3-.3-.6-.5-.9-.7s-.7-.3-1.1-.3V4H9.4v1.4c-.5.1-1 .4-1.4.8c-.4.5-.7 1.1-.6 1.7c0 .6.2 1.2.6 1.6c.5.5 1.2.8 1.8 1.1c.3.1.7.3 1 .5c.2.2.3.5.3.8q0 .45-.3.9c-.3.3-.7.4-1 .4c-.4 0-.9-.1-1.2-.4c-.3-.2-.6-.5-.8-.8l-1 1.1c.3.4.6.7 1 1c.5.3 1.1.6 1.7.6V16h1.1v-1.5c.6-.1 1.1-.4 1.5-.8c.5-.5.8-1.3.8-2c0-.6-.2-1.3-.7-1.7c-.5-.5-1-.8-1.6-1M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8m0 14.9c-3.8 0-6.9-3.1-6.9-6.9S6.2 3.1 10 3.1s6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9"
                      />
                    </svg>
                  ) : item.label === "ทีมงาน" ? (
                    <svg
                      className="text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M13.2 10L11 13l-1-1.4L9 13l-2.2-3C3 11 3 13 3 16.9c0 0 3 1.1 6.4 1.1h1.2c3.4-.1 6.4-1.1 6.4-1.1c0-3.9 0-5.9-3.8-6.9m-3.2.7L8.4 10l1.6 1.6l1.6-1.6zm0-8.6c-1.9 0-3 1.8-2.7 3.8S8.6 9.3 10 9.3s2.4-1.4 2.7-3.4c.3-2.1-.8-3.8-2.7-3.8"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
                      />
                    </svg>
                  )}
                </div>
                {/* <p>{item}</p> */}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-white">FirstName LastName</p>
        <p className="cursor-pointer text-white hover:text-gray-300" onClick={onLogout}>
          ออกจากระบบ
        </p>
      </div>
    </div>
  );
};

export default Navbar;
