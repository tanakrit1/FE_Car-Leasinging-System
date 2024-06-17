import * as echarts from "echarts";
import { useEffect } from "react";

const ChartA = () => {
  const onSetChart = () => {
    const option: any = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };
    const chartElement = document.getElementById("chartA");
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
            <p className="font-bold text-xl text-white">สรุปยอดขายทั้งหมด</p>
        </div>
        <div id="chartA" style={{ width: "100%", height: "97%" }}></div>
      </div>
    </>
  );
};

export default ChartA;
