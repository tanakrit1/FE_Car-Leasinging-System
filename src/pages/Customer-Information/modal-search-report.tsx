import { useContext, useEffect, useState } from "react";
import TableList from "../../components/TableList";
import Pagination from "../../components/pagination";
import { LoadContext } from "../../context/loading-context";
import _SaleItemApi from "../../api/saleItem";
import _PaymentApi from "../../api/payment";
import dayjs from "dayjs";
import ExcelJS from 'exceljs';

const columns = [
  { label: "รหัสลูกค้า", width: "10%", field: "id" },
  { label: "ชื่อลูกค้า", width: "20%", field: "customerName" },
  { label: "เบอร์ติดต่อ", width: "15%", field: "phoneNumber" },
  { label: "การซื้อ", width: "10%", field: "saleType" },
  { label: "ทะเบียนรถ", width: "25%", field: "licensePlate" },
  { label: "วันที่ทำสัญญา", width: "20%", field: "contractDate" },
];

const ModalReport = ({ showModal, returnShowModal }: any) => {
  // const navigate = useNavigate();
  const context = useContext(LoadContext);
  const [contextLoad, setContextLoad] = useState<any>(context?.loadingContext);
  const [rows, setRows] = useState<any>([]);
  const [formSearchExport, setFormSearchExport] = useState<any>({
    carInformation_licensePlate: "",
    customerName: "",
    id: "",
    contractDate: {
      start: dayjs().format("YYYY-MM-DD"),
      end: dayjs().format("YYYY-MM-DD"),
    },
  });
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  useEffect(() => {
    setContextLoad(context?.loadingContext);
  }, [context?.loadingContext]);

  const fnValidateSubmit = () => {
    if (
      dayjs(formSearchExport.contractDate.end) <
      dayjs(formSearchExport.contractDate.start)
    ) {
      return {
        status: false,
        message: "วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด",
      };
    } else {
      return { status: true, message: "" };
    }
  };

  const onSubmitSearch = async (page?: number) => {
    const resultValid = fnValidateSubmit();
    if (resultValid.status === false) {
      return alert(resultValid.message);
    }
    context?.setLoadingContext(true);
    let mapJson: any = [];
    for (let field in formSearchExport) {
      if (formSearchExport[field] !== "") {
        mapJson.push({
          field: field,
          operator:
            field === "carInformation_licensePlate" || field === "customerName"
              ? "contains"
              : field === "contractDate"
              ? "between"
              : "equals",
          value:
            field === "contractDate"
              ? [formSearchExport[field].start, formSearchExport[field].end]
              : formSearchExport[field],
        });
      }
    }
    const json: any = {
      page: page ? page : 1,
      limit: pagination.limit,
      sortField: "contractDate",
      sortType: "ASC",
      filterModel: {
        logicOperator: "and",
        items: mapJson,
      },
    };
    // console.log("json--> ", json);
    // return
    const resultRows = await _SaleItemApi().search(json);
    if (resultRows.statusCode === 200) {
    //   if (resultRows.data.length === 0) {
    //     alert("ไม่พบข้อมูล");
    //   }
      console.log("resultRows --> ", resultRows);
      const newRows = resultRows.data.map((item: any) => {
        return {
          ...item,
          licensePlate: item.carInformation?.licensePlate,
          contractDate: dayjs(item.contractDate).format("DD/MM/YYYY"),
          saleType:
            item.saleType === "buy"
              ? "ขายรถ"
              : item.saleType === "pledge"
              ? "รับจำนำรถ"
              : "อื่นๆ",
        };
      });
      console.log("newRows--> ", newRows);
      setRows(newRows);
      setPagination({
        ...pagination,
        page: resultRows.metadata.page,
        totalPages: resultRows.metadata.totalPage,
      });
    }
    context?.setLoadingContext(false);
  };

  const onClearData = () => {
    setFormSearchExport({
      carInformation_licensePlate: "",
      customerName: "",
      id: "",
      contractDate: {
        start: dayjs().format("YYYY-MM-DD"),
        end: dayjs().format("YYYY-MM-DD"),
      },
    });
    setRows([]);
    setPagination({
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 1,
    });
  };

  useEffect(() => {
    onSubmitSearch(pagination.page);
  }, [pagination.page]);

  useEffect(() => {
    if (showModal === true) {
      (
        document.getElementById("modal-saleItem-report") as HTMLFormElement
      ).showModal();
      onClearData();
    } else {
      (
        document.getElementById("modal-saleItem-report") as HTMLFormElement
      ).close();
    }
  }, [showModal]);

  const onExport = async() => {
    context?.setLoadingContext(true);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('รายชื่อลูกค้า');
    for (let i = 65; i <= 76; i++) {
        const char = String.fromCharCode(i); //A-L
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
    worksheet.getRow(1).alignment = { horizontal: 'center' };
    worksheet.getCell('A1').value = "ชื่อลูกค้า";
    worksheet.getCell('B1').value = "รหัส";
    worksheet.getCell('C1').value = "ที่อยู่";
    worksheet.getCell('D1').value = "เบอร์ติดต่อ";
    worksheet.getCell('E1').value = "การชำระดอกเบี้ย";
    worksheet.getCell('F1').value = "วันที่ทำสัญญา";
    worksheet.getCell('G1').value = "เงินดาวน์";
    worksheet.getCell('H1').value = "ยอดจัด";
    worksheet.getCell('I1').value = "ยอดคงเหลือ";
    worksheet.getCell('J1').value = "ระยะสัญญา";
    worksheet.getCell('K1').value = "อัตราดอกเบี้ย";
    worksheet.getCell('L1').value = "ผู้ค้ำประกัน";
    

    worksheet.getColumn('A').width = 20;
    worksheet.getColumn('B').width = 20;
    worksheet.getColumn('C').width = 40;
    worksheet.getColumn('D').width = 20;
    worksheet.getColumn('E').width = 20;
    worksheet.getColumn('F').width = 20;
    worksheet.getColumn('G').width = 20;
    worksheet.getColumn('H').width = 20;
    worksheet.getColumn('I').width = 20;
    worksheet.getColumn('J').width = 20;
    worksheet.getColumn('K').width = 20;
    worksheet.getColumn('L').width = 20;


    // ------------------------------------------ query --------------------------------------------- //

    let mapJson: any = [];
    for (let field in formSearchExport) {
      if (formSearchExport[field] !== "") {
        mapJson.push({
          field: field,
          operator:
            field === "carInformation_licensePlate" || field === "customerName"
              ? "contains"
              : field === "contractDate"
              ? "between"
              : "equals",
          value:
            field === "contractDate"
              ? [formSearchExport[field].start, formSearchExport[field].end]
              : formSearchExport[field],
        });
      }
    }
    const json: any = {
      page: 1,
      limit: 9999999,
      sortField: "id",
      sortType: "ASC",
      filterModel: {
        logicOperator: "and",
        items: mapJson,
      },
    };
    // console.log("json--> ", json);
    // return
    const resultRows = await _SaleItemApi().search(json);
    console.log("resultRows--> ", resultRows);
    const dataRows = resultRows.data

    let row = 2
    let totalRemaining = 0
    for( let i=0;i<dataRows.length;i++){

         // -------------------------------------------- คำนวณยอดคงเหลือ --------------------------------------------- //
         const jsonPayment = {
            page: 1,
            limit: 500,
            filterModel: {
                logicOperator: 'and',
                items: [{
                    field: "saleItem_id",
                    operator: "equals",
                    value: dataRows[i].id
                }]
            }
        }

        

        const resultPayment = await _PaymentApi().search(jsonPayment)
        // console.log("resultPayment--> ", resultPayment)
        let amountPay = 0
        for( let i=0; i < resultPayment.data.length; i++ ){
            amountPay = amountPay + ( Math.ceil(resultPayment.data[i].amountPay) +  Math.ceil(resultPayment.data[i].InterestPay) )
        }

        const totalOrder = dataRows[i].totalOrder
        const interestRate = dataRows[i].interestRate
        const numInstallments = dataRows[i].numInstallments

        const interestPerMonth = Math.ceil(Number(totalOrder) * ( Number(interestRate) / 100 ))
        const totalAmountPerMonth = Math.ceil(Number(totalOrder) / Number(numInstallments) + interestPerMonth)
        const totalAmount = Math.ceil(totalAmountPerMonth * Number(numInstallments))
        const remaining = dataRows[i].statusInstallment === "Close" ? 0 : (totalAmount - amountPay)
        totalRemaining = totalRemaining + remaining

        // -------------------------------------------- ปิดคำนวณยอดคงเหลือ --------------------------------------------- //

        worksheet.getRow(row).alignment = { horizontal: 'center' };
        worksheet.getCell(`A${row}`).value = dataRows[i].customerName
        worksheet.getCell(`B${row}`).value = dataRows[i].id
        worksheet.getCell(`C${row}`).value = dataRows[i].address
        worksheet.getCell(`D${row}`).value = dataRows[i].phoneNumber
        worksheet.getCell(`E${row}`).value = dataRows[i].interestType
        worksheet.getCell(`F${row}`).value = dataRows[i].contractDate ? dayjs(dataRows[i].contractDate).format("DD/MM/YYYY") : ""
        worksheet.getCell(`G${row}`).value = Number(dataRows[i].downPayment).toLocaleString()
        worksheet.getCell(`H${row}`).value = Number(dataRows[i].totalOrder).toLocaleString()
        worksheet.getCell(`I${row}`).value = Number(remaining).toLocaleString()
        worksheet.getCell(`J${row}`).value = dataRows[i].numInstallments
        worksheet.getCell(`K${row}`).value = dataRows[i].interestRate
        worksheet.getCell(`L${row}`).value = dataRows[i].guarantors.map( (item: any) => item.guarantorName )?.join(' , ')

        for (let key = 65; key <= 76; key++) {
            const char = String.fromCharCode(key); //A-L
            worksheet.getCell(`${char}${row}`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }
        row = row + 1
    }
    
    worksheet.getRow(row).alignment = { horizontal: 'center' };
    worksheet.getCell(`H${row}`).value = "รวม"
    worksheet.getCell(`I${row}`).value = Math.ceil(totalRemaining).toLocaleString() 
    for (let key = 72; key <= 73; key++) {
        const char = String.fromCharCode(key); //H-I
        worksheet.getCell(`${char}${row}`).border = {
            top: { style: 'thin', color: { argb: 'ff050505' } },
            left: { style: 'thin', color: { argb: 'ff050505' } },
            bottom: { style: 'thin', color: { argb: 'ff050505' } },
            right: { style: 'thin', color: { argb: 'ff050505' } }
        }
    }

    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'รายงานข้อมูลลูกค้า.xlsx';
        a.click();
    });
    context?.setLoadingContext(false);

  };

  return (
    <>
      <dialog id="modal-saleItem-report" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg text-white">
              ค้นหาข้อมูลรายชื่อลูกค้า
            </h3>
            <button
              onClick={() => returnShowModal(false)}
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            >
              ✕
            </button>
          </div>

          <div className="w-full mt-5 flex flex-wrap flex-row ">
            <div className="basis-1/3 px-3 mb-3">
              <p className="text-white mb-1">รหัสสัญญา</p>
              <input
                disabled={contextLoad}
                placeholder="รหัสสัญญา"
                type="number"
                onChange={(event: any) =>
                  setFormSearchExport({
                    ...formSearchExport,
                    [event.target.name]: event.target.value,
                  })
                }
                value={formSearchExport.id}
                name="id"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="basis-1/3 px-3 mb-3">
              <p className="text-white mb-1">เลขทะเบียน</p>
              <input
                disabled={contextLoad}
                placeholder="เลขทะเบียน"
                type="text"
                onChange={(event: any) =>
                  setFormSearchExport({
                    ...formSearchExport,
                    [event.target.name]: event.target.value,
                  })
                }
                value={formSearchExport.carInformation_licensePlate}
                name="carInformation_licensePlate"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="basis-1/3 px-3 mb-3">
              <p className="text-white mb-1">ชื่อลูกค้า</p>
              <input
                placeholder="ชื่อลูกค้า"
                disabled={contextLoad}
                type="text"
                onChange={(event: any) =>
                  setFormSearchExport({
                    ...formSearchExport,
                    [event.target.name]: event.target.value,
                  })
                }
                value={formSearchExport.customerName}
                name="customerName"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="basis-1/3 px-3 mb-3">
              <p className="text-white mb-1">วันที่ทำสัญญา (เริ่มต้น)</p>
              <input
                disabled={contextLoad}
                type="date"
                onChange={(event: any) =>
                  setFormSearchExport({
                    ...formSearchExport,
                    contractDate: {
                      ...formSearchExport.contractDate,
                      [event.target.name]: event.target.value,
                    },
                  })
                }
                value={formSearchExport.contractDate.start}
                name="start"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="basis-1/3 px-3 mb-3">
              <p className="text-white mb-1">วันที่ทำสัญญา (สื้นสุด)</p>
              <input
                disabled={contextLoad}
                type="date"
                onChange={(event: any) =>
                  setFormSearchExport({
                    ...formSearchExport,
                    contractDate: {
                      ...formSearchExport.contractDate,
                      [event.target.name]: event.target.value,
                    },
                  })
                }
                value={formSearchExport.contractDate.end}
                name="end"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          </div>

          <div className="flex justify-center mt-5 space-x-4">
            <button
              disabled={contextLoad}
              onClick={() => onSubmitSearch()}
              type="button"
              className="rounded-lg bg-orange-600 hover:bg-orange-500 px-3 py-1 text-white"
            >
              <div className="flex space-x-3 items-center">
                {context?.loadingContext ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426M10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
                    />
                  </svg>
                )}
                <span>ค้นหา</span>
              </div>
            </button>

            <button
              disabled={contextLoad}
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
                <span>ยกเลิก</span>
              </div>
            </button>

            {rows.length > 0 && (
              <button
                disabled={contextLoad}
                onClick={onExport}
                type="button"
                className="rounded-lg bg-yellow-500 hover:bg-yellow-400 px-3 py-1 text-white"
              >
                <div className="flex space-x-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 48 48"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    >
                      <path d="M37 32H11v12h26z" />
                      <path
                        strokeLinecap="round"
                        d="M4 20h40v18h-6.983v-6H10.98v6H4z"
                        clipRule="evenodd"
                      />
                      <path d="M38 4H10v16h28z" />
                    </g>
                  </svg>
                  <span>รายงาน</span>
                </div>
              </button>
            )}
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}
          {rows.length > 0 && (
            <div>
              <div className="w-full divider text-white">ข้อมูล</div>

              <TableList
                columns={columns}
                rows={rows}
                height="100%"
                // paymentAction={profile.isPayment}
                // clickPayment={onToPayment}
              />

              <div className="mt-6">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  limit={pagination.limit}
                  totalItems={pagination.totalItems}
                  returnPageNo={(page: number) =>
                    setPagination({ ...pagination, page: page })
                  }
                  returnLimit={(limit: number) =>
                    setPagination({ ...pagination, limit: limit })
                  }
                />
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------------------------------------- */}
        </div>
      </dialog>
    </>
  );
};

export default ModalReport;
