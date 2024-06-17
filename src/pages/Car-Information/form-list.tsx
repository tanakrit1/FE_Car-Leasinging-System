import TableList from "../../components/TableList";

const columns = [
    { label: "A", width: "10%", field: "a" },
    { label: "B", width: "30%", field: "b" },
    { label: "C", width: "40%", field: "c" },
    { label: "D", width: "10%", field: "d" },    
    // { label: "Action", width: "10%", field: "action" },    
]

const rows = [
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
    {a: "1", b: "2", c: "3", d: "4"},
]

const FormList = () => {
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">บันทึกข้อมูล</p>
          <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-green-600">
            <div className="flex space-x-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path
                  d="M423.8 128H384V64H128v64H88.2C60.3 128 32 144.9 32 182.6v123.8c0 38 28.3 61.6 56.2 61.6H128v112h256V368h39.8c27.9 0 56.2-22.6 56.2-53.6V182.6c0-35.7-28.2-54.6-56.2-54.6zM368 464H144V288h224v176zm0-336H144V80h224v48zm48 64h-17v-16h17v16z"
                  fill="currentColor"
                />
                <path d="M160 320h192v16H160z" fill="currentColor" />
                <path d="M160 368h192v16H160z" fill="currentColor" />
                <path d="M160 416h192v16H160z" fill="currentColor" />
              </svg>
              <span>รายงาน</span>
            </div>
          </button>
        </div>
        <div style={{ height: "66vh", overflow: "auto" }}>
            <TableList columns={columns} rows={rows} height="85%" editAction={true} />
        </div>
      </div>
    </>
  );
};
export default FormList;
