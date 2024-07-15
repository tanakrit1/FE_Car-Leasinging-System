import { useEffect, useState } from "react";
// import FormInput from "../../components/FormInput";
// import { inputCustomer } from "./input-form";

interface propsFormCustomer {
  returnInputChange: (result: any) => void;
  payloadCustomer: any;
  disableForm: boolean
}

// const ddlSaleType = [
//     { label: "ขายรถ", value: "buy" },
//     { label: "รับจำนำ", value: "pledge" }
// ]

const FormCustomer = ({ returnInputChange, payloadCustomer, disableForm }: propsFormCustomer) => {
  const [payload, setPayload] = useState<any>(payloadCustomer);

  const onChangeInput = (event: any) => {
    console.log("event.target.value--> ", event.target.value)
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };

  useEffect(()=> {
    returnInputChange(payload)
  }, [payload])
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">ข้อมูลลูกค้า</p>
        </div>

        <div className="mt-5 px-3 pb-6">
          <div className="flex flex-row flex-wrap">
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ชื่อ :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="customerName"
                value={payloadCustomer.customerName}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-8/12 px-2">
              <p className="text-white font-semibold mb-1">
                ที่อยู่ :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="address"
                value={payloadCustomer.address}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เลขประจำตัวประชาชน :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="idCardNumber"
                value={payloadCustomer.idCardNumber}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เบอร์ติดต่อ :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="phoneNumber"
                value={payloadCustomer.phoneNumber}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เงินดาวน์ :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="downPayment"
                value={payloadCustomer.downPayment}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ยอดจัด :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="totalOrder"
                value={payloadCustomer.totalOrder}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            {/* <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
              การซื้อ :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <select
                onChange={onChangeInput}
                disabled={disableForm}
                name="saleType"
                value={payloadCustomer.saleType}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              >
                <option value="">------ เลือก ------</option>
                {ddlSaleType.map(
                  (item: any, indexList: number) => (
                    <option key={"list" + indexList} value={item.value}>
                      {item.label}
                    </option>
                  )
                )}
              </select>
            </div> */}

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                จำนวนงวด :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="numInstallments"
                value={payloadCustomer.numInstallments}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                อัตราดอกเบี้ย (%) :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="interestRate"
                value={payloadCustomer.interestRate}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                การชำระดอกเบี้ย :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <select
                onChange={onChangeInput}
                disabled={disableForm}
                name="interestType"
                value={payloadCustomer.interestType}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              >
                <option value="">------ เลือก ------</option>
                {["คงที่", "ลดต้น/ลดดอก"].map(
                  (item: any, indexList: number) => (
                    <option key={"list" + indexList} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ดอกเบี้ย/เดือน :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="interestMonth"
                value={payloadCustomer.interestMonth}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ส่วนลด :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="number"
                name="discount"
                value={payloadCustomer.discount}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                GPS :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="gps"
                value={payloadCustomer.gps}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCustomer;
