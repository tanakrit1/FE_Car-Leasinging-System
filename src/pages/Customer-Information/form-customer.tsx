import { useEffect, useState } from "react";
import { formatNumber } from "../../helpers/function-service";
// import FormInput from "../../components/FormInput";
// import { inputCustomer } from "./input-form";

interface propsFormCustomer {
  returnInputChange: (result: any) => void;
  payloadCustomer: any;
  stateForm: string;
}

// const ddlSaleType = [
//     { label: "ขายรถ", value: "buy" },
//     { label: "รับจำนำ", value: "pledge" }
// ]

const FormCustomer = ({
  returnInputChange,
  payloadCustomer,
  stateForm,
}: propsFormCustomer) => {
  const [payload, setPayload] = useState<any>(payloadCustomer);
  const [disableForm, setDisableForm] = useState<boolean>(false);
//   const [formEdit, setFormEdit] = useState<boolean>(false);
  const [processPayload, setProcessPayload] = useState<any>({
    amountPerMonth: "",
    totalAmount: "",
  });

  useEffect(() => {
    setDisableForm(stateForm === "view" ? true : false);
    // setFormEdit(stateForm === "view" ? true : false);
  }, [stateForm]);

  //   fnsetFormatNumber(Math.ceil((Number(payloadCustomer.totalOrder)/Number(payloadCustomer.numInstallments) + Number(payloadCustomer.interestMonth))).toString()) || ""

  const onChangeInput = (event: any) => {
    if (
      event.target.name === "totalOrder" ||
      event.target.name === "numInstallments" ||
      event.target.name === "interestRate"
    ) {
      //totalOrder numInstallments interestRate
      const input =
        event.target.name === "totalOrder"
          ? event.target.value.replace(/,/g, "")
          : event.target.value;
      // setPayload({ ...payload, [event.target.name]: input });
      const totalOrder =
        event.target.name === "totalOrder"
          ? Number(input)
          : Number(payload.totalOrder);
      const interestRate =
        event.target.name === "interestRate" ? input : payload.interestRate;
      // const numInstallments = event.target.name==="numInstallments" ? input : payload.numInstallments;

      const interestPerMonth = Math.ceil(
        Number(totalOrder) * (Number(interestRate) / 100)
      ); // ได้ดอกเบี้ยต่อเดือน

      // const amountPerMonth = Math.ceil((Number(totalOrder) / Number(numInstallments)) + interestPerMonth)
      // const totalAmount = Math.ceil(Number(totalOrder) + ( interestPerMonth * Number(numInstallments) ))
      // setProcessPayload({amountPerMonth: amountPerMonth, totalAmount: totalAmount})
      setPayload({
        ...payload,
        [event.target.name]: input,
        interestMonth: interestPerMonth,
      });
    } else {
      setPayload({ ...payload, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    setPayload(payloadCustomer);
    const totalOrder = payloadCustomer.totalOrder
      ? Number(payloadCustomer.totalOrder.replace(/,/g, ""))
      : 0;
    const numInstallments = payloadCustomer.numInstallments
      ? Number(payloadCustomer.numInstallments)
      : 0;
    const interestMonth = payloadCustomer.interestMonth
      ? Number(payloadCustomer.interestMonth)
      : 0;

    // console.log("totalOrder--> ", totalOrder)
    // console.log("numInstallments--> ", numInstallments)
    // console.log("interestMonth--> ", interestMonth)

    let amountPerMonth: any = Math.ceil(
      totalOrder / numInstallments + interestMonth
    );
    if (isNaN(amountPerMonth) || amountPerMonth == Infinity) {
      // console.log("***")
      amountPerMonth = "";
    }
    console.log("amountPerMonth--> ", amountPerMonth); //NaN
    const totalAmount = Math.ceil(totalOrder + interestMonth * numInstallments);
    setProcessPayload({
      amountPerMonth: amountPerMonth,
      totalAmount: totalAmount,
    });
    // setProcessPayload({ amountPerMonth: "", totalAmount: "" })
  }, [payloadCustomer]);

  useEffect(() => {
    returnInputChange(payload);
  }, [payload]);

  const fnsetFormatNumber = (value: string) => {
    const numericValue = value?.toString()?.replace(/,/g, "");
    return formatNumber(numericValue);
  };

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
                disabled={false}
                autoComplete="off"
                type="text"
                name="customerName"
                value={payloadCustomer.customerName}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    false ? "bg-slate-300" : "bg-slate-50"
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
                disabled={false}
                autoComplete="off"
                type="text"
                name="address"
                value={payloadCustomer.address}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    false ? "bg-slate-300" : "bg-slate-50"
                  }`}
              />
            </div>

            {/* <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เลขประจำตัวประชาชน :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                // disabled={disableForm}
                autoComplete="off"
                type="number"
                name="idCardNumber"
                value={payloadCustomer.idCardNumber}
                className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
              />
            </div> */}

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เบอร์ติดต่อ :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={false}
                autoComplete="off"
                type="number"
                name="phoneNumber"
                value={payloadCustomer.phoneNumber}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    false ? "bg-slate-300" : "bg-slate-50"
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

            {/* <div className="basis-4/12 px-2">
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
            </div> */}

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                GPS :<span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={false}
                autoComplete="off"
                type="text"
                name="gps"
                value={payloadCustomer.gps}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    false ? "bg-slate-300" : "bg-slate-50"
                  }`}
              />
            </div>
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                วันที่ทำสัญญา :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="date"
                name="contractDate"
                value={payloadCustomer.contractDate}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    disableForm ? "bg-slate-300" : "bg-slate-50"
                  }`}
              />
            </div>

            <div className="basis-8/12 px-2">
              <p className="text-white font-semibold mb-1">
                หมายเหตุ :
              </p>
              <input
                onChange={onChangeInput}
                disabled={false}
                autoComplete="off"
                type="text"
                name="saleItemNote"
                value={payloadCustomer.saleItemNote}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    false ? "bg-slate-300" : "bg-slate-50"
                  }`}
              />
            </div>

            <div className="w-full divider text-white">ข้อมูลการชำระเงิน</div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เงินดาวน์ :
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="downPayment"
                value={fnsetFormatNumber(payloadCustomer.downPayment) || ""}
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
                type="text"
                name="totalOrder"
                value={fnsetFormatNumber(payloadCustomer.totalOrder) || ""}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                  disableForm ? "bg-slate-300" : "bg-slate-50"
                }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ระยะสัญญา(เดือน) :
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

            {payloadCustomer.interestType === "คงที่" && (
              <div className="basis-4/12 px-2">
                <p className="text-white font-semibold mb-1">
                  ดอกเบี้ยต่อเดือน :
                  <span className="text-red-500 font-semibold text">*</span>
                </p>
                <input
                  disabled={true}
                  autoComplete="off"
                  type="text"
                  name="interestMonth"
                  value={fnsetFormatNumber(payloadCustomer.interestMonth)}
                  className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                />
              </div>
            )}

            {payloadCustomer.interestType === "คงที่" && (
              <div className="basis-4/12 px-2">
                <p className="text-white font-semibold mb-1">
                  ค่างวดต่อเดือน :
                  <span className="text-red-500 font-semibold text">*</span>
                </p>
                <input
                  disabled={true}
                  autoComplete="off"
                  type="text"
                  name="interestMonth"
                  //   value={fnsetFormatNumber(Math.ceil((Number(payloadCustomer.totalOrder)/Number(payloadCustomer.numInstallments) + Number(payloadCustomer.interestMonth))).toString()) || ""}
                  value={
                    processPayload.amountPerMonth != ""
                      ? fnsetFormatNumber(processPayload.amountPerMonth)
                      : ""
                  }
                  className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                />
              </div>
            )}

            {payloadCustomer.interestType === "คงที่" && (
              <div className="basis-4/12 px-2">
                <p className="text-white font-semibold mb-1">
                  เงินต้นรวมดอกเบี้ยทั้งหมด :
                  <span className="text-red-500 font-semibold text">*</span>
                </p>
                <input
                  disabled={true}
                  autoComplete="off"
                  type="text"
                  name="interestMonth"
                  value={
                    processPayload.totalAmount != ""
                      ? fnsetFormatNumber(processPayload.totalAmount)
                      : ""
                  }
                  className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                />
              </div>
            )}

            
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCustomer;
