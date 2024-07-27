import dayjs from 'dayjs';
const FormDetail = ({ dataInput }: any) => {
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg ">
          <p className="font-bold text-2xl text-white">รายละเอียดลูกค้า</p>
        </div>

        <div className="mt-5 px-3 pb-6 flex flex-wrap">
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ชื่อลูกค้า :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.customerName}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-8/12 px-2">
            <p className="text-white font-semibold mb-1">ที่อยู่ :</p>
            <input
              disabled
              type="text"
              name="address"
              value={dataInput?.address}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">
              เลขบัตรประจำตัวประชาชน :
            </p>
            <input
              disabled
              type="text"
              name="idCardNumber"
              value={dataInput?.idCardNumber}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">เบอร์ติดต่อ :</p>
            <input
              disabled
              type="text"
              name="phoneNumber"
              value={dataInput?.phoneNumber}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">เงินดาวน์ :</p>
            <input
              disabled
              type="text"
              name="downPayment"
              value={dataInput?.downPayment}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ประเภทดอกเบี้ย :</p>
            <input
              disabled
              type="text"
              name="interestType"
              value={dataInput?.interestType}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          {/* <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ยอดจัด :</p>
            <input
              disabled
              type="text"
              name="totalOrder"
              value={dataInput?.totalOrder}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div> */}
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">อัตราดอกเบี้ย :</p>
            <input
              disabled
              type="text"
              name="interestRate"
              value={dataInput?.interestRate}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>

          {/* {dataInput?.interestType === "คงที่" && ( */}
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">จำนวนงวด :</p>
            <input
              disabled
              type="text"
              name="numInstallments"
              value={dataInput?.numInstallments}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          {/* )} */}

          {/* <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">
              เงินต้นคงเหลือ :
            </p>
            <input
              disabled
              type="text"
              name="remainingBalance"
              value={dataInput?.remainingBalance}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div> */}

          {/* <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">
              เงินต้นที่ชำระแล้ว :
            </p>
            <input
              disabled
              type="text"
              name="paymentAmount"
              value={dataInput?.paymentAmount}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div> */}

          {dataInput?.interestType === "คงที่" && (
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                จำนวนเงินที่ต้องชำระ/เดือน :
              </p>
              <input
                disabled
                type="text"
                name="interestMonth"
                value={(
                  Number(dataInput.totalOrder) /
                    Number(dataInput.numInstallments) +
                  Number(dataInput.interestMonth)
                ).toFixed(2)}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          )}

          {dataInput?.interestType === "คงที่" && (
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">ดอกเบี้ย/เดือน :</p>
              <input
                disabled
                type="text"
                name="interestMonth"
                value={dataInput?.interestMonth}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          )}

          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">วันครบกำหนดชำระ :</p>
            <input
              disabled
              type="text"
              name="interestType"
              value={dataInput?.dueDate ? dayjs(dataInput?.dueDate).format("DD/MM/YYYY") : ""}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>

          {/* {dataInput.guarantors.length > 0 && (
            <div className="w-full divider text-white">ผู้ค้ำประกัน</div>
          )}

          {dataInput.guarantors.map((item: any, index: number) => (
            <div key={"guarantors-" + index} className="flex flex-wrap w-full">
              <div className="basis-4/12 px-2">
                <p className="text-white font-semibold mb-1">
                  ชื่อผู้คำประกันคนที่ {index + 1} :
                </p>
                <input
                  disabled
                  type="text"
                  name="guarantorName"      
                  value={item?.guarantorName}
                  className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                />
              </div>
              <div className="basis-8/12 px-2">
                <p className="text-white font-semibold mb-1">
                  ที่อยู่ผู้คำประกันคนที่ {index + 1} :
                </p>
                <input
                  disabled
                  type="text"
                  name="guarantorAddress"
                  value={item?.guarantorAddress}
                  className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
                />
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default FormDetail;
