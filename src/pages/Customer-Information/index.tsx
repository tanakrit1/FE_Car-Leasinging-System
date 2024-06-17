import dayjs from "dayjs";
import { useState } from "react";
import FormCustomer from "./form-customer";
import FormGuarantor from "./form-guarantor";
import FormGuarantee from "./form-guarantee";

const CustomerInformation = () => {
  const [payloadCustomer, setPayloadCustomer] = useState<any>();
  const [payloadGuarantor, setPayloadGuarantor] = useState<any>();
  const [payloadGuarantee, setPayloadGuarantee] = useState<any>();

  const returnInputCustomerChange = (result: any) => {
    console.log("inputCustomer---> ", result);
    setPayloadCustomer(result);
  };

  const returnInputGuarantorChange = (result: any) => {
    console.log("inputGuarantor---> ", result);
    setPayloadGuarantor(result);
  };

  const returnInputGuaranteeChange = (result: any) => {
    console.log("inputGuarantee---> ", result);
    setPayloadGuarantee(result);
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

      <div className="flex space-x-2 mt-5">
        <div className="w-2/3">
          <div>
            <FormCustomer returnInputChange={returnInputCustomerChange} />
          </div>
          <div className="mt-5">
            <FormGuarantor returnInputChange={returnInputGuarantorChange} />
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <FormGuarantee returnInputChange={returnInputGuaranteeChange} />
          </div>
          <div className="mt-5 flex justify-between">
                <div className="w-1/2 px-3">
                    <button className="w-full bg-green-500 hover:bg-green-600 rounded-lg text-white px-1 py-3">
                        อนุมัติ
                    </button>
                </div>
                <div className="w-1/2 px-3">
                <button className="w-full bg-red-500 hover:bg-red-600 rounded-lg text-white px-1 py-3">ไม่อนุมัติ</button>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomerInformation;
