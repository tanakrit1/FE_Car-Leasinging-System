import { useState } from "react";

interface props{
    returnSearch: (data: any) => void;
    returnClearForm: () => void;
}

const FormSearch = ({returnSearch, returnClearForm}: props) => {
  const [formSearch, setFormSearch] = useState<any>({
    employeeID: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  const onClearForm = () => {
    setFormSearch({
      employeeID: "",
      firstName: "",
      lastName: "",
      phone: ""
    });
    returnClearForm()
  };

  const onChangeInput = (event: any) => {
    setFormSearch({ ...formSearch, [event.target.name]: event.target.value });
  };

  const onSearch = (event: any) => {
    event.preventDefault();
    returnSearch(formSearch);
  }

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">ค้นหาข้อมูล</p>
          <button
            className="flex items-center space-x-1 text-white bg-slate-800 px-3 py-1 rounded-lg hover:bg-slate-900"
            onClick={onClearForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.995 4a8 8 0 1 0 7.735 10h-2.081a6 6 0 1 1-5.654-8a5.92 5.92 0 0 1 4.223 1.78L13 11h7V4l-2.351 2.35A7.965 7.965 0 0 0 11.995 4Z"
              />
            </svg>
            <span>Clear</span>
          </button>
        </div>

        <div className="mt-5 px-3 pb-6">
          <form onSubmit={onSearch}>
            <div className="flex flex-row flex-wrap">
              <div className={`basis-4/12 px-2`}>
                <p className="text-white font-semibold mb-1"> รหัสพนักงาน : </p>
                <input
                  autoComplete="off"
                  type="text"
                  name="employeeID"
                  value={formSearch.employeeID}
                  className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                  onChange={onChangeInput}
                />
              </div>

              <div className={`basis-4/12 px-2`}>
                <p className="text-white font-semibold mb-1"> ชื่อ : </p>
                <input
                  autoComplete="off"
                  type="text"
                  name="firstName"
                  value={formSearch.firstName}
                  className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                  onChange={onChangeInput}
                />
              </div>

              <div className={`basis-4/12 px-2`}>
                <p className="text-white font-semibold mb-1"> สกุล : </p>
                <input
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  value={formSearch.lastName}
                  className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                  onChange={onChangeInput}
                />
              </div>

              <div className={`basis-4/12 px-2`}>
                <p className="text-white font-semibold mb-1"> เบอร์โทร : </p>
                <input
                  autoComplete="off"
                  type="number"
                  name="phone"
                  value={formSearch.phone}
                  className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <div className="flex justify-center mt-0 ">
              <button
                type="submit"
                className="rounded-lg bg-orange-600 hover:bg-orange-500 px-3 py-1 text-white"
              >
                <div className="flex space-x-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426M10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
                    />
                  </svg>
                  <span>Search</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormSearch;
