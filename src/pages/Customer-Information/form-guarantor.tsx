import { useState } from "react";

interface propsFormGuarantor {
    returnInputChange: (result: any) => void;
}

const FormGuarantor = ({returnInputChange}: propsFormGuarantor) => {
  const [payload, setPayload] = useState<any>([{name: "", address: "", idCard: "", phone: ""}]);

  const onAddGuarantor = () => {
    setPayload([...payload, {name: "", address: "", idCard: "", phone: ""}]);
  }

  const onRemoveGuarantor = (index: number) => {
    const clonePayload = [...payload];
    clonePayload.splice(index, 1);
    returnInputChange(clonePayload);
    setPayload(clonePayload);
  }

  const onChangeInput = (event: any, index: number) => {
    const clonePayload = [...payload];
    clonePayload[index][event.target.name] = event.target.value;
    console.log("text---> ", clonePayload)
    returnInputChange(clonePayload);
    setPayload(clonePayload);
  }

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">ข้อมูลผู้ค้ำประกัน</p>
          <button onClick={onAddGuarantor} className="bg-green-500 hover:bg-green-600 rounded-full text-white px-1 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-5 px-3 pb-6">
        {payload.map((item: any, index: number) => (
          <div
            key={"guarantor" + index}
            className="flex flex-wrap border border-rounded-lg border-slate-300 border-slate-600 mb-3 pt-3 "
          >
            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">ชื่อ : <span className="text-red-500">*</span></p>
              <input
                required
                autoComplete="off"
                type="text"
                name="name"
                onChange={(event)=> onChangeInput(event, index)}
                value={item?.name}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50`}
              />
            </div>

            <div className="basis-8/12 px-2">
              <p className="text-white font-semibold mb-1">ที่อยู่ : <span className="text-red-500">*</span></p>
              <input
                required
                autoComplete="off"
                type="text"
                name="address"
                onChange={(event)=> onChangeInput(event, index)}
                value={item?.address}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">เลขประจำตัวประชาชน : <span className="text-red-500">*</span></p>
              <input
                required
                autoComplete="off"
                type="number"
                name="idCard"
                onChange={(event)=> onChangeInput(event, index)}
                value={item?.idCard}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50`}
              />
            </div>

            <div className="basis-4/12 px-2">
              <p className="text-white font-semibold mb-1">เบอร์ติดต่อ : <span className="text-red-500">*</span></p>
              <input
                required
                autoComplete="off"
                type="number"
                name="phone"
                onChange={(event)=> onChangeInput(event, index)}
                value={item?.phone}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50`}
              />
            </div>

            <div className="px-2 basis-4/12 flex items-center justify-end">
            <button onClick={() => onRemoveGuarantor(index)} className="bg-red-500 hover:bg-red-600 rounded-full text-white px-1 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M128 448h768q64 0 64 64t-64 64H128q-64 0-64-64t64-64"/></svg>
                </button>
            </div>


          </div>
        ))}
        </div>
      </div>
    </>
  );
};

export default FormGuarantor;
