import { useContext, useEffect, useState } from "react";
import TableList from "../../components/TableList";
import Pagination from "../../components/pagination";
import _CarInformationApi from "../../api/car-information";
import { LoadContext } from "../../context/loading-context";
import ExcelJS from 'exceljs';
import CarType from "../../assets/car-type.json"

const columns = [
  { label: "ทะเบียนรถ", width: "20%", field: "licensePlate" },
  { label: "ยี่ห้อ", width: "20%", field: "carBrand" },
  { label: "รุ่น", width: "20%", field: "model" },
  { label: "สี", width: "10%", field: "carColor" },
  { label: "ชื่อผู้ขาย", width: "20%", field: "sellerName" },
];

const ModalExport = ({ showModal, returnShowModal }: any) => {
  const context = useContext(LoadContext);
  const [contextLoad, setContextLoad] = useState<any>(context?.loadingContext);
  const [rows, setRows] = useState<any>([]);
  const [formSearch, setFormSearch] = useState<any>({
    licensePlate: "",
    sellerName: "",
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

  const onSubmitSearch = async (page?: number) => {
    context?.setLoadingContext(true);
    let mapJson: any = [];
    for (let field in formSearch) {
      if (formSearch[field] !== "") {
        mapJson.push({
          field: field,
          operator: "equals",
          value: formSearch[field],
        });
      }
    }
    const json: any = {
      page: page ? page : 1,
      limit: pagination.limit,
      filterModel: {
        logicOperator: "and",
        items: mapJson,
      },
    };
    console.log("json--> ", json);
    const resultRows = await _CarInformationApi().search(json);
    if (resultRows.statusCode === 200) {
      setPagination({
        ...pagination,
        page: resultRows.metadata.page,
        totalPages: resultRows.metadata.totalPage,
      });
      setRows(resultRows.data);
    }
    context?.setLoadingContext(false);
    console.log("resultRows--> ", resultRows);
    // console.log("json--> ", json)
  };

  const onClearData = () => {
    setFormSearch({
      licensePlate: "",
      sellerName: "",
    });
    setRows([]);
    setPagination({
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 1,
    });
  };

  const fnExportData = (dataRows: any) => {
    console.log("dataRows--> ", dataRows)
    context?.setLoadingContext(true);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('รายงาน');

    for (let i = 65; i <= 78; i++) {
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
    worksheet.getRow(1).alignment = { horizontal: 'center' };
    worksheet.getCell('A1').value = "ยี่ห้อ";
    worksheet.getCell('B1').value = "รุ่น";
    worksheet.getCell('C1').value = "สี";
    worksheet.getCell('D1').value = "ปี";
    worksheet.getCell('E1').value = "ทะเบียนรถ";
    worksheet.getCell('F1').value = "ชื่อผู้ขาย";
    worksheet.getCell('G1').value = "เลขตัวถัง";
    worksheet.getCell('H1').value = "เลขเครื่องยนต์";
    worksheet.getCell('I1').value = "ราคารับซื้อ";
    worksheet.getCell('J1').value = "ค่าซ่อมบำรุง";
    worksheet.getCell('K1').value = "ต้นทุน";
    worksheet.getCell('L1').value = "กำไรที่ต้องการ";
    worksheet.getCell('M1').value = "ราคาขาย";
    worksheet.getCell('N1').value = "นายหน้า";

    worksheet.getColumn('A').width = 20;
    worksheet.getColumn('B').width = 20;
    worksheet.getColumn('C').width = 20;
    worksheet.getColumn('D').width = 20;
    worksheet.getColumn('E').width = 20;
    worksheet.getColumn('F').width = 20;
    worksheet.getColumn('G').width = 20;
    worksheet.getColumn('H').width = 20;
    worksheet.getColumn('I').width = 20;
    worksheet.getColumn('J').width = 20;
    worksheet.getColumn('K').width = 20;
    worksheet.getColumn('L').width = 20;
    worksheet.getColumn('M').width = 20;
    worksheet.getColumn('N').width = 20;

    let objCarType: any = {}
    for( let i=0; i < CarType.length; i++) {
        objCarType[CarType[i].value] = 0
    }

    let row = 1
    for( let index = 0; index < dataRows.length; index++) {
        row++;
        console.log("row--> ", dataRows[row])
        objCarType[dataRows[index].carCategory] = objCarType[dataRows[index].carCategory] + 1
        worksheet.getRow(row).alignment = { horizontal: 'center' };

        worksheet.getCell('A'+row).value = dataRows[index]?.carBrand
        worksheet.getCell('B'+row).value = dataRows[index]?.model
        worksheet.getCell('C'+row).value = dataRows[index]?.carColor
        worksheet.getCell('D'+row).value = dataRows[index]?.carDate
        worksheet.getCell('E'+row).value = dataRows[index]?.licensePlate
        worksheet.getCell('F'+row).value = dataRows[index]?.sellerName
        worksheet.getCell('G'+row).value = dataRows[index]?.vin
        worksheet.getCell('H'+row).value = dataRows[index]?.engineNumber
        worksheet.getCell('I'+row).value = Number(dataRows[index]?.buyingPrice).toLocaleString()
        worksheet.getCell('J'+row).value = Number(dataRows[index]?.maintenanceCost).toLocaleString()
        worksheet.getCell('K'+row).value = Number(dataRows[index]?.cost).toLocaleString()
        worksheet.getCell('L'+row).value = Number(dataRows[index]?.desiredProfit).toLocaleString()
        worksheet.getCell('M'+row).value = Number(dataRows[index]?.sellingPrice).toLocaleString()
        worksheet.getCell('N'+row).value = dataRows[index]?.agent
        
        for (let key = 65; key <= 78; key++) {
            const char = String.fromCharCode(key); //A-J
            worksheet.getCell(`${char}${row}`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }
    }
    console.log("objCarType--> ", objCarType)
    // ------------------------------------------------------------------------------- //
    row = row + 2;

    worksheet.getCell('A'+row).value = "รถยนต์"
    worksheet.getCell('B'+row).value = objCarType["รถยนต์"]
    worksheet.getCell(`$A${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    worksheet.getCell(`$B${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    row = row + 1;
    worksheet.getCell('A'+row).value = "รถจักรยานยนต์"
    worksheet.getCell('B'+row).value = objCarType["รถจักรยานยนต์"]
    worksheet.getCell(`$A${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    worksheet.getCell(`$B${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    row = row + 1;
    worksheet.getCell('A'+row).value = "รถบรรทุก 6 ล้อ"
    worksheet.getCell('B'+row).value = objCarType["รถบรรทุก 6 ล้อ"]
    worksheet.getCell(`$A${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    worksheet.getCell(`$B${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    row = row + 1;
    worksheet.getCell('A'+row).value = "เครื่องจักร"
    worksheet.getCell('B'+row).value = objCarType["เครื่องจักร"]
    worksheet.getCell(`$A${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    worksheet.getCell(`$B${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    row = row + 1;
    worksheet.getCell('A'+row).value = "รถใช้งานไม่ได้"
    worksheet.getCell('B'+row).value = objCarType["รถใช้งานไม่ได้"]
    worksheet.getCell(`$A${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }
    worksheet.getCell(`$B${row}`).border = {
        top: { style: 'thin', color: { argb: 'ff050505' } },
        left: { style: 'thin', color: { argb: 'ff050505' } },
        bottom: { style: 'thin', color: { argb: 'ff050505' } },
        right: { style: 'thin', color: { argb: 'ff050505' } }
    }




    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'รายงานข้อมูลรถ.xlsx';
        a.click();
    });
    context?.setLoadingContext(false);
  }

  const onExport = async() => {
    context?.setLoadingContext(true);
    let mapJson: any = [];
    for (let field in formSearch) {
      if (formSearch[field] !== "") {
        mapJson.push({
          field: field,
          operator: "equals",
          value: formSearch[field],
        });
      }
    }
    const json: any = {
      page: 1,
      limit: 100000,
      filterModel: {
        logicOperator: "and",
        items: mapJson,
      },
    };
    console.log("json--> ", json);
    const resultRows = await _CarInformationApi().search(json);
    if (resultRows.statusCode === 200) {
      console.log("resultRows--> ", resultRows.data)
      fnExportData(resultRows.data)
    }
    context?.setLoadingContext(false);
  }

  useEffect(() => {
    onSubmitSearch(pagination.page);
  }, [pagination.page]);

  useEffect(() => {
    if (showModal === true) {
      (document.getElementById("modal-export") as HTMLFormElement).showModal();
      onClearData();
    } else {
      (document.getElementById("modal-export") as HTMLFormElement).close();
    }
  }, [showModal]);
  return (
    <>
      <dialog id="modal-export" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg text-white">ค้นหาข้อมูล</h3>
            <button
              onClick={() => returnShowModal(false)}
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            >
              ✕
            </button>
          </div>

          <div className="w-full mt-5 flex ">
            <div className="w-1/2 px-3 ">
              <p className="text-white mb-1">เลขทะเบียน</p>
              <input
                disabled={contextLoad}
                type="text"
                onChange={(event: any) =>
                  setFormSearch({
                    ...formSearch,
                    [event.target.name]: event.target.value,
                  })
                }
                value={formSearch.licensePlate}
                name="licensePlate"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="w-1/2 px-3 ">
              <p className="text-white mb-1">ชื่อผู้ขาย</p>
              <input
                disabled={contextLoad}
                type="text"
                onChange={(event: any) =>
                  setFormSearch({
                    ...formSearch,
                    [event.target.name]: event.target.value,
                  })
                }
                value={formSearch.sellerName}
                name="sellerName"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          </div>

          <div className="flex justify-center mt-5 space-x-4">
            <button
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

            { rows.length > 0 &&  
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
            }
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}
          {rows.length > 0 && (
            <div>
              <div className="w-full divider text-white">ข้อมูล</div>

              <TableList
                columns={columns}
                rows={rows}
                height="100%"
                // viewAction
                // clickView={returnViewData}
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

export default ModalExport;
