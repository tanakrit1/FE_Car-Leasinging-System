import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { inputCar } from "./input-form";

interface propsFormCar {
  returnInputChange: (result: any) => void;
}

const FormCar = ({ returnInputChange }: propsFormCar) => {
  const [inputList, setInputList] = useState<any>(inputCar);
  const [payload, setPayload] = useState<any>({});
  const [carType, setCarType] = useState<string>("buy");

  useEffect(() => {
    let objPayload: any = {};
    for (let i = 0; i < inputList.length; i++) {
      objPayload = { ...objPayload, [inputList[i].name]: inputList[i].value };
    }
    objPayload = { ...objPayload, carType: "buy" };
    setPayload(objPayload);
  }, []);

  useEffect(() => {
    const mapNew = inputList.map((item: any) => {
      return { ...item, disabled: carType === "buy" ? true : false, value: "" };
    });
    let objPayload: any = {};
    for (let i = 0; i < mapNew.length; i++) {
      objPayload = { ...objPayload, [mapNew[i].name]: mapNew[i].value };
    }
    objPayload = { ...objPayload, carType: carType };
    setPayload(objPayload);
    setInputList(mapNew);
    console.log("objPayload--> ", objPayload);
  }, [carType]);
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg justify-between">
          <p className="text-white text-xl font-bold">ข้อมูลรถ</p>
          {carType === "buy" && (
            <button
              onClick={() => {}}
              type="button"
              className="bg-yellow-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-yellow-400"
            >
              <div className="flex space-x-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34M208 336c-70.7 0-128-57.2-128-128c0-70.7 57.2-128 128-128c70.7 0 128 57.2 128 128c0 70.7-57.2 128-128 128"
                  />
                </svg>
                <span>ค้นหารถจากคลัง</span>
              </div>
            </button>
          )}
        </div>

        <div className="mt-5 px-3 pb-6">
          <div className="flex space-x-10 mb-5 px-3">
            <div className="flex space-x-2">
              <input
                type="radio"
                name="typeCar"
                value="buy"
                checked={carType === "buy"}
                onChange={() => setCarType("buy")}
                className="radio radio-warning"
                defaultChecked
              />
              <p className="text-white font-semibold">ขายรถ</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="radio"
                name="typeCar"
                value="pledge"
                checked={carType === "pledge"}
                onChange={() => setCarType("pledge")}
                className="radio radio-warning"
              />
              <p className="text-white font-semibold">รับจำนำรถ</p>
            </div>
          </div>
          <FormInput
            inputList={inputList}
            returnInputChange={returnInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default FormCar;
