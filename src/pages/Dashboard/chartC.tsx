import * as echarts from "echarts";
import { useEffect } from "react";

const ChartC = ({data}: any) => {
    const onSetChart = (month: string[], value: any[]) => {
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
              data: month,
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
              name: "จำนวน",
              type: "bar",
              barWidth: "60%",
              data: value,
            },
          ],
        };
        const chartElement = document.getElementById("chartC");
        const chart = echarts.init(chartElement);
        chart.setOption(option);
      };
    
      useEffect(() => {
        let keyData: string[] = [];
        let value: number[] = [];
        for (let key in data) {
            keyData.push(key);
            value.push(data[key]);
        }
        
        onSetChart(keyData, value);
      }, [data]);

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
