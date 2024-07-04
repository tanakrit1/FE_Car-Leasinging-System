import { useState } from "react";
import FormList from "./form-list";
import FormSearch from "./form-search";
import ModalManage from "./modal-manage";
import _EmployeeApi from "../../api/employee";

const Employee = () => {
  const [rows, setRows] = useState<any>([]);
  const [rowActive, setRowActive] = useState<any>({});
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    totalPages: 5,
    rowsPerPage: 10,
  });
  const [modalData, setModalData] = useState<any>({
    show: false,
    statusForm: "add",
    data: {},
  });

  const returnSearch = async(formSearch: any) => {
    console.log("formSearch--> ", formSearch);
    // const resultData = await _EmployeeApi().search({})
    // console.log("resultData--> ", resultData)

    let itemsSearch = []
    for (const field in formSearch) {
        // ตรวจสอบว่ามีค่าใดๆ เป็นค่าว่างหรือไม่
        if (formSearch[field] !== "") {
            console.log("employee--> ", formSearch[field])
            itemsSearch.push({
                field: field,
                operator: "equals",
                value: formSearch[field]
            })
        }
      }

    const json: any = {
        page: pagination.page,
        limit: pagination.limit,
        filterModel: {
            logicOperator: "and",
            items: itemsSearch
        }
    }
    console.log("json--> ", json)
    const resultEmployee = await _EmployeeApi().search(json)
    if( resultEmployee.statusCode === 200 ){
        setRows(resultEmployee.data)
    }else{

    }
    console.log("result--> ", resultEmployee)

    // setRows([
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    //   {
    //     a: 1,
    //     b: "05/05/2567",
    //     c: "4,116.76",
    //     d: "1,000",
    //     e: "5,660.67",
    //     f: "999,999",
    //     g: "5,660.67",
    //     h: "เงินสด",
    //   },
    // ]);
  };

  const returnClearForm = () => {
    setRows([]);
  };

  const returnPageNo = (page: number) => {
    console.log("page--> ", page);
    setPagination({ ...pagination, page: page });
  };

  const returnLimit = (limit: number) => {
    console.log("limit--> ", limit);
    setPagination({ ...pagination, limit: limit });
  };

  const returnViewData = (data: any) => {
    console.log("dat--> ", data);
    setRowActive(data);
    onOpenModal("edit");
  };

  const onOpenModal = (status: string) => {
    console.log("status--> ", status);
    setModalData({ ...modalData, statusForm: status, show: true });
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold text-2xl text-white">ทีมงาน {import.meta.env.VITE_APP_URL_API}</p>
        <button
          type="button"
          className="rounded-lg bg-green-600 hover:bg-green-500 px-3 py-1 text-white"
          onClick={() => onOpenModal("add")}
        >
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14 14.252V22H4a8 8 0 0 1 10-7.748M12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m6 4v-3h2v3h3v2h-3v3h-2v-3h-3v-2z"
              />
            </svg>
            <span>เพิ่มทีมงาน</span>
          </div>
        </button>
      </div>

      <div className="pb-4">
        <div className="flex space-x-2 mt-5">
          <FormSearch
            returnSearch={returnSearch}
            returnClearForm={returnClearForm}
          />
        </div>
      </div>

      {rows.length > 0 && (
        <div className="flex space-x-2 mt-2" style={{ height: "100vh" }}>
          <FormList
            rows={rows}
            pagination={pagination}
            returnPageNo={returnPageNo}
            returnLimit={returnLimit}
            returnViewData={returnViewData}
          />
        </div>
      )}

      <ModalManage
        statusForm={modalData.statusForm}
        data={modalData.data}
        showModal={modalData.show}
        returnShowModal={(result: boolean) =>
          setModalData({ ...modalData, show: result })
        }
      />
    </>
  );
};

export default Employee;
