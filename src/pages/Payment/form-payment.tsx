import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import _PaymentApi from "../../api/payment";
import { LoadContext } from "../../context/loading-context";
import { getLoginStorage } from "../../helpers/set-storage";
import BankList from "../../assets/bank.json";
import ModalCloseOrder from "./modal-close-order";
import { formatNumber } from "../../helpers/function-service";

const columns = [
  { label: "วันที่ชำระ", width: "10%", field: "datePay" },
  { label: "เงินต้น", width: "10%", field: "amountPay" },
  { label: "ดอกเบี้ย", width: "10%", field: "InterestPay" },
  { label: "ค่าปรับ", width: "10%", field: "fee" },
  { label: "วิธีชำระ", width: "10%", field: "methodPay" },
  { label: "ธนาคาร", width: "15%", field: "bank" },
  { label: "ชื่อบัญชี", width: "15%", field: "accountName" },
  { label: "ผู้รับชำระ", width: "10%", field: "receiver" },
  { label: "Note", width: "10%", field: "note" },
];

// (Number(dataInput.totalOrder) + (Number(dataInput.interestMonth) * Number(dataInput.numInstallments))).toLocaleString()

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
    note: "",
    bank: "",
    accountName: ""
  });
  const [rowsHistory, setRowsHistory] = useState<any>([]);
  const [chipAmount, setChipAmount] = useState<any>({
    amountPay: 0,
    remaining: 0
  });
  const [formDisable, setFormDisable] = useState<boolean>(false);
  const [showModalCloseOrder, setShowModalCloseOrder] =
    useState<boolean>(false);

  const onClearForm = () => {
    setPayload({
      methodPay: "เงินสด",
      receiver: loginStorage?.firstName + "  " + loginStorage?.lastName,
      amountPay: "", //เงินต้น
      InterestPay: "", //ดอกเบี้ย
      fee: "", //ค่าปรับ
      datePay: dayjs().format("YYYY-MM-DD"), //วันที่จ่าย
      note: "",
      bank: "",
      accountName: ""
    });
    setAmount("");
    (document.getElementById("note") as HTMLFormElement).value = "";
  };

  const onLoadHistory = async (saleID: number, data: any) => {
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
    // console.log("load--> ", result)
    if (result.statusCode === 200) {
        let amountPay = 0
        for( let i=0; i < result.data.length; i++ ){
            amountPay = amountPay + ( Math.ceil(result.data[i].amountPay) +  Math.ceil(result.data[i].InterestPay) )
        }
        // setChipAmount({...chipAmount, amountPay: amountPay})

        if( data.interestType === "คงที่" ){
            const totalAmount = Number(data.totalOrder) + (Number(data.interestMonth) * Number(data.numInstallments))
            const remaining = totalAmount - amountPay
            setChipAmount({amountPay: amountPay, remaining: remaining,})
        }else{
            setChipAmount({amountPay: amountPay, remaining: data.remainingBalance})
        }
      const newRows = result.data.map((item: any) => {
        return { 
                ...item, 
                datePay: dayjs(item.datePay).format("DD/MM/YYYY"), 
                amountPay: Math.ceil(item.amountPay).toLocaleString(), 
                InterestPay: Math.ceil(item.InterestPay).toLocaleString() ,
                fee: Math.ceil(item.fee).toLocaleString()
            };
      });

      setRowsHistory(newRows);
    }
    context?.setLoadingContext(false);
  };

  useEffect(() => {
    context?.setLoadingContext(true);
    const saleItemID = payloadCustomer.id;
    onClearForm();
    if (saleItemID !== undefined && saleItemID !== null && saleItemID !== "") {
      onLoadHistory(saleItemID, payloadCustomer);

      if (payloadCustomer.interestType === "คงที่") {
        const InterestPay = payloadCustomer?.interestMonth
        setPayload({ ...payload, InterestPay: Math.ceil(InterestPay) });
      } else {
        // ลดต้นลดดอก
        const InterestPay =
          Math.ceil(payloadCustomer.remainingBalance) *
          (Math.ceil(payloadCustomer.interestRate) / 100);
        setPayload({ ...payload, InterestPay: Math.ceil(InterestPay) });
      }
    }

    if( payloadCustomer.statusInstallment === "Close" ){
        setFormDisable(true)
    }else{
        setFormDisable(false)
    }
    context?.setLoadingContext(false);
  }, [payloadCustomer.id, payloadCustomer.totalInterest]);

  const onChangeMethodPay = (result: string) => {
    if (result === "เงินสด") {
      setPayload({ ...payload, methodPay: result, bank: "" });
    } else {
      setPayload({ ...payload, methodPay: result });
    }
  };

  const onChangeInput = (event: any) => {
    if (event.target.name === "amount") {
      const input = event.target.value.replace(/,/g, "")
      setAmount(input);
      const amountPay = Number(input) - Number(payload.InterestPay) - Number(payload.fee);
      setPayload({ ...payload, amountPay: Math.ceil(amountPay) });
    } else if (event.target.name === "fee") {
      const fee = event.target.value.replace(/,/g, "")
      const amountPay = Number(amount) - Number(payload.InterestPay) - Number(fee);
      setPayload({ ...payload, amountPay: amountPay, fee: Math.ceil(fee) });
    } else {
      setPayload({ ...payload, [event.target.name]: event.target.value });
    }
  };

  const onSubmit = async () => {
    context?.setLoadingContext(true);
    const json = {
      ...payload,
      InterestPay: Math.ceil(payload.InterestPay),
      amountPay: Math.ceil(payload.amountPay),
      fee: Math.ceil(payload.fee),
      saleItem_id: Math.ceil(payloadCustomer.id),
    };
    const result = await _PaymentApi().create(json);
    if (result?.statusCode === 200) {
      alert("บันทึกข้อมูลสำเร็จ");
      onClearForm();
      onLoadHistory(payloadCustomer.id, payloadCustomer);
      onRefetchDetail(payloadCustomer.id);
    }
    context?.setLoadingContext(false);
  };

  const onDeletePayment = async (row: any) => {
    if (window.confirm("คุณต้องการลบข้อมูลกรชำระเงินล่าสุด ใช่หรือไม่?")) {
      context?.setLoadingContext(true);
      const result = await _PaymentApi().delete(row.id);
      if (result.statusCode === 200) {
        alert("ลบข้อมูลสำเร็จ");
        onClearForm();
        onLoadHistory(payloadCustomer.id, payloadCustomer);
        onRefetchDetail(payloadCustomer.id);
      }
      context?.setLoadingContext(false);
    }
  };

  useEffect(() => {
    console.log("payload", payload)
    if (
      payload.methodPay &&
      payload.InterestPay &&
      (payload.fee !== null && payload.fee !== undefined && payload.fee !== "")  &&
      Math.ceil(payload.amountPay) >= 0 &&
      rowsHistory.length+1 < Math.ceil(payloadCustomer.numInstallments)
    ) {
        console.log("111")
      if (payload.methodPay === "เงินโอน") {
        console.log("222")
        if ((payload.bank!= "" && payload.bank!= null && payload.bank!= undefined) && (payload.accountName != "" && payload.accountName != null && payload.accountName != undefined) ) {
            console.log("333")
          return setShowSubmit(true);
        }else{
            return setShowSubmit(false);
        }
      } else {
        console.log("444")
        return setShowSubmit(true);
      }
    }else{
        console.log("555")
        setShowSubmit(false);
    }

    if( rowsHistory.length+1 > Math.ceil(payloadCustomer.numInstallments) ){
      setShowSubmit(false);
    }


  }, [payload]);

  const onCloseOrder = () => {
    setShowModalCloseOrder(true);
  };

  const returnShowModalCloseOrder = (result: boolean) => {
    setShowModalCloseOrder(result);
  };

  const returnCloseOrderSuccess = () => {
    onRefetchDetail(payloadCustomer.id);
    onClearForm();
    setShowModalCloseOrder(false);
  }

  const fnsetFormatNumber = (value: string) => {
    const numericValue = value.toString().replace(/,/g, "");
    return formatNumber(numericValue)
  }

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg justify-between">
          <p className="font-bold text-2xl text-white">ข้อมูลการชำระเงิน</p>
          { Math.ceil(payloadCustomer.remainingBalance) !== 0  &&
          <div className="flex space-x-3 items-center">
            <span className="text-white">ชำระครั้งที่</span>
            <div className="px-3 py-1 rounded-full bg-orange-500 text-white font-bold">
              {rowsHistory.length + 1} / {payloadCustomer.numInstallments}
            </div>
          </div>
            }
        </div>

        <div className="mt-5 px-3 pb-6 ">
          <div className="flex space-x-10  mb-5 px-3">
            <div className="flex space-x-2">
              <input
                disabled={formDisable}
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
                disabled={formDisable}
                type="radio"
                name="methodPay"
                value="เงินโอน"
                checked={payload.methodPay === "เงินโอน"}
                onChange={() => onChangeMethodPay("เงินโอน")}
                className="radio radio-warning"
              />
              <p className="text-white font-semibold">เงินโอน</p>
            </div>

            {payload.methodPay === "เงินโอน" && (
                <>
                    <div className="basis-3/12 px-2">
                    <p className="text-white font-semibold mb-1">
                        ธนาคาร : {" "}
                        <span className="text-red-500 font-semibold text">*</span>
                    </p>
                        <select
                        name="bank"
                        value={payload.bank}
                        className="bg-slate-50 text-black w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                        onChange={onChangeInput}
                        >
                        <option value="">------ เลือกธนาคาร ------</option>
                        {BankList.map((item: any, indexList: number) => (
                            <option key={"list" + indexList} value={item.value}>
                            {item.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="basis-4/12 px-2">
                    <p className="text-white font-semibold mb-1">
                        ชื่อบัญชี : {" "}
                        <span className="text-red-500 font-semibold text">*</span>
                    </p>
                    <input
                        disabled={formDisable}
                        onChange={onChangeInput}
                        type="text"
                        name="accountName"
                        value={payload.accountName}
                        className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${formDisable ? "bg-slate-300" : "bg-slate-50" }`}
                    />
                    </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap">
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                จำนวนเงินที่จ่ายจริง : {" "}
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                disabled={formDisable}
                onChange={onChangeInput}
                type="text"
                name="amount"
                value={amount ? fnsetFormatNumber(amount) : ""}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${formDisable ? "bg-slate-300" : "bg-slate-50" }`}
              />
            </div>
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                เงินต้น :
              </p>
              <input
                disabled
                onChange={onChangeInput}
                type="text"
                name="amountPay"
                value={payload?.amountPay ? fnsetFormatNumber(payload?.amountPay) : ""}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ดอกเบี้ย :  
              </p>
              <input
                disabled
                onChange={onChangeInput}
                type="text"
                name="InterestPay"
                // value={3000}
                value={payloadCustomer.statusInstallment == "Close" ? "" : payload?.InterestPay ? fnsetFormatNumber(payload?.InterestPay) : ""}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ค่าปรับ :{" "}
                <span className="text-red-500 font-semibold text">*</span>
              </p>
              <input
                disabled={formDisable}
                onChange={onChangeInput}
                type="text"
                name="fee"
                value={fnsetFormatNumber(payload.fee)}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${formDisable ? "bg-slate-300" : "bg-slate-50" }`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">ผู้รับชำระ :</p>
              <input
                disabled
                type="text"
                name="receiver"
                value={payloadCustomer?.statusInstallment == "Close" ? "" : payload?.receiver }
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>

            <div className="basis-full px-2">
              <p className="text-white font-semibold mb-1">Note :</p>
              <textarea
                disabled={formDisable}
                name="note"
                id="note"
                onChange={onChangeInput}
                maxLength={512}
                rows={3}
                className={`text-black mb-3 py-3 w-full rounded-lg  px-3 focus:outline-primary focus:outline focus:outline-2 ${formDisable ? "bg-slate-300" : "bg-slate-50" }`}
              >
                {payload?.note || ""}
              </textarea>
            </div>
          </div>
          {/* amountPay InterestPay fee */}
          { formDisable === false && (
          <div className="basis-4/12 px-2 justify-end flex space-x-3">
            <button
              type="button"
              className="bg-green-600 text-white font-bold py-1 px-4 rounded-lg hover:bg-green-500"
              onClick={onCloseOrder}
            >
              <div className="flex py-2 px-4 items-center">ปิดยอด</div>
            </button>
                {showSubmit && (formDisable === false) && (
              <button
                onClick={onSubmit}
                type="button"
                className="bg-orange-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-orange-400"
              >
                <div className="flex py-2 px-4 items-center">
                  <span>ชำระ</span>
                </div>
              </button>
            )}
          </div>
        )}

          <div className="w-full divider text-white">ประวัติการชำระเงิน</div>
          <div className="flex items-center">
            {/* <div className="px-3 py-1 rounded-full bg-orange-200">
              <span className="text-black font-bold">
                ยอดจัด {Math.ceil(payloadCustomer.totalOrder).toLocaleString()} บาท
              </span>
            </div>
            <span className="px-6 text-white">/</span> */}
            <div className="px-3 py-1 rounded-full bg-orange-200">
              <span className="text-black font-bold">
                จ่ายแล้ว{" "}
                {/* {Math.ceil(payloadCustomer.paymentAmount).toLocaleString()}  */}
                {Math.ceil(chipAmount.amountPay).toLocaleString()} บาท
              </span>
            </div>
            <span className="px-6 text-white">/</span>
            <div className="px-3 py-1 rounded-full bg-orange-200">
              <span className="text-black font-bold">
                คงเหลือ{" "}
                
                {/* { payloadCustomer.statusInstallment === "Close" ? 0 : Math.ceil(payloadCustomer.remainingBalance).toLocaleString()}  */}
                { payloadCustomer.statusInstallment === "Close" ? 0 : Math.ceil(chipAmount.remaining).toLocaleString()} บาท
              </span>
            </div>
          </div>
          <div className="flex flex-wrap w-full mt-4">
            <table className="table table-pin-rows">
              <thead>
                <tr className="bg-slate-400">
                  {columns.map((item: any, index: number) => (
                    <th
                      key={index}
                      style={{ width: item.width }}
                      className={`text-white text-lg ${
                        item.field === "note" && "text-center"
                      }`}
                    >
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

      {/* ---------------------------------------------------------------------------------------------------------- */}

      <ModalCloseOrder
        rowsHistory={rowsHistory}
        payloadCustomer={payloadCustomer}
        showModalCloseOrder={showModalCloseOrder}
        returnShowModalCloseOrder={returnShowModalCloseOrder}
        returnSuccess={returnCloseOrderSuccess}
      />
    </>
  );
};

export default FormPayment;
