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
        const worksheet = workbook.addWorksheet('สรุปยอดรับชำระ');
        const worksheet2 = workbook.addWorksheet('รายละเอียดการรับชำระ');
        const worksheet3 = workbook.addWorksheet('รายละเอียดรถที่ขาย');

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

        worksheet.getCell('A2').value = "เงินต้นที่ได้รับทั้งหมด";
        worksheet.getCell('B2').value = Math.ceil(response.Result.totalAmountPay).toLocaleString()
        worksheet.getCell('C2').value = "ยอดชำระดอกเบี้ยทั้งหมด";
        worksheet.getCell('D2').value = Math.ceil(response.Result.totalInterestPay).toLocaleString()

        worksheet.getCell('A3').value = "ค่าปรับทั้งหมด";
        worksheet.getCell('B3').value = Math.ceil(response.Result.totalFee).toLocaleString()
        worksheet.getCell('C3').value = "ยอดรวม";
        worksheet.getCell('D3').value = Math.ceil(response.Result.grandTotal).toLocaleString()

        worksheet.getCell('A4').value = "ยอดรวมการลงทุน";
        worksheet.getCell('B4').value = Math.ceil(response.Result.totalCost).toLocaleString() 
        worksheet.getCell('C4').value = "ยอดคงเหลือของการผ่อนทั้งหมด";
        worksheet.getCell('D4').value = Math.ceil(response.Result.totalInstallmentBal).toLocaleString()  

        worksheet.getCell('A5').value = "จำนวนรถที่ขายได้";
        worksheet.getCell('B5').value = Math.ceil(response.Result.soldCount).toLocaleString() 

        worksheet.getRow(1).alignment = { horizontal: 'center' };
        worksheet.getRow(2).alignment = { horizontal: 'center' };
        worksheet.getRow(3).alignment = { horizontal: 'center' };
        worksheet.getRow(4).alignment = { horizontal: 'center' };
        worksheet.getRow(5).alignment = { horizontal: 'center' };
        worksheet.getColumn('A').width = 30;
        worksheet.getColumn('B').width = 30;
        worksheet.getColumn('C').width = 30;
        worksheet.getColumn('D').width = 30;

        for( let row=1; row<=4; row++ ){
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

        for (let key = 65; key <= 66; key++) {
            const char = String.fromCharCode(key); //A-D
            worksheet.getCell(`${char}${5}`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }

        // -------------------------------- Sheet 2 ---------------------------------------- //

        for (let i = 65; i <= 73; i++) {
            const char = String.fromCharCode(i); //A-I
            worksheet2.getCell(`${char}2`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'fff3fa08' },
            }
            worksheet2.getCell(`${char}2`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }

        worksheet2.getCell(`A1`).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'fff3fa08' },
        }
        worksheet2.getCell(`A1`).border = {
            top: { style: 'thin', color: { argb: 'ff050505' } },
            left: { style: 'thin', color: { argb: 'ff050505' } },
            bottom: { style: 'thin', color: { argb: 'ff050505' } },
            right: { style: 'thin', color: { argb: 'ff050505' } }
        }

        worksheet2.mergeCells(1, 1, 1, 9)
        worksheet2.getCell('A1').value = `รายงานสรุปยอดรับชำระประจำเดือน ${dayjs().format("MM/YYYY")}`;
        worksheet2.getCell('A2').value = "ชื่อ";
        worksheet2.getCell('B2').value = "ประเภท";
        worksheet2.getCell('C2').value = "ยี่ห้อ";
        worksheet2.getCell('D2').value = "รุ่น";
        worksheet2.getCell('E2').value = "เลขทะเบียน";
        worksheet2.getCell('F2').value = "เงินต้น";
        worksheet2.getCell('G2').value = "ดอกเบี้ย";
        worksheet2.getCell('H2').value = "ค่าปรับ";
        worksheet2.getCell('I2').value = "โน๊ต";
        worksheet2.getRow(1).alignment = { horizontal: 'center' };
        worksheet2.getRow(2).alignment = { horizontal: 'center' };
        worksheet2.getColumn('A').width = 30;
        worksheet2.getColumn('B').width = 15;
        worksheet2.getColumn('C').width = 15;
        worksheet2.getColumn('D').width = 15;
        worksheet2.getColumn('E').width = 15;
        worksheet2.getColumn('F').width = 15;
        worksheet2.getColumn('G').width = 15;
        worksheet2.getColumn('H').width = 15;
        worksheet2.getColumn('I').width = 50;

        let row = 3
        for( let i=0; i<response.Transection.length; i++ ){
            const productType = response.Transection[i].saleItem.carInformation.carType == "other"
                    ? response.Transection[i].saleItem.carInformation.productOther
                    : response.Transection[i].saleItem.carInformation.carCategory
            worksheet2.getRow(row).alignment = { horizontal: 'center' };
            worksheet2.getCell(`A${row}`).value = response.Transection[i]?.saleItem?.customerName
            worksheet2.getCell(`B${row}`).value = productType
            worksheet2.getCell(`C${row}`).value = response.Transection[i]?.saleItem?.carInformation.carBrand       
            worksheet2.getCell(`D${row}`).value = response.Transection[i]?.saleItem?.carInformation.model        
            worksheet2.getCell(`E${row}`).value = response.Transection[i]?.saleItem?.carInformation.licensePlate        
            worksheet2.getCell(`F${row}`).value = Math.ceil(response.Transection[i]?.amountPay).toLocaleString()
            worksheet2.getCell(`G${row}`).value = Math.ceil(response.Transection[i]?.InterestPay).toLocaleString()
            worksheet2.getCell(`H${row}`).value = Math.ceil(response.Transection[i]?.fee).toLocaleString()
            worksheet2.getCell(`I${row}`).value = response.Transection[i]?.note

            for (let key = 65; key <= 73; key++) {
                const char = String.fromCharCode(key); //A-I
                worksheet2.getCell(`${char}${row}`).border = {
                    top: { style: 'thin', color: { argb: 'ff050505' } },
                    left: { style: 'thin', color: { argb: 'ff050505' } },
                    bottom: { style: 'thin', color: { argb: 'ff050505' } },
                    right: { style: 'thin', color: { argb: 'ff050505' } }
                }
            }
            
            row++
        }


        // -------------------------------- Sheet 3 ---------------------------------------- //

        for (let i = 65; i <= 68; i++) {
            const char = String.fromCharCode(i); //A-D
            worksheet3.getCell(`${char}2`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'fff3fa08' },
            }
            worksheet3.getCell(`${char}2`).border = {
                top: { style: 'thin', color: { argb: 'ff050505' } },
                left: { style: 'thin', color: { argb: 'ff050505' } },
                bottom: { style: 'thin', color: { argb: 'ff050505' } },
                right: { style: 'thin', color: { argb: 'ff050505' } }
            }
        }

        worksheet3.getCell(`A1`).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'fff3fa08' },
        }
        worksheet3.getCell(`A1`).border = {
            top: { style: 'thin', color: { argb: 'ff050505' } },
            left: { style: 'thin', color: { argb: 'ff050505' } },
            bottom: { style: 'thin', color: { argb: 'ff050505' } },
            right: { style: 'thin', color: { argb: 'ff050505' } }
        }

        worksheet3.mergeCells(1, 1, 1, 4)
        worksheet3.getCell('A1').value = `รายละเอียดรถที่ขาย ประจำเดือน ${dayjs().format("MM/YYYY")}`;
        worksheet3.getCell('A2').value = "ยี่ห้อ";
        worksheet3.getCell('B2').value = "รุ่น";
        worksheet3.getCell('C2').value = "สี";
        worksheet3.getCell('D2').value = "เลขทะเบียน";
        worksheet3.getRow(1).alignment = { horizontal: 'center' };
        worksheet3.getRow(2).alignment = { horizontal: 'center' };
        worksheet3.getColumn('A').width = 15;
        worksheet3.getColumn('B').width = 15;
        worksheet3.getColumn('C').width = 15;
        worksheet3.getColumn('D').width = 15;

        let rowSheet3 = 3
        for( let i=0; i<response.TransectionSold.length; i++ ){
            worksheet3.getRow(row).alignment = { horizontal: 'center' };
            worksheet3.getCell(`A${rowSheet3}`).value = response.TransectionSold[i]?.carInformation?.carBrand
            worksheet3.getCell(`B${rowSheet3}`).value = response.TransectionSold[i]?.carInformation?.model
            worksheet3.getCell(`C${rowSheet3}`).value = response.TransectionSold[i]?.carInformation?.carColor
            worksheet3.getCell(`D${rowSheet3}`).value = response.TransectionSold[i]?.carInformation?.licensePlate

            for (let key = 65; key <= 68; key++) {
                const char = String.fromCharCode(key); 
                worksheet3.getCell(`${char}${rowSheet3}`).border = {
                    top: { style: 'thin', color: { argb: 'ff050505' } },
                    left: { style: 'thin', color: { argb: 'ff050505' } },
                    bottom: { style: 'thin', color: { argb: 'ff050505' } },
                    right: { style: 'thin', color: { argb: 'ff050505' } }
                }
            }
            rowSheet3++
        }


        // -------------------------------- Steam file ---------------------------------------- //

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
