import TableList from "../../components/TableList";

const columns = [
  { label: "A", width: "10%", field: "a" },
  { label: "B", width: "10%", field: "b" },
  { label: "C", width: "40%", field: "c" },
  { label: "D", width: "10%", field: "d" },
  { label: "E", width: "10%", field: "e" },
  { label: "F", width: "10%", field: "f" },
  { label: "G", width: "10%", field: "g" },
];

const rows = [
    {a: "1", b: "2", c: "3", d: "4", e: "5", f: "6", g: "7"},
    {a: "1", b: "2", c: "3", d: "4", e: "5", f: "6", g: "7"},
    {a: "1", b: "2", c: "3", d: "4", e: "5", f: "6", g: "7"},
    {a: "1", b: "2", c: "3", d: "4", e: "5", f: "6", g: "7"},
    {a: "1", b: "2", c: "3", d: "4", e: "5", f: "6", g: "7"},
    {a: "1", b: "2", c: "3", d: "4", e: "5", f: "6", g: "7"},
];

const TableCustomer = () => {
  return (
    <>
      <div className="h-full  bg-slate-700 rounded-lg" >
        <div className="px-6 pt-3" style={{ height: "3%", zIndex: "1000000" }} >
          <p className="font-bold text-xl text-white">รายชื่อลูกค้าใกล้ครบกำหนดชำระ</p>
        </div>
        <div className="mt-8" style={{ overflowY: "auto", height: "85%" }}>
          <TableList columns={columns} rows={rows} height="100%" />
        </div>
      </div>
    </>
  );
};
export default TableCustomer;
