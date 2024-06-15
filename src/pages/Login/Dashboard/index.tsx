import ChartA from "./chartA";
import ChartB from "./chartB";
import ChartC from "./chartC";
import TableCustomer from "./table-customer";
// import { useWindowSize } from "@uidotdev/usehooks";

const Dashboard = () => {
  //   const size = useWindowSize();

  return (
    <>
      <div className="flex space-x-2" style={{ height: "80vh" }}>
        <div className="w-1/3 ">
          <ChartA />
        </div>

        {/* ----------------------------------------------------------------------------- */}
        
        <div className="w-2/3 space-y-2">
          <div className="h-1/2 flex space-x-2  ">
            <div className="w-2/3">
              <ChartB />
            </div>
            <div className="w-1/3">
                <ChartC />
            </div>
          </div>
          <div className="h-1/2">
            <TableCustomer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
