import * as echarts from "echarts";
import { useEffect } from "react";

const ChartC = () => {
  const onSetChart = () => {
    const option: any = {
      xAxis: {
        type: "category",
        data: ["ขายแล้ว", "สต็อก"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [385, 220],
          type: "bar",
        },
      ],
    };
    const chartElement = document.getElementById("chartC");
    const chart = echarts.init(chartElement);
    chart.setOption(option);
  };

  useEffect(() => {
    onSetChart();
  }, []);

  return (
    <>
      <div className="h-full  bg-slate-700 rounded-lg">
        <div className="px-6 pt-3" style={{ height: "3%" }}>
            <p className="font-bold text-xl text-white">สรุปสต็อก</p>
        </div>
        <div id="chartC" style={{ width: "100%", height: "97%" }}></div>
      </div>
    </>
  );
};

export default ChartC;
