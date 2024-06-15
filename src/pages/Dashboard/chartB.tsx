import * as echarts from "echarts";
import { useEffect } from "react";

const ChartB = () => {
  const onSetChart = () => {
    const option = {
        // title: {
        //   text: 'Stacked Line'
        // },
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    const chartElement = document.getElementById("chartB");
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
          <p className="font-bold text-xl">สรุปยอดขายรายเดือน</p>
        </div>
        <div id="chartB" style={{ width: "100%", height: "97%" }}></div>
      </div>
      {/* <div id="chartA" className="w-3/4" style={{ height: "400px" }}></div> */}
    </>
  );
};

export default ChartB;
