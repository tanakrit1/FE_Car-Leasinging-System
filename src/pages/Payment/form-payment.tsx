import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
// import TableList from "../../components/TableList";
import _PaymentApi from "../../api/payment";
import { LoadContext } from "../../context/loading-context";
import { getLoginStorage } from "../../helpers/set-storage";

const columns = [
  { label: "วันที่ชำระ", width: "20%", field: "datePay" },
  { label: "เงินต้น", width: "15%", field: "amountPay" },
  { label: "ดอกเบี้ย", width: "15%", field: "InterestPay" },
  { label: "ค่าปรับ", width: "15%", field: "fee" },
  { label: "วิธีชำระ", width: "15%", field: "methodPay" },
  { label: "ผู้รับชำระ", width: "20%", field: "receiver" },
];

const FormPayment = ({ payloadCustomer, onRefetchDetail }: any) => {
  const context = useContext(LoadContext);
  const loginStorage = getLoginStorage()?.profile;
  const [amount, setAmount] = useState<any>("");
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({
    methodPay: "เงินสด",
    receiver: loginStorage?.firstName + "  " + loginStorage?.lastName,
    amountPay: "", //เงินต้น
    InterestPay: "", //ดอกเบี้ย
    fee: "", //ค่าปรับ
    datePay: dayjs().format("YYYY-MM-DD"), //วันที่จ่าย
  });
  const [rowsHistory, setRowsHistory] = useState<any>([]);

  const onClearForm = () => {
    setPayload({
      methodPay: "เงินสด",
      receiver: loginStorage?.firstName + "  " + loginStorage?.lastName,
      amountPay: "", //เงินต้น
      InterestPay: "", //ดอกเบี้ย
      fee: "", //ค่าปรับ
      datePay: dayjs().format("YYYY-MM-DD"), //วันที่จ่าย
    });
    setAmount("");
  };

  const onLoadHistory = async (saleID: number) => {
    context?.setLoadingContext(true);
    const json = {
      page: 1,
      limit: 1000,
      sortField: "id",
      sortType: "DESC",
      filterModel: {
        logicOperator: "and",
        items: [
          {
            field: "saleItem_id",
            operator: "equals",
            value: saleID,
          },
        ],
      },
    };
    const result = await _PaymentApi().search(json);
    if (result.statusCode === 200) {
      const newRows = result.data.map((item: any) => {
        return { ...item, datePay: dayjs(item.datePay).format("DD/MM/YYYY") };
      });
      setRowsHistory(newRows);
    }
    console.log("result--> ", result);
    context?.setLoadingContext(false);
  };

  useEffect(() => {
    context?.setLoadingContext(true);
    const saleItemID = payloadCustomer.id;
    onClearForm();
    if (saleItemID !== undefined && saleItemID !== null && saleItemID !== "") {
      onLoadHistory(saleItemID);

      if (payloadCustomer.interestType === "คงที่") {
        const InterestPay =
          (Number(payloadCustomer.totalOrder) / Number(payloadCustomer.numInstallments)) * (Number(payloadCustomer.interestRate) / 100);
        setPayload({ ...payload, InterestPay: InterestPay.toFixed(2) });
      } else {
        // ลดต้นลดดอก
        const InterestPay =
          Number(payloadCustomer.remainingBalance) *
          (Number(payloadCustomer.interestRate) / 100);
        setPayload({ ...payload, InterestPay: InterestPay.toFixed(2) });
      }
      console.log("payloadCustomer--> ", payloadCustomer);
    }
    context?.setLoadingContext(false);
  }, [payloadCustomer.id, payloadCustomer.remainingBalance]);

  const onChangeMethodPay = (result: string) => {
    setPayload({ ...payload, methodPay: result });
  };

  //   const onChangeInput = (event: any) => {
  //     if (event.target.name === "amount") {
  //       setAmount(event.target.value);
  //       if( payloadCustomer.interestType === "คงที่" ){
  //         const resultProcess = (Number(payloadCustomer.totalOrder) / Number(payloadCustomer.numInstallments)) * (Number(payloadCustomer.interestRate) / 100);

  //       }else{   // ลดต้นลดดอก

  //       }
  //       console.log("da---> ", payloadCustomer);
  //       const amount = event.target.value;
  //       setPayload({ ...payload, amountPay: amount });
  //     } else {
  //       // fee
  //       setPayload({ ...payload, [event.target.name]: event.target.value });
  //     }
  //   };

  const onChangeInput = (event: any) => {
    if (event.target.name === "amount") {
        setAmount(event.target.value);
        const amountPay = Number(event.target.value) - Number(payload.InterestPay) - Number(payload.fee);
        setPayload({ ...payload, amountPay: amountPay.toFixed(2),  });
    }else if( event.target.name === "fee" ){
        const fee = event.target.value;
        const amountPay = Number(amount) - Number(payload.InterestPay) - Number(fee);
        setPayload({ ...payload, amountPay: amountPay.toFixed(2), fee: fee });
    }else{
        setPayload({ ...payload, [event.target.name]: event.target.value });
    }
  };

  const onSubmit = async () => {
    context?.setLoadingContext(true);
    const json = {
      ...payload,
      InterestPay: Number(payload.InterestPay),
      amountPay: Number(payload.amountPay),
      fee: Number(payload.fee),
      saleItem_id: Number(payloadCustomer.id),
    };
    const result = await _PaymentApi().create(json);
    if (result.statusCode === 200) {
      alert("บันทึกข้อมูลสำเร็จ");
      onClearForm();
      onLoadHistory(payloadCustomer.id);
      onRefetchDetail(payloadCustomer.id);
    }
    context?.setLoadingContext(false);
    console.log("resultSubmit--> ", result);
  };

  const onDeletePayment = async (row: any) => {
    if (window.confirm("คุณต้องการลบข้อมูลกรชำระเงินล่าสุด ใช่หรือไม่?")) {
      context?.setLoadingContext(true);
      const result = await _PaymentApi().delete(row.id);
      console.log("result--> ", result);
      if (result.statusCode === 200) {
        alert("ลบข้อมูลสำเร็จ");
        onClearForm();
        onLoadHistory(payloadCustomer.id);
        onRefetchDetail(payloadCustomer.id);
      }
      context?.setLoadingContext(false);
    }
  };

  useEffect( ()=> {
    console.log("***",  Number(payload.amountPay))
    if( payload.methodPay &&
        payload.InterestPay &&
        payload.fee &&
        Number(payload.amountPay) >= 0
    ){
        console.log("OK")
           return setShowSubmit(true)
    }

    setShowSubmit(false)
  }, [payload] )

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg justify-between">
          <p className="font-bold text-2xl text-white">ข้อมูลการชำระเงิน</p>
          <div className="flex space-x-3 items-center">
            <span className="text-white">ชำระครั้งที่</span>
            <div className="px-3 py-1 rounded-full bg-orange-500 text-white font-bold">{rowsHistory.length + 1}</div>
          </div>
        </div>

        <div className="mt-5 px-3 pb-6 ">
          <div className="flex space-x-10 mb-5 px-3">
            <div className="flex space-x-2">
              <input
                type="radio"
                name="methodPay"
                value="เงินสด"
                checked={payload.methodPay === "เงินสด"}
                onChange={() => onChangeMethodPay("เงินสด")}
                className="radio radio-warning"
                defaultChecked
              />
              <p className="text-white font-semibold">เงินสด</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="radio"
                name="methodPay"
                value="เงินโอน"
                checked={payload.methodPay === "เงินโอน"}
                onChange={() => onChangeMethodPay("เงินโอน")}
                className="radio radio-warning"
              />
              <p className="text-white font-semibold">เงินโอน</p>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                จำนวนเงินที่จ่ายจริง :
              </p>
              <input
                onChange={onChangeInput}
                type="number"
                name="amount"
                value={amount}
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เงินต้น :{" "}
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                disabled
                onChange={onChangeInput}
                type="number"
                name="amountPay"
                value={payload?.amountPay}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ดอกเบี้ย :{" "}
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                disabled
                onChange={onChangeInput}
                type="number"
                name="InterestPay"
                // value={3000}
                value={payload?.InterestPay}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ค่าปรับ :{" "}
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                onChange={onChangeInput}
                type="number"
                name="fee"
                value={payload.fee}
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">ผู้รับชำระ :</p>
              <input
                disabled
                type="text"
                name="receiver"
                value={payload?.receiver}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          </div>
          {/* amountPay InterestPay fee */}
          {showSubmit&& (
              <div className="basis-4/12 px-2 justify-end flex">
                <button
                  onClick={onSubmit}
                  type="button"
                  className="bg-orange-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-orange-400"
                >
                  <div className="flex py-2 px-4 items-center">
                    <span>บันทึก</span>
                  </div>
                </button>
              </div>
            )}

          <div className="w-full divider text-white">ประวัติการชำระเงิน</div>

          <div className="flex flex-wrap w-full">
            <table className="table table-pin-rows">
              <thead>
                <tr className="bg-slate-400">
                  {columns.map((item: any, index: number) => (
                    <th key={index} className="text-white text-lg">
                      {item.label}
                    </th>
                  ))}
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                {rowsHistory?.map((item: any, index: number) => (
                  <tr key={index}>
                    {columns.map((col: any, index: number) => (
                      <td key={index} className="text-white text-lg">
                        {item[col.field]}
                      </td>
                    ))}

                    {index === 0 && (
                      <td>
                        <button
                          className="rounded-full px-2 py-2 bg-slate-200 hover:bg-slate-400 hover:text-white"
                          onClick={() => onDeletePayment(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414M10 6h4V4h-4zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <TableList
              columns={columns}
              rows={rowsHistory || []}
              height="500px"
              removeAction
              clickRemove={onDeletePayment}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPayment;
