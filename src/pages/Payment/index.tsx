// import { useLocation } from "react-router-dom";

import { useState } from "react";
import ModalSearch from "./modal-search";
import FormDetail from "./form-detail";
import FormPayment from "./form-payment";
import _SaleItemApi from "../../api/saleItem";

const Payment = () => {
  //   const location = useLocation();
  //   console.log("location--> ", location);
  const [showModalSearchSale, setShowModalSearchSale] =
    useState<boolean>(false);
  const [payloadCustomer, setPayloadCustomer] = useState<any>({
    customerName: "",
    address: "",
    idCardNumber: "",
    interestType: "",
    interestRate: "",
    phoneNumber: "",
    downPayment: "",
    totalOrder: "",
    paymentAmount: "",
    numInstallments: "",
    remainingBalance: "",
    guarantors: [],
  });

  const onClearData = () => {
    setPayloadCustomer({
      customerName: "",
      address: "",
      idCardNumber: "",
      interestType: "",
      interestRate: "",
      phoneNumber: "",
      downPayment: "",
      totalOrder: "",
      paymentAmount: "",
      numInstallments: "",
      remainingBalance: "",
      guarantors: [],
      discount: ""
    });
  };
  const onViewData = (data: any) => {
    setShowModalSearchSale(false);
    setPayloadCustomer(data);
    console.log("data--> ", data);
  };

  const onRefetchDetail = async(saleID: any) => {
    if (saleID !== undefined && saleID !== null && saleID !== "") {
        const json = {
            page: 1,
            limit: 200,
            filterModel: {
                // "quickFilterLogicOperator":"and",
                // "quickFilterValues":"9",
                logicOperator: "and",
                items: [
                     {
                        field: "id",
                        operator: "equals",
                        value: saleID
                    }
                ]
            }
        }
        const resultRows = await _SaleItemApi().search(json);
        if (resultRows.statusCode === 200) {
          if (resultRows.data.length === 0) {
            return alert("ไม่พบข้อมูล");
          }
          setPayloadCustomer(resultRows.data[0])
          console.log(resultRows.data[0]);
         
        }
    }
  }

  return (
    <>
      <ModalSearch
        showModal={showModalSearchSale}
        returnShowModal={() => setShowModalSearchSale(false)}
        returnViewData={onViewData}
      />
      <div className="flex justify-between">
        <p className="font-bold text-2xl text-white">ชำระเงิน</p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowModalSearchSale(true)}
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
              <span>ค้นหาลูกค้า</span>
            </div>
          </button>

          <button
            onClick={onClearData}
            type="button"
            className="rounded-lg bg-gray-500 hover:bg-gray-400 px-3 py-1 text-white"
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
                  d="M11.995 4a8 8 0 1 0 7.735 10h-2.081a6 6 0 1 1-5.654-8a5.92 5.92 0 0 1 4.223 1.78L13 11h7V4l-2.351 2.35A7.965 7.965 0 0 0 11.995 4Z"
                />
              </svg>
              <span>ล้างข้อมูล</span>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-5">
        <FormDetail dataInput={payloadCustomer} onRefetchDetail={onRefetchDetail} />
      </div>

      {payloadCustomer?.id && (
        <div className="mt-5">
          <FormPayment payloadCustomer={payloadCustomer} onRefetchDetail={onRefetchDetail} />
        </div>
      )}
    </>
  );
};

export default Payment;
