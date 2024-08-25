import { useEffect, useState } from "react";
// import FormInput from "../../components/FormInput";
import ModalSearchStock from "./modal-search-stock";
import CarBand from "../../assets/car-brand.json"
import { formatNumber } from "../../helpers/function-service";
import CarType from '../../assets/car-type.json'

interface propsFormCar {
  returnPayload: (result: any) => void;
  payloadData: any;
  stateForm: string;
}

const FormCar = ({
  returnPayload,
  payloadData,
  stateForm,
}: propsFormCar) => {
  const [payload, setPayload] = useState<any>(payloadData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const [disableRadio, setDisableRadio] = useState<boolean>(false);

    useEffect(()=> {
        setDisableRadio(stateForm == "view" ? true : false);
        setDisableForm(stateForm == "view" ? true : false);
    }, [stateForm])

//   useEffect(() => {
//     setDisableForm(payload?.carType === "buy" ? true : false);
//   }, []);

  useEffect(() => {
    returnPayload(payload);
  }, [payload]);

  const onChangeCarType = (newCarType: string) => {
    setDisableForm(newCarType === "buy" ? true : false);

    let clonePayload = { ...payloadData };
    for (let field in clonePayload) {
      clonePayload[field] = "";
    }
    setPayload({ ...clonePayload, carType: newCarType });
  };

  const onViewData = (row: any) => {
    let clonePayload = { ...payloadData };
    for (let field in clonePayload) {
      clonePayload[field] = row[field];
    }
    setPayload(clonePayload);
    setShowModal(false);
  };

  const onShowModalSearch = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if( stateForm == "view" ){
        return setDisableForm(true)
    }
    setDisableForm(payloadData.carType === "buy" ? true : false);
  }, [payloadData.carType]);

  const onChangeInput = (event: any) => {
    const input = (event.target.name == "sellingPrice" || event.target.name == "priceOther") ? event.target.value.replace(/,/g, "") : event.target.value
    setPayload({ ...payloadData, [event.target.name]: input });
  };

  const fnsetFormatNumber = (value: string) => {
    const numericValue = value?.toString().replace(/,/g, "");
    return formatNumber(numericValue)
  }

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg justify-between">
          <p className="text-white text-xl font-bold">ข้อมูลรถ</p>
          {payloadData.carType === "buy" && stateForm !== "view" && (
            <button
              onClick={onShowModalSearch}
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
                disabled={disableRadio}
                type="radio"
                name="typeCar"
                value="buy"
                checked={payloadData.carType === "buy"}
                onChange={() => onChangeCarType("buy")}
                className="radio radio-warning"
                defaultChecked
              />
              <p className="text-white font-semibold">ขายรถ</p>
            </div>
            <div className="flex space-x-2">
              <input
                disabled={disableRadio}
                type="radio"
                name="typeCar"
                value="pledge"
                checked={payloadData.carType === "pledge"}
                onChange={() => onChangeCarType("pledge")}
                className="radio radio-warning"
              />
              <p className="text-white font-semibold">รับจำนำรถ</p>
            </div>
            <div className="flex space-x-2">
              <input
                disabled={disableRadio}
                type="radio"
                name="typeCar"
                value="other"
                checked={payloadData.carType === "other"}
                onChange={() => onChangeCarType("other")}
                className="radio radio-warning"
              />
              <p className="text-white font-semibold">อื่นๆ</p>
            </div>
          </div>

          { payloadData.carType === "other" ? (
            <div className="flex flex-row flex-wrap">
                <div className="basis-4/12 px-2">
                    <p className="text-white font-semibold mb-1">
                        หมายเหตุ :
                        <span className="text-red-500 font-semibold text">*</span>
                    </p>
                    <input
                        onChange={onChangeInput}
                        disabled={disableForm}
                        autoComplete="off"
                        type="text"
                        name="productOther"
                        value={payloadData.productOther}
                        className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                        disableForm ? "bg-slate-300" : "bg-slate-50"
                        }`}
                    />
                </div>

                <div className="basis-4/12 px-2">
                    <p className="text-white font-semibold mb-1">
                        ราคาขาย : 
                        <span className="text-red-500 font-semibold text">*</span>
                    </p>
                    <input
                        onChange={onChangeInput}
                        disabled={disableForm}
                        autoComplete="off"
                        type="text"
                        name="priceOther"
                        value={fnsetFormatNumber(payloadData.priceOther)}
                        className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                        disableForm ? "bg-slate-300" : "bg-slate-50"
                        }`}
                    />
                </div>

            </div>
          )  : (
          <div className="flex flex-row flex-wrap">
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ประเภทรถ :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <select
                onChange={onChangeInput}
                disabled={disableForm}
                name="carCategory"
                value={payloadData.carCategory}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              >
                <option value="">------ เลือก ------</option>
                {CarType.map(
                  (item: any, indexList: number) => (
                    <option key={"list" + indexList} value={item.value}>
                      {item.label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ยี่ห้อ :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <select
                onChange={onChangeInput}
                disabled={disableForm}
                name="carBrand"
                value={payloadData.carBrand}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              >
                <option value="">------ เลือก ------</option>
                {CarBand.map(
                  (item: any, indexList: number) => (
                    <option key={"list" + indexList} value={item.value}>
                      {item.label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                รุ่น :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="model"
                value={payloadData.model}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                สี :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="carColor"
                value={payloadData.carColor}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ปี :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="carDate"
                value={payloadData.carDate}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ทะเบียนรถ :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="licensePlate"
                value={payloadData.licensePlate}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            {/* <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เลขเครื่องยนต์ :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="engineNumber"
                value={payloadData.engineNumber}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div> */}

            {/* <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เลขตัวถัง :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="vin"
                value={payloadData.vin}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div> */}

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ราคาขาย : 
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="sellingPrice"
                value={fnsetFormatNumber(payloadData.sellingPrice)}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>
          </div>
          )}
        </div>
      </div>
      <ModalSearchStock
        showModal={showModal}
        returnShowModal={() => setShowModal(false)}
        returnViewData={onViewData}
      />
    </>
  );
};

export default FormCar;
