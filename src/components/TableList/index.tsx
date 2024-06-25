import { Props } from "./interface";

const TableList = ({
  columns,
  rows,
  height,
  editAction,
  clickEdit,
  printAction,
  clickPrint,
  viewAction,
  clickView,
}: Props) => {
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
            {printAction && <th></th>}
            {viewAction && <th></th>}
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
                  <button
                    className="rounded-full px-2 py-2 bg-slate-200 hover:bg-slate-400 hover:text-white"
                    onClick={() => clickEdit(row)}
                  >
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

              {viewAction && (
                <td>
                  <button
                    className="rounded-full px-2 py-2 bg-slate-200 hover:bg-slate-400 hover:text-white"
                    onClick={() => clickView(row)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34M208 336c-70.7 0-128-57.2-128-128c0-70.7 57.2-128 128-128c70.7 0 128 57.2 128 128c0 70.7-57.2 128-128 128"
                      />
                    </svg>
                  </button>
                </td>
              )}

              {printAction && (
                <td>
                  <button
                    className="rounded-full px-2 py-2 bg-slate-200 hover:bg-slate-400 hover:text-white"
                    onClick={() => clickPrint(row)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill="currentColor"
                        d="M1.501 6h17c.57 0 .477-.608.193-.707C18.409 5.194 15.251 4 14.7 4H14V1H6v3h-.699c-.55 0-3.709 1.194-3.993 1.293c-.284.099-.377.707.193.707M19 7H1c-.55 0-1 .45-1 1v5c0 .551.45 1 1 1h2.283l-.882 5H17.6l-.883-5H19c.551 0 1-.449 1-1V8c0-.55-.449-1-1-1M4.603 17l1.198-7.003H14.2L15.399 17z"
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
