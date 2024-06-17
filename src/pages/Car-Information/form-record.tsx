import { useState } from "react";
import FormInput from "../../components/FormInput";
import inputList from "./input-form";



const FormRecord = () => {
  const [payload, setPayload] = useState<any>({});
  const returnInputChange = (result: any) => {
    console.log("result--> ", result);
    setPayload(result);
  };

  const onSubmit = () => {
    console.log("payload--> ", payload);
  }

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">บันทึกข้อมูล</p>
          <button className="bg-green-700 bg-green-700 text-white font-bold py-1 px-4 rounded-lg hover:bg-green-600">
            <div className="flex space-x-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32"
                />
              </svg>
              <span>ข้อมูลใหม่</span>
            </div>
          </button>
        </div>

        <div className="mt-5 px-3 pb-6">
          <FormInput
            inputList={inputList}
            returnInputChange={returnInputChange}
          />
          <div className="flex justify-end px-3">
            <button
              onClick={onSubmit}
              type="button"
              className="rounded-lg bg-orange-600 hover:bg-orange-500 px-3 py-1 text-white"
            >
              <div className="flex space-x-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M362.7 64h-256C83 64 64 83.2 64 106.7v298.7c0 23.5 19 42.7 42.7 42.7h298.7c23.5 0 42.7-19.2 42.7-42.7v-256L362.7 64zM256 405.3c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64zM320 192H106.7v-85.3H320V192z"
                    fill="currentColor"
                  />
                </svg>
                <span>บันทึก</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormRecord;
