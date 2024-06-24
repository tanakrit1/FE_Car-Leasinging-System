import { useState } from "react";
import FormSearch from "./form-search";

const Payment = () => {
    const [payloadSearch, setPayloadSearch] = useState<any>({});

    const onChangeInputSearch = (event: any) => {
        console.log("event--> ", event)
        setPayloadSearch(event)
    }

    const onSearchData = () => {
        console.log("payloadSearch--> ", payloadSearch)
    }

  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold text-2xl text-white">ชำระค่างวด</p>
        {/* <div className="flex space-x-2">
          <span className="text-white font-semibold">รหัส : xxxxxxxxx</span>
          <span className="text-white font-semibold">|</span>
          <span className="text-white font-semibold">
            {" "}
            วันที่ซื้อ : {dayjs().format("DD/MM/YYYY")}
          </span>
        </div> */}
      </div>

      <div style={{ height: "78vh" }}>
        <div className="flex space-x-2 mt-5 h-1/2">
          <FormSearch returnInputChange={onChangeInputSearch} returnSearchData={onSearchData}/>
        </div>
        <div className="flex space-x-2 mt-5 h-1/2">
          {/* <FormSearch /> */}
        </div>
      </div>
    </>
  );
};
export default Payment;
