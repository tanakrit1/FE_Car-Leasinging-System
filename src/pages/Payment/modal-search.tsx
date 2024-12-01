import { useContext, useEffect, useState } from "react";
import TableList from "../../components/TableList";
import Pagination from "../../components/pagination";
import { LoadContext } from "../../context/loading-context";
import _SaleItemApi from "../../api/saleItem";
// import { useNavigate } from "react-router-dom";

const columns = [
  { label: "รหัสสัญญา", width: "10%", field: "id" },
  { label: "ชื่อลูกค้า", width: "30%", field: "customerName" },
  { label: "เบอร์ติดต่อ", width: "20%", field: "phoneNumber" },
  { label: "การซื้อ", width: "15%", field: "saleType" },
  { label: "ทะเบียนรถ", width: "25%", field: "licensePlate" },
];

const ModalSearch = ({ showModal, returnShowModal, returnViewData }: any) => {
    // const navigate = useNavigate();
  const context = useContext(LoadContext);
  const [contextLoad, setContextLoad] = useState<any>(context?.loadingContext);
  const [rows, setRows] = useState<any>([]);
  const [formSearch, setFormSearch] = useState<any>({
    id: "",
    customerName: "",
  });
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  useEffect(()=> {
    setContextLoad(context?.loadingContext)
  }, [context?.loadingContext])

  const onSubmitSearch = async (page?: number) => {
    context?.setLoadingContext(true);
    let mapJson: any = [];
    for (let field in formSearch) {
      if (formSearch[field] !== "") {
        mapJson.push({
          field: field,
        //   operator: "equals",
          operator: (field==="customerName") ? "contains" : "equals",
          value: formSearch[field],
        });
      }
    }
    // mapJson = [...mapJson, {
    //     field: "statusInstallment",
    //     operator: "isNull",
    //     value: "",
    // }]
    const json: any = {
      page: page ? page : 1,
      limit: pagination.limit,
      filterModel: {
        logicOperator: "and",
        items: mapJson,
      },
    };
    const resultRows = await _SaleItemApi().search(json);
    if (resultRows.statusCode === 200) {
      if (resultRows.data.length === 0) {
        alert("ไม่พบข้อมูล");
      }
      const newRows = resultRows.data.map( (item: any) => {
        return {...item, licensePlate: item.carInformation?.licensePlate, saleType: item.saleType === "buy" ? "ขายรถ" : item.saleType==="pledge" ? "รับจำนำรถ" : "อื่นๆ"}
        // return { ...item, detailCarType: item.carType=="buy" ? "รับซื้อ" : item.carType=="pledge" ? "รับจำนำ" : "อื่นๆ" }
      } )
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
    setFormSearch({
        id: "",
        customerName: "",
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
        document.getElementById("modal-saleItem-search") as HTMLFormElement
      ).showModal();
      onClearData();
    } else {
      (
        document.getElementById("modal-saleItem-search") as HTMLFormElement
      ).close();
    }
    setFormSearch({
        id: "",
        customerName: "",
      })
  }, [showModal]);
  return (
    <>
      <dialog id="modal-saleItem-search" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg text-white">ค้นหาข้อมูลรายการขาย</h3>
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
              <p className="text-white mb-1">ชื่อลูกค้า</p>
              <input
                placeholder="ชื่อลูกค้า"
                disabled={contextLoad}
                type="text"
                onChange={(event: any) =>
                  setFormSearch({
                    ...formSearch,
                    [event.target.name]: event.target.value,
                  })
                }
                value={formSearch.customerName}
                name="customerName"
                className="bg-slate-50 text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2"
              />
            </div>

            <div className="w-1/2 px-3 ">
              <p className="text-white mb-1">รหัสสัญญา</p>
              <input
                disabled={contextLoad}
                placeholder="รหัสสัญญา"
                type="text"
                onChange={(event: any) =>
                  setFormSearch({
                    ...formSearch,
                    [event.target.name]: event.target.value,
                  })
                }
                value={formSearch.id}
                name="id"
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
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}
          {rows.length > 0 && (
            <div>
              <div className="w-full divider text-white">ข้อมูล</div>

              <TableList
                columns={columns}
                rows={rows}
                height="100%"
                viewAction
                clickView={returnViewData}
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

export default ModalSearch;
