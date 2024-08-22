import { useEffect, useState } from "react";
import TableList from "../../components/TableList";
import dayjs from "dayjs";

const columns = [
  { label: "ชื่อลูกค้า", width: "20%", field: "customerName" },
  { label: "เบอร์โทร", width: "15%", field: "phoneNumber" },
  { label: "ทะเบียนรถ", width: "10%", field: "licensePlate" },
  { label: "วันนัดชำระ", width: "20%", field: "dueDate" },
  { label: "จำนวนงวดที่ค้าง", width: "5%", field: "RemainingInstallment" },
];


const TableCustomer = ({rows}: any) => {
    const [rowsData, setRowsData] = useState<any>([])

    useEffect( ()=> {
        const mapData = rows.map( (item: any) => {
            console.log("row--> ", item)
            const result = Number(item.numInstallments) - item.payments.length
            return { 
                        ...item, 
                        licensePlate: item?.carInformation?.licensePlate,
                        carBrand: item?.carInformation?.carBrand,
                        model: item?.carInformation?.model,
                        dueDate: dayjs(item?.dueDate).format("DD/MM/YYYY"),
                        RemainingInstallment: result
                    }
        } )

        setRowsData(mapData)
    }, [rows] )
  return (
    <>
      <div className="h-full  bg-slate-700 rounded-lg" >
        <div className="px-6 pt-3" style={{ height: "3%", zIndex: "1000000" }} >
          <p className="font-bold text-xl text-white">รายชื่อลูกค้าใกล้ครบกำหนดชำระ (5 วัน)</p>
        </div>
        <div className="mt-8" style={{ overflowY: "auto", height: "85%" }}>
          <TableList columns={columns} rows={rowsData || []} height="100%" />
        </div>
      </div>
    </>
  );
};
export default TableCustomer;
