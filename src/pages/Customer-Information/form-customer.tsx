import { useState } from "react";
import FormInput from "../../components/FormInput";
import { inputCustomer } from "./input-form";

interface propsFormCustomer {
  returnInputChange: (result: any) => void;
}

const FormCustomer = ({ returnInputChange }: propsFormCustomer) => {
    const [inputList, setInputList] = useState<any>(inputCustomer)
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">ข้อมูลลูกค้า</p>
        </div>

        <div className="mt-5 px-3 pb-6">
          <FormInput
            inputList={inputList}
            returnInputChange={returnInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default FormCustomer;
