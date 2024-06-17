import FormInput from "../../components/FormInput";
import { inputGuarantee } from "./input-form";

interface propsFormGuarantee {
  returnInputChange: (result: any) => void;
}

const FormGuarantee = ({ returnInputChange }: propsFormGuarantee) => {
  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">ข้อมูลลูกค้า</p>
        </div>

        <div className="mt-5 px-3 pb-6">
          <FormInput
            inputList={inputGuarantee}
            returnInputChange={returnInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default FormGuarantee;
