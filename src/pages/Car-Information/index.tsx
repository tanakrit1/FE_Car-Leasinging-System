import FormInput from "../../components/FormInput";
import inputListFile from "./input-form";
import { useContext, useEffect, useState } from "react";
import ModalSearch from "./modal-search";
import {
  base64toBlob,
  getBase64,
  isBase64,
  validateInputRequired,
} from "../../helpers/function-service";
import _CarInformationApi from "../../api/car-information";
import { LoadContext } from "../../context/loading-context";
import ModalExport from "./modal-export";

const CarInformation = () => {
  const context = useContext(LoadContext);
  const [inputList, setInputList] = useState<any>(inputListFile);
  const [payload, setPayload] = useState<any>({});
  const [statusForm, setStatusForm] = useState<string>("add");
  const [showModalSearch, setShowModalSearch] = useState<boolean>(false);
  const [imageData, setImageData] = useState<any>(null);
  const [rowActive, setRowActive] = useState<any>(null);
  const [showModalExport, setShowModalExport] = useState<boolean>(false);

  const onChangeInputForm = (result: any) => {
    console.log("result--> ", result)
    let cloneInputList = [...inputList];
    const cost = Number(result.buyingPrice || '0') + Number(result.maintenanceCost || '0')
    const sellingPrice = cost + Number(result.desiredProfit || '0')
    
    const findIndexCost = cloneInputList.findIndex( (row: any) => row.name === "cost" )
    const findIndexsellingPrice = cloneInputList.findIndex( (row: any) => row.name === "sellingPrice" )
   
    cloneInputList[findIndexCost].value = cost
    cloneInputList[findIndexsellingPrice].value = sellingPrice

    setInputList(cloneInputList);
    setPayload({...result, cost: cost, sellingPrice: sellingPrice});
  };

  const onClearForm = () => {
    setStatusForm("add");
    const inputListClear = inputList.map((item: any) => {
      return { ...item, value: "" };
    });
    setInputList(inputListClear);

    let objPayload: any = {};
    for (let i = 0; i < inputListClear.length; i++) {
      objPayload = {
        ...objPayload,
        [inputListClear[i].name]: inputListClear[i].value,
      };
    }
    objPayload = { ...objPayload, carImage: "" };
    setPayload({ ...objPayload, carImage: "" });
    setImageData(null);
  };

  const onSubmit = async () => {
    context?.setLoadingContext(true);
    if (validateInputRequired(payload)) {
      const json = {
        ...payload,
        sellingPrice: Number(payload.sellingPrice),
        buyingPrice: Number(payload.buyingPrice),
        maintenanceCost: Number(payload.maintenanceCost),
        cost: Number(payload.cost),
        desiredProfit: Number(payload.desiredProfit),
        carStatus: statusForm==='add' ? "stock" : rowActive?.carStatus,
        carType: statusForm==='add' ? "buy" : rowActive?.carType
      };
      if (statusForm === "add") {
        // เพิ่มข้อมูลใหม่
        const result = await _CarInformationApi().create(json);
        if (result.statusCode === 200) {
          alert("บันทึกข้อมูลสำเร็จ");
          onClearForm();
        }
        context?.setLoadingContext(false);
      } else {
        // แก้ไขข้อมูล
        const result = await _CarInformationApi().update(rowActive.id, json);
        if (result.statusCode === 200) {
          alert("แก้ไขข้อมูลสำเร็จ");
          onClearForm();
        }
        context?.setLoadingContext(false);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      context?.setLoadingContext(false);
    }
  };

  const onOpenModalSearch = () => {
    setShowModalSearch(true);
    // setStatusForm('edit')
    // const mapTest = inputList.map((item: any) => {
    //   return { ...item, value: "test" };
    // });
    // setInputList(mapTest);
  };

  const onclickUploadImage = () => {
    (document.getElementById("carImage") as HTMLFormElement).click();
  };

  const onChangeFile = async (event: any) => {
    if (event.target.files[0]) {
      setImageData(event.target.files[0]);
      const imageBase64 = await getBase64(event.target.files[0]);
      setPayload({ ...payload, carImage: imageBase64 });
    } else {
      onClearImage();
    }
  };

  const onClearImage = () => {
    setImageData(null);
    (document.getElementById("carImage") as HTMLFormElement).value = null;
    setPayload({ ...payload, carImage: "" });
  };

  const onViewData = (row: any) => {
    setStatusForm("edit");
    setRowActive(row);
    let newPayload: any = {};
    let cloneInputList = [...inputList];
    for (let field in row) {
      const index = cloneInputList.findIndex(
        (item: any) => item.name === field
      );
      if (index !== -1) {
        cloneInputList[index].value = row[field];
        newPayload = { ...newPayload, [field]: row[field] };
      }
    }
    setInputList(cloneInputList);
    setPayload(newPayload);
    setShowModalSearch(false);
    setImageData(row?.carImage);
  };

  const onDownloadFile = () => {
    console.log("**")
    if (typeof imageData === "string") {
        console.log("1")
      // base64 => ข้อมูลที่เปิดเพื่อแก้ไข
      // base64toBlob(imageData)
      const base64String = imageData.split(",")[1]; // ตัด 'data:image/png;base64,' ออก
      if (isBase64(base64String)) {
        console.log("2")
        const blob = base64toBlob(base64String);
        const blobUrl = URL.createObjectURL(blob);
        let downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "รูปภาพ.png";
        downloadLink.click();
      }
    } else {
        console.log("3")
      // ข้อมูลที่เพิ่มใหม่
      const blobUrl = URL.createObjectURL(imageData);
      let downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = imageData.name;
      downloadLink.click();
    }
  };

  const onRemoveData = async () => {
    context?.setLoadingContext(true);
    if (window.confirm("คุณต้องการลบข้อมูลใช่หรือไม่") === true) {
      const result = await _CarInformationApi().remove(rowActive.id);
      if (result.statusCode === 200) {
        alert("บันทึกข้อมูลสำเร็จ");
        onClearForm();
      }
      context?.setLoadingContext(false);
    }
  };

  const onShowReport = () => {
    setShowModalExport(true)
  }

  useEffect(() => {
    let objPayload: any = {};
    for (let i = 0; i < inputList.length; i++) {
      objPayload = { ...objPayload, [inputList[i].name]: inputList[i].value };
    }
    objPayload = { ...objPayload, carImage: "" };
    setPayload(objPayload);
    onClearForm();
  }, []);

  return (
    <>
        <ModalExport showModal={showModalExport} returnShowModal={(result: boolean) => setShowModalExport(result)}/>
      <ModalSearch
        showModal={showModalSearch}
        returnShowModal={(result: boolean) => setShowModalSearch(result)}
        returnViewData={onViewData}
      />
      <p className="font-bold text-2xl text-white">บันทึกข้อมูลรถ</p>
      <div className="flex space-x-2 mt-5">
        <div className="w-full">
          <div className="w-full rounded-lg bg-slate-700 ">
            <div className="flex justify-between items-center bg-slate-600 px-3 h-16 rounded-t-lg">
              <p className="text-white text-xl font-bold">
                {statusForm === "add" ? "บันทึกข้อมูล" : "แก้ไขข้อมูลรถ"}
              </p>
              <div className="flex space-x-3 items-center">
                <button
                  onClick={() => onClearForm()}
                  type="button"
                  className="bg-green-700 bg-green-700 text-white font-bold py-1 px-4 rounded-lg hover:bg-green-600"
                >
                  <div className="flex space-x-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32"
                      />
                    </svg>
                    <span>ข้อมูลใหม่</span>
                  </div>
                </button>
                <button
                  onClick={onOpenModalSearch}
                  type="button"
                  className="bg-orange-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-orange-400"
                >
                  <div className="flex space-x-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34M208 336c-70.7 0-128-57.2-128-128c0-70.7 57.2-128 128-128c70.7 0 128 57.2 128 128c0 70.7-57.2 128-128 128"
                      />
                    </svg>
                    <span>ค้นหาข้อมูล</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-yellow-500 hover:bg-yellow-400 px-3 py-1 text-white"
                  onClick={onShowReport}
                >
                  <div className="flex space-x-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.36 7H18V5a1.92 1.92 0 0 0-1.83-2H7.83A1.92 1.92 0 0 0 6 5v2H4.64A2.66 2.66 0 0 0 2 9.67v6.66A2.66 2.66 0 0 0 4.64 19h.86a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2h.86A2.66 2.66 0 0 0 22 16.33V9.67A2.66 2.66 0 0 0 19.36 7M8 5h8v2H8Zm-.5 14v-4h9v4Z"
                      />
                    </svg>
                    <span>รายงาน</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-5 px-3 pb-6">
              <FormInput
                inputList={inputList}
                returnInputChange={onChangeInputForm}
              />

              <div className="mt-6 px-3 h-96 flex justify-between space-x-6">
                <div
                  className="border-2 border-dashed w-1/2 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-600"
                  onClick={onclickUploadImage}
                >
                  <div>
                    <div className="flex items-center space-x-3 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
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
                      <span>คลิกเพื่ออัพโหลดไฟล์รูปภาพ</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    onChange={onChangeFile}
                    id="carImage"
                    name="carImage"
                    style={{ display: "none" }}
                    accept="image/*"
                  ></input>
                </div>

                <div className="w-1/2">
                  {imageData && (
                    <div className="w-2/3 h-24 border-2 border-white rounded-lg flex justify-between items-center px-3 text-white">
                      <div>
                        <p className="font-bold">
                          {imageData?.name ? imageData?.name : "ไฟล์ภาพ"}
                        </p>
                        <p>{imageData?.size ? `${imageData?.size} MB` : ""} </p>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <button
                          className="px-2 py-2 bg-slate-500 hover:bg-slate-400 rounded-full"
                          onClick={onDownloadFile}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
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
                          className="px-2 py-2 bg-slate-500 hover:bg-slate-400 rounded-full"
                          onClick={onClearImage}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end px-3 mt-6 space-x-4">
                {statusForm === "edit" && (
                  <button
                    onClick={onRemoveData}
                    type="button"
                    className="rounded-lg bg-gray-500 hover:bg-gray-400 px-3 py-1 text-white"
                  >
                    <div className="flex space-x-3 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                        />
                      </svg>
                      <span>ลบข้อมูล</span>
                    </div>
                  </button>
                )}

                <button
                  onClick={onSubmit}
                  type="button"
                  className="rounded-lg bg-orange-600 hover:bg-orange-500 px-3 py-1 text-white"
                >
                  <div className="flex space-x-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M362.7 64h-256C83 64 64 83.2 64 106.7v298.7c0 23.5 19 42.7 42.7 42.7h298.7c23.5 0 42.7-19.2 42.7-42.7v-256L362.7 64zM256 405.3c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64zM320 192H106.7v-85.3H320V192z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>บันทึก</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CarInformation;
