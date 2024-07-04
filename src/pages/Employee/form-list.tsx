import { useState } from "react";
import Pagination from "../../components/pagination";
import TableList from "../../components/TableList";

interface Props {
    rows: any;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    rowsPerPage: number;
  };
  returnPageNo: (page: number) => void;
  returnLimit: (limit: number) => void;
  returnViewData: (data: any) => void;
}

const columns = [
  { label: "รหัสพนักงาน", width: "10%", field: "employeeID" },
  { label: "ชื่อ", width: "10%", field: "firstName" },
  { label: "สกุล", width: "40%", field: "lastName" },
  { label: "เบอร์ติดต่อ", width: "10%", field: "phone" },
  { label: "สถานะ", width: "10%", field: "role" },
  { label: "Dashboard", width: "10%", field: "isDashboard" },
  { label: "ข้อมูลรถ", width: "10%", field: "isCardata" },
  { label: "ข้อมูลลูกค้า", width: "10%", field: "isCustomerData" },
  { label: "ชำระเงิน", width: "10%", field: "isPayment" },
  { label: "ทีมงาน", width: "10%", field: "isEmployee" },
];

const FormList = ({ rows, pagination, returnPageNo, returnLimit, returnViewData }: Props) => {
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">รายการทีมงาน</p>
        </div>

        <div
          className="mt-5 px-3 pb-6"
          style={{ overflowY: "auto", height: "78%" }}
        >
          <TableList
            columns={columns}
            rows={rows}
            height="100%"
            viewAction
            clickView={returnViewData}
          />
        </div>
        <div className="flex items-center  px-3 h-16" style={{ height: "15%" }}>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            limit={pagination.limit}
            totalItems={rows.length}
            returnPageNo={returnPageNo}
            returnLimit={returnLimit}
          />
        </div>
      </div>
    </>
  );
};

export default FormList;
