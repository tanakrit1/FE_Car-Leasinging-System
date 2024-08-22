import { useContext, useEffect, useState } from "react";
// import ChartA from "./chartA";
import ChartB from "./chartB";
import ChartC from "./chartC";
import TableCustomer from "./table-customer";
import _DashboardApi from "../../api/dashboard";
import { LoadContext } from "../../context/loading-context";
import dayjs from "dayjs";
import _SaleItemApi from "../../api/saleItem";
// import { useWindowSize } from "@uidotdev/usehooks";

const Dashboard = () => {
  const [data, setData] = useState<any>({});
  const [rowsSaleItem, setRowsSaleItem] = useState<any>([]);
  const context = useContext(LoadContext);

  const onLoadData = async () => {
    context?.setLoadingContext(true);
    const result = await _DashboardApi().getData({});
    if (result?.statusCode === 200) {
      setData(result.data);
      await fnLoadSaleItem();
    }
    context?.setLoadingContext(false);
  };

  const fnLoadSaleItem = async () => {
    // console.log("***fnLoadSaleItem***");
    const toDay = dayjs().format("YYYY-MM-DD");
    // console.log("toDay--> ", toDay);
    const fiveDaysAgo = dayjs().subtract(5, "day").format("YYYY-MM-DD");
    // console.log("fiveDaysAgo--> ", fiveDaysAgo);
    const json = {
      page: 1,
      limit: 10000,
      filterModel: {
        logicOperator: "and",
        items: [
          {
            field: "dueDate",
            operator: "between",
            value: [fiveDaysAgo, toDay],
          },
          {
            field: "statusInstallment",
            operator: "notEqual",
            value: "Close",
          },
        ],
      },
    };
    const result = await _SaleItemApi().search(json);
    if (result?.statusCode === 200) {
      setRowsSaleItem(result.data);
    }
    console.log("resultAA--> ", result);
  };

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <>
      <div className="flex space-x-2" style={{ height: "80vh" }}>
        <div className="w-2/3 space-y-2">
          <div className="h-1/2">
            <TableCustomer rows={rowsSaleItem} />
          </div>
          <div className="h-1/2">
            <ChartB data={data?.paymentMonth} />
          </div>
        </div>

        {/* ----------------------------------------------------------------------------- */}

        <div className="w-1/3 space-y-2">
          <ChartC data={data?.stock} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
