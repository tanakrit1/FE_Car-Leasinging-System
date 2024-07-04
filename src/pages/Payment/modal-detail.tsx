import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";

const inputList = [
  {
    name: "a",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: true,
  },
  {
    name: "b",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: true,
  },
  {
    name: "c",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: true,
  },
  {
    name: "d",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: true,
  },
  {
    name: "e",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: true,
  },
  {
    name: "f",
    label: "รุ่น",
    type: "text",
    placeholder: "b",
    width: "4/12",
    value: "",
    disabled: false,
    requied: true,
  },
];

const ModalDetail = ({ dataInfomation }: any) => {
  const [payload, setPayload] = useState<any>(dataInfomation);

  const returnInputChange = (result: any) => {
    console.log("result--> ", result);
    setPayload(result);
  };
  return (
    <>
      <dialog id="modal-payment-detail" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-white">ข้อมูลของ ........</h3>
          <div className="mt-5 px-3 pb-6">
            <FormInput
              inputList={inputList}
              returnInputChange={returnInputChange}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalDetail;
