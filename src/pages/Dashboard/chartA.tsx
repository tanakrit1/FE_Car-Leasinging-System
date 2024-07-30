import * as echarts from "echarts";
import { useEffect } from "react";

const ChartA = ({ data }: any) => {
  const onSetChart = (years: string[], value: number[]) => {
    const option: any = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: years,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "ยอดรับชำระ",
          type: "bar",
          barWidth: "60%",
          data: value,
        },
      ],
    };
    const chartElement = document.getElementById("chartA");
    const chart = echarts.init(chartElement);
    chart.setOption(option);
  };

  useEffect(() => {
    let years: string[] = [];
    let value: number[] = [];
    for (let key in data) {
      years.push(key);
      value.push(data[key].totalPayment);
    }

    onSetChart(years, value);
  }, [data]);

  return (
    <>
      <div className="h-full  bg-slate-700 rounded-lg">
        <div className="px-6 pt-3" style={{ height: "3%" }}>
          <p className="font-bold text-xl text-white">สรุปยอดรับชำระรายปี</p>
        </div>
        <div id="chartA" style={{ width: "100%", height: "97%" }}></div>
      </div>
    </>
  );
};

export default ChartA;
