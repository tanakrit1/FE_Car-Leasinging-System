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
  paymentAction,
  clickPayment,
  removeAction,
  clickRemove,
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
            {paymentAction && <th></th>}
            {removeAction && <th></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, key: number) => (
            <tr key={"row" + key} className="hover:bg-slate-500">
              {columns.map((column: any, index: number) => (
                <td key={"columnB" + index} className="text-white text-lg">
                  {row[column.field] === true ? (
                    <span className="text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                        />
                      </svg>
                    </span>
                  ) : row[column.field] === false ? (
                    <span className="text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"
                        />
                      </svg>
                    </span>
                  ) : (
                    row[column.field]
                  )}
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

              {clickPayment && paymentAction && (
                <td>
                  <button
                    className="rounded-full px-2 py-2 bg-slate-200 hover:bg-slate-400 hover:text-white"
                    onClick={() => clickPayment(row)}
                  >
                    <svg
                      className="text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M10.6 9c-.4-.1-.8-.3-1.1-.6c-.3-.1-.4-.4-.4-.6s.1-.5.3-.6c.3-.2.6-.4.9-.3c.6 0 1.1.3 1.4.7l.9-1.2c-.3-.3-.6-.5-.9-.7s-.7-.3-1.1-.3V4H9.4v1.4c-.5.1-1 .4-1.4.8c-.4.5-.7 1.1-.6 1.7c0 .6.2 1.2.6 1.6c.5.5 1.2.8 1.8 1.1c.3.1.7.3 1 .5c.2.2.3.5.3.8q0 .45-.3.9c-.3.3-.7.4-1 .4c-.4 0-.9-.1-1.2-.4c-.3-.2-.6-.5-.8-.8l-1 1.1c.3.4.6.7 1 1c.5.3 1.1.6 1.7.6V16h1.1v-1.5c.6-.1 1.1-.4 1.5-.8c.5-.5.8-1.3.8-2c0-.6-.2-1.3-.7-1.7c-.5-.5-1-.8-1.6-1M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8m0 14.9c-3.8 0-6.9-3.1-6.9-6.9S6.2 3.1 10 3.1s6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9"
                      />
                    </svg>
                  </button>
                </td>
              )}

              {clickRemove && removeAction && (
                <td>
                  <button
                    className="rounded-full px-2 py-2 bg-slate-200 hover:bg-slate-400 hover:text-white"
                    onClick={() => clickRemove(row)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414M10 6h4V4h-4zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0z"
                        clip-rule="evenodd"
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
