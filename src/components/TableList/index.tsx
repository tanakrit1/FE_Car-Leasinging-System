import { Props } from "./interface";

const TableList = ({ columns, rows, height }: Props) => {
  return (
    <>
      <table className="table table-pin-rows" style={{ height: height }}>
        <thead>
          <tr className="bg-slate-400">
            {columns.map((item: any, key: number) => (
              <th
                key={"columnA" + key}
                className="text-white text-lg"
                style={{ width: item.width }}
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody >
          {rows.map((row: any, key: number) => (
            <tr key={"row" + key}>
              {columns.map((column: any, index: number) => (
                <td key={"columnB" + index} className="text-white text-lg">
                  {row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableList;
