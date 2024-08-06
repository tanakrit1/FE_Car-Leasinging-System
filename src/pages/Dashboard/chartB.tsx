import * as echarts from "echarts";
import { useContext, useEffect } from "react";
import _DashboardApi from "../../api/dashboard";
import dayjs from "dayjs";
import ExcelJS from 'exceljs';
import { LoadContext } from "../../context/loading-context";

const ChartB = ({ data }: any) => {
    const context = useContext(LoadContext)
  const onSetChart = (month: string[], value: number[]) => {
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
          name: "ยอดรับชำระ",
          type: "bar",
          barWidth: "60%",
          data: value,
        },
      ],
    };
    const chartElement = document.getElementById("chartB");
    const chart = echarts.init(chartElement);
    chart.setOption(option);
  };

  useEffect(() => {
    let month: string[] = [];
    let value: number[] = [];
    for (let key in data) {
      month.push(key);
      value.push(data[key].totalPayment);
    }

    onSetChart(month, value);
  }, [data]);

  const onExport = async() => {
    context?.setLoadingContext(true)
    console.log("***onExport***");
    const response = await _DashboardApi().getReport({ date: dayjs().format("YYYY-MM-DD") });
    // if( response?.statusCode === 200 ){
        console.log("response--> ", response)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('รายงาน');

        for (let i = 65; i <= 68; i++) {
            const char = String.fromCharCode(i); //A-D
            worksheet.getCell(`${char}1`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'fff3fa08' },
            }
            worksheet.getCell(`${char}1`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }

        worksheet.mergeCells(1, 1, 1, 4)
        worksheet.getCell('A1').value = `รายงานสรุปยอดรับชำระประจำเดือน ${dayjs().format("MM/YYYY")}`;

        worksheet.getCell('A2').value = "เงินต้น";
        worksheet.getCell('B2').value = Math.ceil(response.Result.totalAmountPay).toLocaleString()
        worksheet.getCell('C2').value = "ดอกเบี้ย";
        worksheet.getCell('D2').value = Math.ceil(response.Result.totalInterestPay).toLocaleString()

        worksheet.getCell('A3').value = "ค่าปรับ";
        worksheet.getCell('B3').value = Math.ceil(response.Result.totalFee).toLocaleString()
        worksheet.getCell('C3').value = "ยอดรวม";
        worksheet.getCell('D3').value = Math.ceil(response.Result.grandTotal).toLocaleString()

        worksheet.getRow(1).alignment = { horizontal: 'center' };
        worksheet.getRow(2).alignment = { horizontal: 'center' };
        worksheet.getRow(3).alignment = { horizontal: 'center' };
        worksheet.getColumn('A').width = 30;
        worksheet.getColumn('B').width = 30;
        worksheet.getColumn('C').width = 30;
        worksheet.getColumn('D').width = 30;

        for( let row=1; row<=3; row++ ){
            for (let key = 65; key <= 68; key++) {
                const char = String.fromCharCode(key); //A-D
                worksheet.getCell(`${char}${row}`).border = {
                    top: { style: 'thin', color: { argb: 'ff050505' } },
                    left: { style: 'thin', color: { argb: 'ff050505' } },
                    bottom: { style: 'thin', color: { argb: 'ff050505' } },
                    right: { style: 'thin', color: { argb: 'ff050505' } }
                }
            }
        }

        // ------------------------------------------------------------------------ //

        for (let i = 65; i <= 68; i++) {
            const char = String.fromCharCode(i); //A-D
            worksheet.getCell(`${char}6`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'fff3fa08' },
            }
            worksheet.getCell(`${char}6`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }

        worksheet.getCell('A6').value = "ชื่อ";
        worksheet.getCell('B6').value = "เงินต้น";
        worksheet.getCell('C6').value = "ดอกเบี้ย";
        worksheet.getCell('D6').value = "ค่าปรับ";
        worksheet.getRow(6).alignment = { horizontal: 'center' };

        let row = 7
        for( let i=0; i<response.Transection.length; i++ ){
            worksheet.getRow(row).alignment = { horizontal: 'center' };
            worksheet.getCell(`A${row}`).value = response.Transection[i]?.saleItem?.customerName
            worksheet.getCell(`B${row}`).value = Math.ceil(response.Transection[i]?.amountPay).toLocaleString()
            worksheet.getCell(`C${row}`).value = Math.ceil(response.Transection[i]?.InterestPay).toLocaleString()
            worksheet.getCell(`D${row}`).value = Math.ceil(response.Transection[i]?.fee).toLocaleString()

            for (let key = 65; key <= 68; key++) {
                const char = String.fromCharCode(key); //A-D
                worksheet.getCell(`${char}${row}`).border = {
                    top: { style: 'thin', color: { argb: 'ff050505' } },
                    left: { style: 'thin', color: { argb: 'ff050505' } },
                    bottom: { style: 'thin', color: { argb: 'ff050505' } },
                    right: { style: 'thin', color: { argb: 'ff050505' } }
                }
            }
            
            row++
        }



        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `รายงานสรุปยอดรับชำระ ${dayjs().format("MM-YYYY")}.xlsx`;
            a.click();
        });

    // }
    context?.setLoadingContext(false)
  };

  return (
    <>
      <div className="h-full  bg-slate-700 rounded-lg">
        <div
          className="px-6 pt-3 flex justify-between"
          style={{ height: "13%" }}
        >
          <p className="font-bold text-xl text-white">สรุปยอดรับชำระรายเดือน</p>
          <button
            onClick={onExport}
            type="button"
            className="rounded-lg bg-yellow-500 hover:bg-yellow-400 px-3 py-1 text-white"
          >
            <div className="flex space-x-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path d="M37 32H11v12h26z" />
                  <path
                    strokeLinecap="round"
                    d="M4 20h40v18h-6.983v-6H10.98v6H4z"
                    clipRule="evenodd"
                  />
                  <path d="M38 4H10v16h28z" />
                </g>
              </svg>
              <span>รายงาน</span>
            </div>
          </button>
        </div>
        <div id="chartB" style={{ width: "100%", height: "87%" }}></div>
      </div>
      {/* <div id="chartA" className="w-3/4" style={{ height: "400px" }}></div> */}
    </>
  );
};

export default ChartB;
