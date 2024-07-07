import { useEffect, useState } from "react";
import TableList from "../../components/TableList";

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

const ModalSearch = ({ showModal, returnShowModal }: any) => {
  const [rows, setRows] = useState<any>([]);

  const returnViewData = (row: any) => {
    console.log("row--> ", row)
  }

  useEffect(() => {
    if (showModal === true) {
      (
        document.getElementById("modal-employee-search") as HTMLFormElement
      ).showModal();
    } else {
      (
        document.getElementById("modal-employee-search") as HTMLFormElement
      ).close();
    }
  }, [showModal]);
  return (
    <>
      <dialog id="modal-employee-search" className="modal">
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
                type="text"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
            <div className="w-1/2 px-3 ">
              <p className="text-white mb-1">ชื่อผู้ขาย</p>
              <input
                type="text"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="rounded-lg bg-orange-600 hover:bg-orange-500 px-3 py-1 text-white"
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
                    fillRule="evenodd"
                    d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426M10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
                  />
                </svg>
                <span>ค้นหา</span>
              </div>
            </button>
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}

          <div>
            <div className="w-full divider text-white">ข้อมูล</div>

            <TableList
              columns={columns}
              rows={rows}
              height="100%"
              viewAction
              clickView={returnViewData}
            />
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}
        </div>
      </dialog>
    </>
  );
};

export default ModalSearch;
