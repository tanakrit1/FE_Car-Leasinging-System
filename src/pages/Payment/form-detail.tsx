import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useContext } from 'react';
import { LoadContext } from '../../context/loading-context';
const FormDetail = ({ dataInput }: any) => {
    const context = useContext(LoadContext)
    const process = () => {
        if (dataInput.interestType === "คงที่") {
            const InterestPay = (Number(dataInput.totalOrder) / Number(dataInput.numInstallments)) * (Number(dataInput.interestRate) / 100);
              const amountPay = (Number(dataInput.totalOrder) / Number(dataInput.numInstallments))
              return (amountPay + InterestPay).toFixed(2)

          } else { // ลดต้นลดดอก
            const InterestPay = Number(dataInput.remainingBalance) * (Number(dataInput.interestRate) / 100);
            return InterestPay.toFixed(2)
          }
    }

    const onExport = () => {
        context?.setLoadingContext(true)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('จดหมายเตือน');
        for (let i = 65; i <= 69; i++) {
            const char = String.fromCharCode(i); //A-J
            worksheet.getCell(`${char}1`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'fff3fa08' },
            }
            worksheet.getCell(`${char}1`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }

        worksheet.mergeCells(1, 1, 1, 5)
        worksheet.getCell('A1').value = "จดหมายเตือนชำระหนี้รถยนต์";
        worksheet.getCell('E2').value = dayjs().format('DD/MM/YYYY');
        worksheet.getCell('B3').value = "เรียน คุณ";dataInput?.customerName
        worksheet.getCell('C4').value = dataInput?.customerName

        worksheet.getCell('A4').value = "ตามที่ท่านได้เช่าซื้อรถยนต์"
        worksheet.getCell('B4').value = dataInput?.carInformation.carBrand
        worksheet.getCell('C4').value = dataInput?.carInformation.model
        worksheet.getCell('D4').value = dataInput?.carInformation.carColor
        worksheet.getCell('E4').value = dataInput?.carInformation.licensePlate

        worksheet.getCell('A5').value = "เมื่อวันที่"
        worksheet.getCell('B5').value = dataInput?.contractDate
        worksheet.getCell('C5').value = "ขณะนี้ท่านมียอดค้างชำระจำนวน"
        worksheet.getCell('D5').value = process()
        worksheet.getCell('E5').value = "บาท"

        worksheet.mergeCells(6, 1, 6, 5)
         worksheet.getCell('A6').value = "โปรดติดต่อชำระค่างวดที่ค้างชำระภายใน 7 วันหลังจากได้รับจดหมายฉบับนี้ ขออภัยมา ณ ที่นี้หากท่านชำระค่างวดดังกล่าวแล้ว"
         worksheet.mergeCells(7, 1, 7, 5)
         worksheet.mergeCells(8, 1, 8, 5)
        worksheet.getCell('A8').value = "ลงชื่อ.................................................................."
        worksheet.mergeCells(9, 1, 9, 5)
        worksheet.getCell('A9').value = "ติดต่อโทร. 090-2023412"

         worksheet.getColumn('A').width = 30;
         worksheet.getColumn('B').width = 20;
         worksheet.getColumn('C').width = 28;
         worksheet.getColumn('D').width = 15;
         worksheet.getColumn('E').width = 20;
         

        for( let row = 1; row <= 9; row++) {
            worksheet.getRow(row).alignment = { horizontal: 'center' };
            for (let key = 65; key <= 69; key++) {
                const char = String.fromCharCode(key); //A-J
                worksheet.getCell(`${char}${row}`).border = {
                    top: row!=9 ? { style: 'thin', color: { argb: 'ff050505' } } : {},
                    left: { style: 'thin', color: { argb: 'ff050505' } },
                    bottom: row!=8 ? { style: 'thin', color: { argb: 'ff050505' } }: {},
                    right: { style: 'thin', color: { argb: 'ff050505' } }
                }
            }
        }
        


        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ใบแจ้งหนี้.xlsx';
            a.click();
        });
        context?.setLoadingContext(false)
    }

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg ">
          <p className="font-bold text-2xl text-white">รายละเอียดลูกค้า</p>
          { dataInput.idCardNumber != "" && 
            <button className='bg-yellow-600 text-white font-bold py-1 px-4 rounded-lg hover:bg-yellow-500' onClick={onExport}>ใบแจ้งหนี้</button>
            }
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

          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ส่วนลดในการปิดยอด :</p>
            <input
              disabled
              type="text"
              name="interestType"
              value={dataInput?.discount}
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
