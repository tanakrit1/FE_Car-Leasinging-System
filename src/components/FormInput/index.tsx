import { useEffect, useState } from "react";
import { FormInputProps } from "./interface";
import { formatNumber } from "../../helpers/function-service";

const FormInput = ({ inputList, returnInputChange }: FormInputProps) => {
  const [stateInputList, setStateInputList] = useState<any>(inputList);
  const [valueInput, setValueInput] = useState<any>({});
  const fieldNumber = [ "buyingPrice", "maintenanceCost", "cost", "desiredProfit", "sellingPrice" ]
  
  const handleChangeInput = (event: any, index: number) => {
    // input.replace(/,/g, "")
    const input = event.target.value.replace(/,/g, "")
    // console.log(event.target.name,"--> ", input)
    const cloneStateInputList = [...stateInputList];
    cloneStateInputList[index].value = input;
    setStateInputList(cloneStateInputList);
    setValueInput({ ...valueInput, [event.target.name]: input });

    returnInputChange({
      ...valueInput,
      [event.target.name]: input,
    });
  };

  useEffect( ()=> {
    setStateInputList(inputList)
    let objPayload: any = {};
    for (let i = 0; i < inputList.length; i++) {
      objPayload = { ...objPayload, [inputList[i].name]: inputList[i].value };
    }
    setValueInput(objPayload)
    // returnInputChange(objPayload)
  }, [inputList] )

  const fnsetFormatNumber = (value: string) => {
    const numericValue = value.toString().replace(/,/g, "");
    return formatNumber(numericValue)
  }

  return (
    <>
      <form onSubmit={(event: any) => event.preventDefault()}>
        <div className="flex flex-row flex-wrap">
          {stateInputList.map((item: any, index: number) => (
            <>
            { item.type === "divider" ? 
              <div className="w-full divider text-white">
                    {item.label}
              </div>
             : 
            <div key={item.label + index} className={`basis-${item.width} px-2`}>
            {/* <div key={"input" + index} className={`basis-6/12 px-3`}> */}
              <p className="text-white font-semibold mb-1">
                {item.label} :{" "}
                {item?.requied ? (
                  <span className="text-red-500 font-semibold text">* </span> 
                ) : (
                  ""
                )}
              </p>

              {item.type === "text" || item.type === "number" || item.type === "date" ? (
                <input
                  required={item?.requied ? true : false}
                  disabled={item?.disabled ? true : false}
                  autoComplete="off"
                  id={index.toString()}
                  type={item.type}
                  name={item.name}
                  value={
                            fieldNumber.includes(item?.name) 
                                ? fnsetFormatNumber(item?.value)
                                : item?.value
                        }
                  className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    item?.disabled ? "bg-slate-300" : "bg-slate-50"
                  }`}
                  onChange={(event: any) => handleChangeInput(event, index)}
                />
              ) : item.type === "select" ? (
                <select
                  required={item?.requied ? true : false}
                  disabled={item?.disabled ? true : false}
                  id={index.toString()}
                  name={item.name}
                  value={item?.value}
                  className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    item?.disabled ? "bg-slate-300" : "bg-slate-50"
                  }`}
                  onChange={(event: any) => handleChangeInput(event, index)}
                >
                    <option value="">------ เลือก ------</option>
                  {item.list.map((item: any, indexList: number) => (
                    <option key={"list" + indexList} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              ) : (
                ""
              )}
            </div>
            }
            </>
          ))}
        </div>
      </form>
    </>
  );
};

export default FormInput;
