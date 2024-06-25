import { useEffect, useState } from "react";
import FormSearch from "./form-search";
import FormListData from "./form-list-data";

const Payment = () => {
  const [payloadSearch, setPayloadSearch] = useState<any>({});
  const [rowsData, setRowsData] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    totalPages: 4,
    rowsPerPage: 10,
  });

  const onChangeInputSearch = (event: any) => {
    console.log("event--> ", event);
    setPayloadSearch(event);
  };

  const onSearchData = () => {
    console.log("payloadSearch--> ", payloadSearch);
    setRowsData([
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
      {
        a: 1,
        b: "05/05/2567",
        c: "4,116.76",
        d: "1,000",
        e: "5,660.67",
        f: "999,999",
        g: "5,660.67",
        h: "เงินสด",
      },
    ]);
  };

  const onClearFormSearch = () => {
    console.log("aa");
    onChangeInputSearch({});
    setRowsData([]);
  };

  const onPrintData = (row: any) => {
    console.log(row);
  };

  const onViewData = (row: any) => {
    console.log(row);
  };

  useEffect( ()=> {
    console.log("pagination--> ", pagination)
  }, [pagination.page, pagination.limit] )

  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold text-2xl text-white">ชำระค่างวด</p>
        {/* <div className="flex space-x-2">
          <span className="text-white font-semibold">รหัส : xxxxxxxxx</span>
          <span className="text-white font-semibold">|</span>
          <span className="text-white font-semibold">
            {" "}
            วันที่ซื้อ : {dayjs().format("DD/MM/YYYY")}
          </span>
        </div> */}
      </div>

      <div className="pb-4">
        <div className="flex space-x-2 mt-5">
          <FormSearch
            returnInputChange={onChangeInputSearch}
            returnSearchData={onSearchData}
            returnClearForm={onClearFormSearch}
          />
        </div>

        {rowsData.length > 0 && (
          <div className="flex space-x-2 mt-5" style={{ height: "100vh" }}>
            <FormListData
              rows={rowsData}
              returnPrintData={onPrintData}
              returnViewData={onViewData}
              pagination={pagination}
                returnPageNo={(page)=> setPagination({...pagination, page: page})}
                returnLimit={(page)=> setPagination({...pagination, limit: page})}
            //   returnPageNo={(page) => console.log("page-->", page)}
            //   returnLimit={(limit) => console.log("limit-->", limit)}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Payment;
