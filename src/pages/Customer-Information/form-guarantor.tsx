import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { base64toBlob, isBase64 } from "../../helpers/function-service";

interface propsFormGuarantor {
  returnInputChange: (result: any) => void;
  payloadGuarantor: any;
  stateForm: string;
}

const FormGuarantor = ({
  returnInputChange,
  payloadGuarantor,
  stateForm,
}: propsFormGuarantor) => {
  const [payload, setPayload] = useState<any>(payloadGuarantor);
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const [imgData, setImgData] = useState<any>([]);

  useEffect(() => {
    // console.log("stateForm--> ", stateForm)
    // setDisableForm(stateForm == "view" ? true : false);
    setDisableForm(false)
  }, [stateForm]);

  useEffect( () => {
    const newImgData = payloadGuarantor.map( (item: any) => item.guarantorImage )
    setImgData( newImgData )
  }, [payloadGuarantor] )

  const onAddGuarantor = () => {
    setPayload([
      ...payload,
      {
        guarantorName: "",
        guarantorAddress: "",
        // guarantorIdCard: "",
        guarantorImage: "",
        guarantorPhone: "",
        guarantorGPS: "",
        guarantorNote: "",
      },
    ]);
  };

  useEffect(() => {
    returnInputChange(payload);
  }, [payload]);

  const onRemoveGuarantor = (index: number) => {
    const clonePayload = [...payloadGuarantor];
    clonePayload.splice(index, 1);
    setPayload(clonePayload);
  };

  const onChangeInput = (event: any, index: number) => {
    const clonePayload = [...payloadGuarantor];
    clonePayload[index][event.target.name] = event.target.value;
    setPayload(clonePayload);
  };

  const onSelectImg = (index: number) => {
    (document.getElementById(`inputFile${index}`) as HTMLFormElement).click();
  }

  const onChangeFile = (event: any, index: number) => {
    if (event.target.files[0]) {
        Resizer.imageFileResizer(
            event.target.files[0],
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
                let cloneImgData = [...imgData]
                cloneImgData[index] = uri
                setImgData(cloneImgData);
                
                let clonePayload = [...payloadGuarantor]
                clonePayload[index] = {...clonePayload[index], guarantorImage: uri}
                setPayload(clonePayload);
            },
            "base64",
            200,
            200
          );
    }
  }

  const onDownloadFile = (index: number) => {
    if (typeof imgData[index] === "string") {
        const base64String = imgData[index].split(",")[1]; // ตัด 'data:image/png;base64,' ออก
        if (isBase64(base64String)) {
          const blob = base64toBlob(base64String);
          const blobUrl = URL.createObjectURL(blob);
          let downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.download = "รูปภาพ.png";
          downloadLink.click();
        }
      } else {
        // ข้อมูลที่เพิ่มใหม่
        const blobUrl = URL.createObjectURL(imgData[index]);
        let downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = imgData[index].name;
        downloadLink.click();
      }
}

  const onClearImage = (index: number) => {
    let cloneImgData = [...imgData]
    cloneImgData[index] = null
    setImgData(cloneImgData);
    (document.getElementById(`inputFile${index}`) as HTMLFormElement).value = null;
    

    let clonePayload = [...payloadGuarantor]
    clonePayload[index] = {...clonePayload[index], guarantorImage: ""}
    // console.log("clonePayload--> ", clonePayload)
    // console.log("payloadGuarantor--> ", payloadGuarantor)
    setPayload(clonePayload);
  }

  return (
    <>
      <div className="w-full rounded-lg bg-slate-700 ">
        <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg">
          <p className="text-white text-xl font-bold">ข้อมูลผู้ค้ำประกัน</p>

          {!disableForm && (
            <button
              onClick={onAddGuarantor}
              className="bg-green-500 hover:bg-green-600 rounded-full text-white px-1 py-1"
            >
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
          )}
        </div>

        <div className="mt-5 px-3 pb-6">
          {payloadGuarantor.map((item: any, index: number) => (
            <div
              key={"guarantor" + index}
              className="flex flex-wrap border border-rounded-lg border-slate-300 border-slate-600 mb-3 py-3"
            >
              <div className="basis-4/12 px-2">
                <p className="text-white font-semibold mb-1">
                  ชื่อ : <span className="text-red-500">*</span> 
                </p>
                <input
                // disabled={true}
                  disabled={disableForm}
                  required
                  autoComplete="off"
                  type="text"
                  name="guarantorName"
                  onChange={(event) => onChangeInput(event, index)}
                  value={item?.guarantorName}
                  className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    disableForm===true ? "bg-slate-300" : "bg-slate-50"
                  }`}
                //   className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                />
              </div>

              <div className="basis-8/12 px-2">
                <p className="text-white font-semibold mb-1">
                  ที่อยู่ : <span className="text-red-500">*</span>
                </p>
                <input
                  required
                  disabled={disableForm}
                  autoComplete="off"
                  type="text"
                  name="guarantorAddress"
                  onChange={(event) => onChangeInput(event, index)}
                  value={item?.guarantorAddress}
                  className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    disableForm ? "bg-slate-300" : "bg-slate-50"
                  }`}
                />
              </div>

              {/* <div className="basis-4/12 px-2">
                <p className="text-white font-semibold mb-1">
                  เลขประจำตัวประชาชน : <span className="text-red-500">*</span>
                </p>
                <input
                  required
                  disabled={disableForm}
                  autoComplete="off"
                  type="number"
                  name="guarantorIdCard"
                  onChange={(event) => onChangeInput(event, index)}
                  value={item?.guarantorIdCard}
                  className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    disableForm ? "bg-slate-300" : "bg-slate-50"
                  }`}
                />
              </div> */}

              <div className="basis-2/12 px-2">
                <p className="text-white font-semibold mb-1">
                  เบอร์ติดต่อ : <span className="text-red-500">*</span>
                </p>
                <input
                  required
                  disabled={disableForm}
                  autoComplete="off"
                  type="number"
                  name="guarantorPhone"
                  onChange={(event) => onChangeInput(event, index)}
                  value={item?.guarantorPhone}
                  className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    disableForm ? "bg-slate-300" : "bg-slate-50"
                  }`}
                />
              </div>

              <div className="basis-2/12 px-2">
                <p className="text-white font-semibold mb-1">
                  GPS : <span className="text-red-500">*</span>
                </p>
                <input
                  required
                  disabled={disableForm}
                  autoComplete="off"
                  type="text"
                  name="guarantorGPS"
                  onChange={(event) => onChangeInput(event, index)}
                  value={item?.guarantorGPS}
                  className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    disableForm ? "bg-slate-300" : "bg-slate-50"
                  }`}
                />
              </div>

              <div className="basis-8/12 px-2">
              <p className="text-white font-semibold mb-1">
                หมายเหตุ :
              </p>
              <input
                onChange={(event) => onChangeInput(event, index)}
                disabled={disableForm}
                autoComplete="off"
                type="text"
                name="guarantorNote"
                value={item?.guarantorNote}
                className={`text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 ${
                    disableForm ? "bg-slate-300" : "bg-slate-50"
                  }`}
              />
            </div>

              <div className="flex basis-5/12 px-2 space-x-6">
                    <div className="items-center flex mb-3">
                        <input 
                            type="file" 
                            style={{ display: "none" }} 
                            name={`inputFile${index}`} 
                            id={`inputFile${index}`} 
                            accept="image/*" 
                            onChange={(event: any) => onChangeFile(event, index)}
                            />
                        <button  disabled={disableForm} type="button" className=" h-12 rounded-lg bg-gray-500 px-3 text-white hover:bg-gray-400" onClick={() => onSelectImg(index)}>
                            <div className="flex space-x-3 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                            >
                                <path
                                fill="currentColor"
                                d="M21.9 12c0-.11-.06-.22-.09-.33a4.17 4.17 0 0 0-.18-.57c-.05-.12-.12-.24-.18-.37s-.15-.3-.24-.44S21 10.08 21 10s-.2-.25-.31-.37s-.21-.2-.32-.3L20 9l-.36-.24a3.68 3.68 0 0 0-.44-.23l-.39-.18a4.13 4.13 0 0 0-.5-.15a3 3 0 0 0-.41-.09L17.67 8A6 6 0 0 0 6.33 8l-.18.05a3 3 0 0 0-.41.09a4.13 4.13 0 0 0-.5.15l-.39.18a3.68 3.68 0 0 0-.44.23l-.36.3l-.37.31c-.11.1-.22.19-.32.3s-.21.25-.31.37s-.18.23-.26.36s-.16.29-.24.44s-.13.25-.18.37a4.17 4.17 0 0 0-.18.57c0 .11-.07.22-.09.33A5.23 5.23 0 0 0 2 13a5.5 5.5 0 0 0 .09.91c0 .1.05.19.07.29a5.58 5.58 0 0 0 .18.58l.12.29a5 5 0 0 0 .3.56l.14.22a.56.56 0 0 0 .05.08L3 16a5 5 0 0 0 4 2h3v-1.37a2 2 0 0 1-1 .27a2.05 2.05 0 0 1-1.44-.61a2 2 0 0 1 .05-2.83l3-2.9A2 2 0 0 1 12 10a2 2 0 0 1 1.41.59l3 3a2 2 0 0 1 0 2.82A2 2 0 0 1 15 17a1.92 1.92 0 0 1-1-.27V18h3a5 5 0 0 0 4-2l.05-.05a.56.56 0 0 0 .05-.08l.14-.22a5 5 0 0 0 .3-.56l.12-.29a5.58 5.58 0 0 0 .18-.58c0-.1.05-.19.07-.29A5.5 5.5 0 0 0 22 13a5.23 5.23 0 0 0-.1-1"
                                />
                                <path
                                fill="currentColor"
                                d="M12.71 11.29a1 1 0 0 0-1.4 0l-3 2.9a1 1 0 1 0 1.38 1.44L11 14.36V20a1 1 0 0 0 2 0v-5.59l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                />
                            </svg>
                            <span>อัพโหลดรูปภาพ</span>
                            </div>
                        </button>
                    </div>
                    <div className="h-60 w-40 rounded-lg border-dashed border-2 border-slate-500 px-3">
                    { imgData?.[index] && (
                    <div className="">
                        <div className="flex justify-start h-10 space-x-4 px-3 mt-2">
                            <button
                            className="px-2 py-2 bg-slate-500 hover:bg-slate-400 rounded-full"
                            onClick={() => onDownloadFile(index)}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                width="16"
                                height="2"
                                x="4"
                                y="18"
                                fill="currentColor"
                                rx="1"
                                ry="1"
                                />
                                <rect
                                width="4"
                                height="2"
                                x="3"
                                y="17"
                                fill="currentColor"
                                rx="1"
                                ry="1"
                                transform="rotate(-90 5 18)"
                                />
                                <rect
                                width="4"
                                height="2"
                                x="17"
                                y="17"
                                fill="currentColor"
                                rx="1"
                                ry="1"
                                transform="rotate(-90 19 18)"
                                />
                                <path
                                fill="currentColor"
                                d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39a1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2"
                                />
                                <path
                                fill="currentColor"
                                d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1"
                                />
                            </svg>
                            
                            </button>
                            <button
                             disabled={disableForm}
                            className="px-2 py-2 bg-slate-500 hover:bg-slate-400 rounded-full"
                            onClick={()=> onClearImage(index)}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                fill="currentColor"
                                d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                                />
                            </svg>
                            </button>
                        </div>
                        <img src={imgData?.[index]} className="mt-2 w-36 h-40 rounded-lg"/>
                    </div>
                    ) }
                    </div>
              </div>

              <div className="px-2 basis-7/12 flex items-center justify-end">
                {!disableForm && (
                  <button
                    onClick={() => onRemoveGuarantor(index)}
                    className="bg-red-500 hover:bg-red-600 rounded-full text-white px-1 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M128 448h768q64 0 64 64t-64 64H128q-64 0-64-64t64-64"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FormGuarantor;
