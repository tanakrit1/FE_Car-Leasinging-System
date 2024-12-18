import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useContext, useEffect, useState } from 'react';
import { LoadContext } from '../../context/loading-context';
import _SaleItemApi from '../../api/saleItem';
const FormDetail = ({ dataInput, onRefetchDetail }: any) => {
    const context = useContext(LoadContext)

    const [showModalChangeNum, setShowModalChangeNum] = useState<boolean>(false)
    const [newNum, setNewNum] = useState<any>(null)
    const [formCustom, setFormCustom] = useState<any>({
        interestPerMonth: 0,
        totalAmountSum: 0,
        amountPerMonth: 0,
    })

    const process = () => {
        if (dataInput.interestType === "คงที่") {
            // const totalAmount = (Number(dataInput.totalOrder) / Number(dataInput.numInstallments)) + Number(dataInput.interestMonth)
            // //   const amountPay = (Number(dataInput.totalOrder) / Number(dataInput.numInstallments))
            // //   return (amountPay + InterestPay)
            // return Math.ceil(totalAmount).toLocaleString()

            const interestPerMonth = Math.ceil(Number(dataInput.totalOrder) * ( Number(dataInput.interestRate) / 100 ))   // 1440  ดอกเบี้ยต่อเดือน
            const totalInterest = Math.ceil(interestPerMonth * Number(dataInput.numInstallments))  // 51840   ดอกเบี้ยทั้งหมด
            const totalAmountSum = totalInterest + Number(dataInput.totalOrder) // 201840  ยอดทั้งหมด(ดอกเบี้ยทั้งหมด + ยอดจัด)
            const amountPerMonth = Math.ceil(totalAmountSum / Number(dataInput.numInstallments)) // 5607  ยอดต่อเดือน
            return Math.ceil(amountPerMonth).toLocaleString()

          } else { // ลดต้นลดดอก
            const InterestPay = Math.ceil(dataInput.remainingBalance) * (Math.ceil(dataInput.interestRate) / 100);
            return InterestPay
          }
    }

    const onExport = () => {
        context?.setLoadingContext(true)
        console.log("dataInput--> ", dataInput)
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
        worksheet.getCell('B3').value = "เรียน คุณ";
        worksheet.getCell('C3').value = dataInput?.customerName

        worksheet.getCell('A4').value = "ตามที่ท่านได้เช่าซื้อรถยนต์"
        worksheet.getCell('B4').value = dataInput?.carInformation.carBrand
        worksheet.getCell('C4').value = dataInput?.carInformation.model
        worksheet.getCell('D4').value = dataInput?.carInformation.carColor
        worksheet.getCell('E4').value = dataInput?.carInformation.licensePlate

        worksheet.getCell('A5').value = "เมื่อวันที่"
        worksheet.getCell('B5').value = dayjs(dataInput?.contractDate).format('DD/MM/YYYY')
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

    const onProcessAmount = () => {
        const interestPerMonth = Math.ceil(Number(dataInput.totalOrder) * ( Number(dataInput.interestRate) / 100 ))   // 1440  ดอกเบี้ยต่อเดือน
        const totalInterest = Math.ceil(interestPerMonth * Number(dataInput.numInstallments))  // 51840   ดอกเบี้ยทั้งหมด
        const totalAmountSum = totalInterest + Number(dataInput.totalOrder) // 201840  ยอดทั้งหมด(ดอกเบี้ยทั้งหมด + ยอดจัด)
        const amountPerMonth = Math.ceil(totalAmountSum / Number(dataInput.numInstallments)) // 5607  ยอดต่อเดือน
        setFormCustom({
            interestPerMonth: interestPerMonth,
            totalAmountSum: totalAmountSum,
            amountPerMonth: amountPerMonth,
        })
    }

    useEffect( () => {
        if( showModalChangeNum === true ){
            ( document.getElementById("modal-change-num") as HTMLFormElement ).showModal();
            setNewNum("")
        }else{
            ( document.getElementById("modal-change-num") as HTMLFormElement ).close();
        }
    }, [showModalChangeNum] )
    const onOpenModalChangeNum = () => {
        setShowModalChangeNum(true)
    }

    const onCloseModalChangeNum = () => {
        setShowModalChangeNum(false)
    }

    const onSubmitChangeNum = async() => {
        if( newNum === "" || newNum === null || newNum === undefined ){
            return alert("กรุณาใส่จำนวนงวด")
        }
        if( Number(newNum) <= Number(dataInput.numInstallments) ){
            return alert("จำนวนงวดใหม่ต้องไม่น้อยกว่าจำนวนงวดเดิม")
        }
        context?.setLoadingContext(true)
        const json = {
            numInstallments: newNum.toString()
        }
        const result = await _SaleItemApi().update(dataInput.id, json)
        if( result.statusCode === 200 ){
            setShowModalChangeNum(false)
            onRefetchDetail(dataInput.id)
        }
        context?.setLoadingContext(false)
    }

    useEffect(()=>{
        onProcessAmount()
    }, [dataInput])

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg ">
            <div className="flex space-x-5 items-center">
          <p className="font-bold text-2xl text-white">รายละเอียดสัญญา</p>
          { dataInput?.statusInstallment === "Close" &&  
                <div className="px-5 py-2 rounded-lg outline outline-green-400 text-green-400  -rotate-12 hover:-rotate-0">ปิดยอด</div>
            }
            </div>
            { dataInput.statusInstallment !== "Close" && 
          <div className='flex space-x-3'>
            { dataInput.idCardNumber != "" && 
                <button className='bg-yellow-600 text-white font-bold py-1 px-4 rounded-lg hover:bg-yellow-500' onClick={onExport}>ใบแจ้งหนี้</button>
            }
            { dataInput?.interestType === "ลดต้น/ลดดอก" &&
                <button className='bg-green-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-green-400' onClick={onOpenModalChangeNum}>เพิ่มจำนวนงวด</button>
            }
          </div>
            }
        </div>

{/* ------------------------------------------------------------------------------------ */}
        <div className="w-full divider text-white">
            ข้อมูลลูกค้า
        </div>

        <div className="mt-5 px-3 pb-6 flex flex-wrap">
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">รหัสสัญญา :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.id}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
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
            <p className="text-white font-semibold mb-1">ราคาขาย :</p>
            <input
              disabled
              type="text"
              name="address"
              value={dataInput?.carInformation?.sellingPrice ? Number(dataInput?.carInformation?.sellingPrice).toLocaleString() : ""}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">วันที่เซ็นสัญญา :</p>
            <input
              disabled
              type="text"
              name="address"
              value={dataInput?.contractDate ? dayjs(dataInput?.contractDate).format('DD/MM/YYYY') : ""}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          {/* <div className="basis-4/12 px-2">
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
          </div> */}
          
         
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
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">เงินดาวน์ :</p>
            <input
              disabled
              type="text"
              name="downPayment"
              value={dataInput?.downPayment ? Number(dataInput?.downPayment).toLocaleString() : ""}
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
            <p className="text-white font-semibold mb-1">อัตราดอกเบี้ยต่อเดือน :</p>
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
            <p className="text-white font-semibold mb-1">ระยะสัญญา(เดือน) :</p>
            <input
              disabled
              type="text"
              name="numInstallments"
              value={dataInput?.numInstallments}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          {/* )} */}

          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ยอดจัด :</p>
            <input
              disabled
              type="text"
              name="numInstallments"
              value={dataInput?.totalOrder ? Number(dataInput?.totalOrder).toLocaleString() : ""}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>

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
              <p className="text-white font-semibold mb-1">ดอกเบี้ยต่อเดือน :</p>
              <input
                disabled
                type="text"
                name="interestMonth"
                value={Number(formCustom.interestPerMonth).toLocaleString() || ""}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          )}

        {dataInput?.interestType === "คงที่" && (
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">เงินต้นรวมดอกเบี้ยทั้งหมด :</p>
              <input
                disabled
                type="text"
                name="interestMonth"
                // value={ (Number(dataInput.totalOrder) + (Number(dataInput.interestMonth) * Number(dataInput.numInstallments))).toLocaleString() }
                // value={( Math.ceil( (Number(dataInput.totalOrder) / Number(dataInput.numInstallments)) + Number(dataInput.interestMonth)) * Number(dataInput.numInstallments) ).toLocaleString()}
                value={Number(formCustom.totalAmountSum).toLocaleString() || ""}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          )}



          {dataInput?.interestType === "คงที่" && (
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">
                ค่างวดต่อเดือน :
              </p>
              <input
                disabled
                type="text"
                name="interestMonth"
                // value={( Math.ceil( (Number(dataInput.totalOrder) / Number(dataInput.numInstallments)) + Number(dataInput.interestMonth)) ).toLocaleString()}
                value={Number(formCustom.amountPerMonth).toLocaleString() || ""}
                className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          )}

          

          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ส่งวันที่ :</p>
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
              value={dataInput?.discount ? Number(dataInput?.discount).toLocaleString() : ""}
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

        <div className="w-full divider text-white">
            ข้อมูลรถ
        </div>
        <div className="mt-5 px-3 pb-6 flex flex-wrap">
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ยี่ห้อรถ :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.carInformation?.carBrand}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">รุ่น :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.carInformation?.model}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">สี :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.carInformation?.carColor}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ปี :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.carInformation?.carDate}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">ทะเบียนรถ :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.carInformation?.licensePlate}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          {/* <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">เลขตัวถัง :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.carInformation?.vin}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div>
          <div className="basis-4/12 px-2">
            <p className="text-white font-semibold mb-1">เลขเครื่องยนต์ :</p>
            <input
              disabled
              type="text"
              name="customerName"
              value={dataInput?.carInformation?.engineNumber}
              className="bg-slate-300 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
            />
          </div> */}
        </div>

      </div>

      {/* --------------------------------------------------------------------------------------------------------------- */}
      <dialog id="modal-change-num" className="modal">
        <div className="modal-box w-11/12 max-w-lg">
            <div className="flex justify-between">
                <h3 className="font-bold text-lg text-white">แก้ไขจำนวนงวด</h3>
                <button
                    onClick={onCloseModalChangeNum}
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
                >
                    ✕
                </button>
          </div>
          <div className="w-full mt-5  ">
                <p className='text-white'> เพิ่มจำนวนงวดเดิม : { dataInput?.numInstallments } </p>

                <div className='flex space-x-6 mt-3 items-center'>
                    <p className='text-white'>เป็น</p>
                    <input type='number' value={newNum} onChange={(e) => setNewNum(e.target.value)} className='bg-slate-50 text-black mb-3 w-32 rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2' />                
                </div>
          </div>
          <div className='mt-5 flex justify-end'>
            <button className='bg-green-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-green-400' onClick={onSubmitChangeNum}>บันทึก</button>
          </div>
        </div>
      </dialog>

    </>
  );
};

export default FormDetail;
