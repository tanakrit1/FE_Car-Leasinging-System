import Pagination from "../../components/pagination";
import TableList from "../../components/TableList";

interface Props {
  rows: any;
  returnPrintData: any;
  returnViewData: any;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    rowsPerPage: number;
  };
  returnPageNo: (page: number) => void;
  returnLimit: (limit: number) => void;
}

const columns = [
  { label: "A", width: "10%", field: "a" },
  { label: "B", width: "10%", field: "b" },
  { label: "C", width: "40%", field: "c" },
  { label: "D", width: "10%", field: "d" },
  { label: "E", width: "10%", field: "e" },
  { label: "F", width: "10%", field: "f" },
  { label: "G", width: "10%", field: "g" },
  { label: "H", width: "10%", field: "h" },
];

const FormListData = ({
  rows,
  returnPrintData,
  returnViewData,
  pagination,
  returnPageNo,
  returnLimit
}: Props) => {
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">ข้อมูลการชำระค่างวด</p>
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
            printAction
            clickPrint={returnPrintData}
            clickView={returnViewData}
          />
        </div>
        <div
          className="flex items-center  px-3 h-16"
          style={{ height: "15%" }}
        >
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            limit={pagination.limit}
            totalItems= {rows.length}
            returnPageNo={returnPageNo}
            returnLimit={returnLimit}
          />
        </div>
      </div>
    </>
  );
};

export default FormListData;
