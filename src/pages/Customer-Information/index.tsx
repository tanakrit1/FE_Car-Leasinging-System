import dayjs from "dayjs";
import { useState } from "react";
import FormCustomer from "./form-customer";
import FormGuarantor from "./form-guarantor";
import FormCar from "./form-car";
import { validateInputRequired } from "../../helpers/function-service";

const CustomerInformation = () => {
  const [payloadCustomer, setPayloadCustomer] = useState<any>();
  const [payloadGuarantor, setPayloadGuarantor] = useState<any>([{guarantorName: "", guarantorAddress: "", guarantorIdCard: "", guarantorPhone: ""}]);
  const [payloadCar, setPayloadCar] = useState<any>({
    carBrand: "",
    model: "",
    carColor: "",
    carDate: "",
    licensePlate: "",
    engineNumber: "",
    vin: "",
    sellingPrice: "",
    id: "",
    carType: "",
  });
  const [validationForm, setValidationForm] = useState<any>({
    customer: false,
    guarantor: false,
    car: false,
  });
  const [tabActive, setTabActive] = useState<number>(1);

  const returnInputCustomerChange = (result: any) => {
    console.log("result--> ", result)
    setPayloadCustomer(result);

    const validateCustomer = payloadCustomer
      ? validateInputRequired(result)
      : false;
    setValidationForm({
      ...validationForm,
      customer: validateCustomer ? true : false,
    });
  };

  const returnInputGuarantorChange = (result: any) => {
    setPayloadGuarantor(result);

    let validateGuarantor = false;
    for (let i = 0; i < result?.length; i++) {
      const valid = validateInputRequired(result[i]);
      if (valid === false) {
        validateGuarantor = false;
        break;
      }
      validateGuarantor = true;
    }

    setValidationForm({
      ...validationForm,
      guarantor: validateGuarantor ? true : false,
    });
  };

  const returnInputCarChange = (result: any) => {
    setPayloadCar(result);

    let newPayloadCar = {};
    for (let field in result) {
      if (field !== "id") {
        newPayloadCar = { ...newPayloadCar, [field]: result[field] };
      }
    }
    const validateCar = payloadCar
      ? validateInputRequired(newPayloadCar)
      : false;
    setValidationForm({ ...validationForm, car: validateCar ? true : false });
  };

  const onChangeTab = (newTab: number) => {
    setTabActive(newTab);
  };

  const fnCheckValidation = () => {
    if (
      validationForm.customer &&
      validationForm.guarantor &&
      validationForm.car
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold text-2xl text-white">ข้อมูลลูกค้า</p>
        <div className="flex space-x-2">
          <span className="text-white font-semibold">รหัส : xxxxxxxxx</span>
          <span className="text-white font-semibold">|</span>
          <span className="text-white font-semibold">
            {" "}
            วันที่ซื้อ : {dayjs().format("DD/MM/YYYY")}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex  justify-between">
          <div className="flex">
            <div
              onClick={() => onChangeTab(1)}
              className={`cursor-pointer h-16 bg-white hover:bg-gray-300 w-60 rounded-l-lg border-r-2 flex items-center justify-center space-x-3 px-3 ${
                tabActive === 1 && `border-b-4 border-b-amber-600`
              }`}
            >
              <svg
                className={validationForm.customer ? "text-green-500" : ""}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                />
              </svg>
              <span className="font-bold text-black">ข้อมูลลูกค้า</span>
            </div>
            <div
              onClick={() => onChangeTab(2)}
              className={`cursor-pointer h-16 bg-white hover:bg-gray-300 w-60 flex items-center border-r-2 justify-center space-x-3 px-3 ${
                tabActive === 2 && `border-b-4 border-b-amber-600`
              }`}
            >
              <svg
                className={validationForm.guarantor ? "text-green-500" : ""}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                />
              </svg>
              <span className="font-bold text-black">ข้อมูลผู้ค้ำประกัน</span>
            </div>
            <div
              onClick={() => onChangeTab(3)}
              className={`cursor-pointer h-16 bg-white hover:bg-gray-300 w-60 rounded-r-lg flex items-center justify-center space-x-3 px-3 ${
                tabActive === 3 && `border-b-4 border-b-amber-600`
              }`}
            >
              <svg
                className={validationForm.car ? "text-green-500" : ""}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                />
              </svg>
              <span className="font-bold text-black">ข้อมูลรถ</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {}}
              type="button"
              className="bg-green-700 bg-green-700 text-white font-bold py-1 px-4 rounded-lg hover:bg-green-600"
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
                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32"
                  />
                </svg>
                <span>ข้อมูลใหม่</span>
              </div>
            </button>
            <button
              //   onClick={onShowModalSearch}
              type="button"
              className="bg-orange-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-orange-400"
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
                <span>ค้นหาข้อมูล</span>
              </div>
            </button>
          </div>
        </div>

        <div className="w-full mt-5">
          {tabActive === 1 ? (
            <div>
              <FormCustomer returnInputChange={returnInputCustomerChange} />
            </div>
          ) : tabActive === 2 ? (
            <div>
              <FormGuarantor payloadGuarantor={payloadGuarantor} returnInputChange={returnInputGuarantorChange} />
            </div>
          ) : (
            <FormCar
              returnPayload={returnInputCarChange}
              payloadData={payloadCar}
            />
          )}
        </div>

        {fnCheckValidation() && (
          <div className="mt-8 flex justify-end">
            <button className="bg-orange-600 hover:bg-orange-500 rounded-lg text-white px-16 py-3 font-bold">
              <div className="flex items-center space-x-3">
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
        )}
      </div>
    </>
  );
};
export default CustomerInformation;
