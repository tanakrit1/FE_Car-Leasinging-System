import { Props } from "./interface";

const TableList = ({ columns, rows, height, editAction, clickEdit }: Props) => {
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
            {editAction && <th></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, key: number) => (
            <tr key={"row" + key} className="hover:bg-slate-500">
              {columns.map((column: any, index: number) => (
                <td key={"columnB" + index} className="text-white text-lg">
                  {row[column.field]}
                </td>
              ))}
              {editAction && (
                <td>
                  <button className="rounded-full px-2 py-2 bg-slate-300 hover:bg-slate-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M163 439.573l-90.569-90.569L322.78 98.656l90.57 90.569z"
                        fill="currentColor"
                      />
                      <path
                        d="M471.723 88.393l-48.115-48.114c-11.723-11.724-31.558-10.896-44.304 1.85l-45.202 45.203 90.569 90.568 45.202-45.202c12.743-12.746 13.572-32.582 1.85-44.305z"
                        fill="currentColor"
                      />
                      <path
                        d="M64.021 363.252L32 480l116.737-32.021z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableList;
