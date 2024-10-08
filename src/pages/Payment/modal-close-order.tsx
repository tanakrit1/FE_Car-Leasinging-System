import { useContext, useEffect, useState } from "react";
import BankList from "../../assets/bank.json";
import _PaymentApi from "../../api/payment";
import { getLoginStorage } from "../../helpers/set-storage";
import { LoadContext } from "../../context/loading-context";
import { formatNumber } from "../../helpers/function-service";
import dayjs from "dayjs";

const ModalCloseOrder = ({
  showModalCloseOrder,
  returnShowModalCloseOrder,
  payloadCustomer,
  rowsHistory,
  returnSuccess
}: any) => {
    const context = useContext(LoadContext)
    const profile = getLoginStorage()?.profile
  const [payloadPayment, setPayloadPayment] = useState<any>({
    totalOrder: "", // ยอดจัด
    paymentAmount: "", // เงินต้นชำระเเล้ว
    remainingBalance: "", // เงินต้นคงเหลือ
    totalInterest: "", // ดอกเบี้ยชำระเเล้ว
    remainingInterest: "", // ดอกเบี้ยคงเหลือ
    discount: "",

    bank: "",
    methodPay: "เงินสด",
    accountName: "",
    datePay: dayjs().format("YYYY-MM-DD")
  });
  const [amount, setAmount] = useState<any>("");
  const [totalFee, setTotalFee] = useState<any>(0);

  const processOrder = () => {
    if (payloadCustomer.interestType === "คงที่") {
      const remainingInstallment = Math.ceil(payloadCustomer.numInstallments) - rowsHistory.length; // จํานวนงวดคงเหลือ
      const InterestPay = payloadCustomer.interestMonth
      const totalPay = InterestPay * remainingInstallment;
      setPayloadPayment({
        totalOrder: Math.ceil(payloadCustomer.totalOrder),
        paymentAmount: Math.ceil(payloadCustomer.paymentAmount),
        totalInterest: Math.ceil(payloadCustomer.totalInterest),
        remainingInterest: Math.ceil(totalPay),
        remainingBalance: Math.ceil(payloadCustomer.remainingBalance),
        discount: "",

        bank: "",
        methodPay: "เงินสด",
      });
      const payamount =
        Math.ceil(payloadCustomer.remainingBalance) + Math.ceil(totalPay)
      setAmount(payamount);
    } else {
      // ลดต้นลดดอก
      const InterestPay =
        Math.ceil(payloadCustomer.remainingBalance) *
        (Math.ceil(payloadCustomer.interestRate) / 100);
      setPayloadPayment({
        totalOrder: Math.ceil(payloadCustomer.totalOrder),
        paymentAmount: Math.ceil(payloadCustomer.paymentAmount),
        totalInterest: Math.ceil(payloadCustomer.totalInterest),
        remainingInterest: Math.ceil(InterestPay),
        remainingBalance: Math.ceil(payloadCustomer.remainingBalance),
        discount: "",

        bank: "",
        methodPay: "เงินสด",
      });
      const payamount = Math.ceil(payloadCustomer.remainingBalance) + Math.ceil(InterestPay)
      setAmount(payamount);
    }

    const sumTotalFee = rowsHistory.reduce((accumulator: any, current: any) => {
        return Math.ceil(accumulator) + (Math.ceil(current.fee) || 0);
      }, 0);
      setTotalFee(sumTotalFee)
  };

  const onSubmit = async() => {
    if( payloadPayment.methodPay === "เงินโอน" ){
        if( (payloadPayment.bank === "" || payloadPayment.bank === null || payloadPayment.bank === undefined) || (payloadPayment.accountName === "" || payloadPayment.accountName === null || payloadPayment.accountName === undefined) ){
            return alert("กรุณาระบุธนาคาร และ ชื่อบัญชี")
        }
    }
    context?.setLoadingContext(true)
    const json = {
        ...payloadPayment,
        InterestPay: Math.ceil(payloadPayment.remainingInterest),   // ดอกเบี้ย
        // amountPay: Math.ceil(amount),       // ยอดคงเหลือ
        amountPay: Math.ceil(payloadPayment.remainingBalance),       // เงินต้น
        fee: 0,
        receiver: profile.firstName + " " + profile.lastName,
        discount: Math.ceil(payloadPayment.discount),
        saleItem_id: Math.ceil(payloadCustomer.id),
        note: "ปิดยอด",
    }
    console.log("json--> ", json)
    
    // return
    const result = await _PaymentApi().closeInstallment(json)
    if( result.statusCode === 200 ){
        alert("บันทึกข้อมูลสำเร็จ")
        returnSuccess()
    }

    context?.setLoadingContext(false)
  };

  useEffect(() => {
    if (showModalCloseOrder === true) {
      (
        document.getElementById("modal-close-order") as HTMLFormElement
      ).showModal();
      processOrder();
    } else {
      (document.getElementById("modal-close-order") as HTMLFormElement).close();
    }
  }, [showModalCloseOrder]);


  const processDiscount = () => {
    const discount = Number(payloadPayment.discount.replace(/,/g, ""))
    console.log("discount--> ", discount)
    if (payloadCustomer.interestType === "คงที่") {
        const remainingInstallment = Math.ceil(payloadCustomer.numInstallments) - rowsHistory.length; // จํานวนงวดคงเหลือ
      const InterestPay = payloadCustomer.interestMonth  // ดอกเบี้ยต่อเดือน
      const totalPay = InterestPay * remainingInstallment;  // ดอกเบี้ยคงเหลือทั้งหมด
      const payamount = (Math.ceil(payloadCustomer.remainingBalance) + Math.ceil(totalPay)) - Math.ceil(discount); 

      const remainingBalance = Math.ceil(payloadCustomer.remainingBalance) - Number(discount);
      setPayloadPayment({ ...payloadPayment, remainingBalance: remainingBalance, datePay: dayjs().format("YYYY-MM-DD") });
      setAmount(payamount);
    }else{
        const InterestPay = Math.ceil(payloadCustomer.remainingBalance) * (Math.ceil(payloadCustomer.interestRate) / 100);
        const payamount = (Math.ceil(payloadCustomer.remainingBalance) + Math.ceil(InterestPay)) - Math.ceil(discount);

        const remainingBalance = Math.ceil(payloadCustomer.remainingBalance) - Math.ceil(discount);
        setPayloadPayment({ ...payloadPayment, remainingBalance: remainingBalance, datePay: dayjs().format("YYYY-MM-DD") });
        setAmount(payamount);
        
    }
    
  }

  useEffect( () => {
    processDiscount()
  }, [payloadPayment.discount] )


  const fnsetFormatNumber = (value: string) => {
    const numericValue = value.toString().replace(/,/g, "");
    return formatNumber(numericValue)
  }

  return (
    <>
      <dialog id="modal-close-order" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg text-white">ปิดยอดค้างชำระ</h3>
            <button
              onClick={() => returnShowModalCloseOrder(false)}
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            >
              ✕
            </button>
          </div>

          <div className="w-full mt-5 px-3">
            <div className="text-white flex justify-between mb-3">
              <span>ยอดจัด</span>
              <span className="text-green-500">
                {payloadPayment?.totalOrder ? Number(payloadPayment?.totalOrder).toLocaleString() : 0} บาท
              </span>
            </div>
            <div className="text-white flex justify-between mb-3">
              <span>เงินต้นชำระแล้ว</span>
              <span className="text-yellow-500">
                {payloadPayment?.paymentAmount ? Number(payloadPayment?.paymentAmount).toLocaleString() : 0} บาท
              </span>
            </div>
            <div className="text-white flex justify-between mb-3">
              <span>ดอกเบี้ยชำระแล้ว</span>
              <span className="text-yellow-500">
                {payloadPayment?.totalInterest ? Number(payloadPayment?.totalInterest).toLocaleString() : 0} บาท
              </span>
            </div>
            <div className="text-white flex justify-between mb-3">
              <span>เงินต้นคงเหลือ</span>
              <span className="text-red-500">
                {payloadPayment?.remainingBalance ? Number(payloadPayment?.remainingBalance).toLocaleString() : 0} บาท
              </span>
            </div>
            <div className="text-white flex justify-between mb-3">
              <span>ดอกเบี้ยคงเหลือ</span>
              <span className="text-red-500">
                {payloadPayment?.remainingInterest ? Number(payloadPayment?.remainingInterest).toLocaleString() : 0} บาท
              </span>
            </div>
            <div className="text-white flex justify-between mb-3">
              <span>ค่าปรับรวม</span>
              <span className="text-red-500">
                {totalFee ? Number(totalFee).toLocaleString() : 0} บาท
              </span>
            </div>
            <div className="text-white items-center flex justify-between mb-3">
              <span>ส่วนลด</span>
              <div className="flex justify-end space-x-2">
                <input 
                    type="text" 
                    value={payloadPayment.discount ? fnsetFormatNumber(payloadPayment.discount) : ""}  
                    onChange={(e: any) => setPayloadPayment({...payloadPayment, discount: e.target.value})}
                    className="bg-slate-50 text-black w-3/6 rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                    />
                <span className="text-white">
                     บาท
                </span>
                </div>
            </div>
            <div className="text-white items-center flex justify-between mb-3">
              <span>วันที่ปิดยอด</span>
              <div className="flex justify-end space-x-2">
                <input 
                    type="date" 
                    value={payloadPayment.datePay}  
                    onChange={(e: any) => setPayloadPayment({...payloadPayment, datePay: e.target.value})}
                    className="w-full bg-slate-50 text-black w-3/6 rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                    />
                <span className="text-white">
                     บาท
                </span>
                </div>
            </div>


            <div className="text-white flex justify-between mt-10">
              <span>
                ยอดที่ต้องชำระ{" "}
              </span>
              <span className="text-orange-500 border-b border-orange-500">
                {amount ? Number(amount).toLocaleString() : 0} บาท
              </span>
            </div>

            <div className="text-white flex space-x-6 mt-6">
              <div className="flex space-x-2">
                <input
                  type="radio"
                  name="methodPayModal"
                  value="เงินสด"
                  checked={payloadPayment.methodPay === "เงินสด"}
                  onChange={(event: any) => 
                    setPayloadPayment({
                      ...payloadPayment,
                      methodPay: event.target.value,
                      bank: "",
                    })
                  }
                  className="radio radio-warning"
                  defaultChecked
                />
                <p className="text-white font-semibold">เงินสด</p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="radio"
                  name="methodPayModal"
                  value="เงินโอน"
                  checked={payloadPayment.methodPay === "เงินโอน"}
                  onChange={(event: any) => 
                    setPayloadPayment({
                      ...payloadPayment,
                      methodPay: event.target.value,
                    })
                  }
                  className="radio radio-warning"
                />
                <p className="text-white font-semibold">เงินโอน</p>
              </div>
            </div>

            <div className="flex space-x-6 items-center mt-3">
              {payloadPayment.methodPay === "เงินโอน" && (
                <>
                    <div className="basis-6/12 px-2">
                    <p className="text-white font-semibold mb-1">
                        ธนาคาร : {" "}
                        <span className="text-red-500 font-semibold text">*</span>
                    </p>
                    <select
                        name="bank"
                        value={payloadPayment.bank}
                        className="bg-slate-50 text-black w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                        onChange={(event: any) =>
                        setPayloadPayment({
                            ...payloadPayment,
                            bank: event.target.value,
                        })
                        }
                    >
                        <option value="">------ เลือกธนาคาร ------</option>
                        {BankList.map((item: any, indexList: number) => (
                        <option key={"list" + indexList} value={item.value}>
                            {item.label}
                        </option>
                        ))}
                    </select>
                    </div>

                    <div className="basis-6/12 px-2">
                    <p className="text-white font-semibold mb-1">
                        ชื่อบัญชี : {" "}
                        <span className="text-red-500 font-semibold text">*</span>
                    </p>
                    <input
                        onChange={(event: any) =>
                            setPayloadPayment({
                                ...payloadPayment,
                                accountName: event.target.value,
                            })
                            }
                        type="text"
                        name="accountName"
                        value={payloadPayment.accountName}
                        className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                    />
                    </div>
                </>
              )}
              </div>
            

            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="bg-orange-600 text-white font-bold py-1 px-4 rounded-lg hover:bg-orange-500"
                onClick={onSubmit}
              >
                <div className="flex py-2 px-4 items-center">ปิดยอด</div>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalCloseOrder;
