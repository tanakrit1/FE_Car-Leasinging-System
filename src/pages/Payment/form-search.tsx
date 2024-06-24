import { useState } from "react";
import FormInput from "../../components/FormInput";

const inputSearchInfo = [
  {
    name: "a",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: false,
  },
  {
    name: "b",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: false,
  },
  {
    name: "c",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: false,
  },
  {
    name: "d",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: false,
  },
  {
    name: "e",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: false,
  },
];

const FormSearch = ({ returnInputChange, returnSearchData }: any) => {
  const [inputSearch, setInputSearch] = useState<any>(inputSearchInfo);

  const onClearForm = () => {
    setInputSearch([
      {
        name: "a",
        label: "รุ่น",
        type: "text",
        placeholder: "b",
        width: "4/12",
        value: "",
        disabled: false,
        requied: false,
      },
      {
        name: "b",
        label: "รุ่น",
        type: "text",
        placeholder: "b",
        width: "4/12",
        value: "",
        disabled: false,
        requied: false,
      },
      {
        name: "c",
        label: "รุ่น",
        type: "text",
        placeholder: "b",
        width: "4/12",
        value: "",
        disabled: false,
        requied: false,
      },
      {
        name: "d",
        label: "รุ่น",
        type: "text",
        placeholder: "b",
        width: "4/12",
        value: "",
        disabled: false,
        requied: false,
      },
      {
        name: "e",
        label: "รุ่น",
        type: "text",
        placeholder: "b",
        width: "4/12",
        value: "",
        disabled: false,
        requied: false,
      },
    ]);
    console.log("inputSearchInfo--> ", inputSearchInfo);
    returnInputChange({});
  };

  const onSearchData = () => {
    return returnSearchData()
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
          <FormInput
            inputList={inputSearch}
            returnInputChange={returnInputChange}
          />
          <div className="flex justify-center space-x-6">
            <button className="rounded-lg bg-orange-600 hover:bg-orange-500 px-3 py-1 text-white" onClick={onSearchData}>
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
        </div>
      </div>
    </>
  );
};

export default FormSearch;
