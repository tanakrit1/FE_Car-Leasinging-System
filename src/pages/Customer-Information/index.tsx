import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import FormCustomer from "./form-customer";
import FormGuarantor from "./form-guarantor";
import FormCar from "./form-car";
import { validateInputRequired } from "../../helpers/function-service";
import _SaleItemApi from "../../api/saleItem";
import ModalSearchSaleItem from "./modal-search-salleitem";
import { LoadContext } from "../../context/loading-context";
import ModalReport from "./modal-search-report";

const CustomerInformation = () => {
  const context = useContext(LoadContext);
  const [idSaleItem, setIdSaleItem] = useState<any>(null);
  //   const [idCarInformation, setIdCarInformation] = useState<any>(null);
  const [rowActive, setRowActive] = useState<any>(null);
  //   const [idGuarantor, setIdGuarantor] = useState<any>(null);
  const [dateCreate, setDateCreate] = useState<any>(
    dayjs().format("DD/MM/YYYY")
  );
  const [showModalExport, setShowModalExport] = useState<boolean>(false);
  const [showModalSearchSale, setShowModalSearchSale] =
    useState<boolean>(false);
  // const [idUpdate, setIDUpdate] = useState<any>({
  //     saleItemID: null,
  //     carID: null,
  //     guarantorID: null
  // })
  // const [disableForm, setDisableForm] = useState<any>({
  //     customer: false,
  //     guarantor: false,
  //     car: false
  // });

  useEffect(() => {
    onClearForm();
  }, []);

  const [payloadCustomer, setPayloadCustomer] = useState<any>({
    customerName: "",
    address: "",
    // idCardNumber: "",
    phoneNumber: "",
    downPayment: "",
    totalOrder: "",
    numInstallments: "",
    interestRate: "",
    interestType: "",
    interestMonth: "",
    // discount: "",
    contractDate: "",
    saleItemNote: "",
    gps: "",
  });
  const [payloadGuarantor, setPayloadGuarantor] = useState<any>([
    {
      guarantorName: "",
      guarantorAddress: "",
      //   guarantorIdCard: "",
      guarantorImage: "",
      guarantorPhone: "",
      guarantorGPS: "",
      guarantorNote: "",
    },
  ]);
  const [payloadCar, setPayloadCar] = useState<any>({
    carBrand: "",
    model: "",
    carColor: "",
    carDate: "",
    licensePlate: "",
    // engineNumber: "",
    // vin: "",
    sellingPrice: "",
    id: "",
    carType: "",
    priceOther: "",
    productOther: "",
    carCategory: "",
  });
  const [validationForm, setValidationForm] = useState<any>({
    customer: false,
    guarantor: false,
    car: false,
  });
  const [tabActive, setTabActive] = useState<number>(1);
  const [stateForm, setStateForm] = useState<string>("add");

  const returnInputCustomerChange = async (result: any) => {
    let newObj: any = {};
    if (result.interestType === "ลดต้น/ลดดอก") {
      for (let field in result) {
        if (field !== "interestMonth" && field !== "saleItemNote") {
          newObj = { ...newObj, [field]: result[field] };
        }
      }
    } else {
      newObj = result;
    }
    setPayloadCustomer(result);
    const validateCustomer = payloadCustomer
      ? validateInputRequired(newObj)
      : false;
    setValidationForm({
      ...validationForm,
      customer: validateCustomer ? true : false,
    });
    return validateCustomer;
  };

  const returnInputGuarantorChange = async (result: any) => {
    setPayloadGuarantor(result);

    let validateGuarantor = false;
    for (let i = 0; i < result?.length; i++) {
      const { guarantorImage, guarantorNote, ...newObject } = result[i];
      const valid = validateInputRequired(newObject);
      if (valid === false) {
        validateGuarantor = false;
        break;
      }
      validateGuarantor = true;
    }

    setValidationForm({
      ...validationForm,
      guarantor: validateGuarantor ? true : false,
    });
    return validateGuarantor;
  };

  const returnInputCarChange = async (result: any) => {
    setPayloadCar(result);

    let newPayloadCar = {};
    for (let field in result) {
      if (field !== "id") {
        if (result.carType === "other") {
          if (
            field === "priceOther" ||
            field === "productOther" ||
            field === "carType"
          ) {
            newPayloadCar = { ...newPayloadCar, [field]: result[field] };
          }
        } else {
          if (
            field !== "priceOther" &&
            field !== "productOther" &&
            field !== "carType"
          ) {
            newPayloadCar = { ...newPayloadCar, [field]: result[field] };
          }
        }
      }
    }
    const validateCar = payloadCar
      ? validateInputRequired(newPayloadCar)
      : false;
    setValidationForm({ ...validationForm, car: validateCar ? true : false });
    return validateCar;
  };

  const onChangeTab = (newTab: number) => {
    setTabActive(newTab);
  };

  const fnCheckValidation = () => {
    if (
      validationForm.customer &&
      validationForm.guarantor &&
      validationForm.car
    ) {
      return true;
    }
    return false;
  };

  const onClearForm = async () => {
    setStateForm("add");
    setRowActive(null);
    setValidationForm({
      customer: false,
      guarantor: false,
      car: false,
    });
    setPayloadCustomer({
      customerName: "",
      address: "",
      //   idCardNumber: "",
      phoneNumber: "",
      downPayment: "",
      totalOrder: "",
      numInstallments: "",
      interestRate: "",
      interestType: "",
      interestMonth: "",
      // discount: "",
      contractDate: dayjs().format("YYYY-MM-DD"),
      saleItemNote: "",
      gps: "",
    });
    setPayloadGuarantor([
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
    setPayloadCar({
      carBrand: "",
      model: "",
      carColor: "",
      carDate: "",
      licensePlate: "",
      //   engineNumber: "",
      //   vin: "",
      sellingPrice: "",
      id: "",
      carType: "",
      priceOther: "",
      productOther: "",
      carCategory: "",
    });

    const result = await _SaleItemApi().getMaxID();
    if (result?.data.length > 0) {
      setIdSaleItem(Math.ceil(result.data[0].id) + 1);
    }
    setDateCreate(dayjs().format("DD/MM/YYYY"));
  };

  const onSubmitForm = async () => {
    context?.setLoadingContext(true);
    if (stateForm === "add") {
      let newPayloadCar = {};
      for (let field in payloadCar) {
        if (field !== "id") {
          newPayloadCar = { ...newPayloadCar, [field]: payloadCar[field] };
        }
      }
      let json = {
        ...payloadCustomer,
        ...newPayloadCar,
        // discount: Number(payloadCustomer.discount),
        interestMonth:
          payloadCustomer.interestType === "ลดต้น/ลดดอก"
            ? 0
            : Math.ceil(payloadCustomer.interestMonth),
        interestRate: Number(payloadCustomer.interestRate),
        totalOrder: payloadCustomer.totalOrder
          ? Math.ceil(payloadCustomer.totalOrder?.replace(/,/g, ""))
          : 0,
        downPayment: payloadCustomer.downPayment
          ? Math.ceil(payloadCustomer.downPayment?.replace(/,/g, ""))
          : 0,
        sellingPrice: payloadCar.sellingPrice
          ? Math.ceil(payloadCar.sellingPrice?.replace(/,/g, ""))
          : 0,
        saleType: payloadCar.carType,
        guarantors: payloadGuarantor,

        productOther: payloadCar.productOther,
        priceOther: payloadCar.priceOther
          ? Math.ceil(payloadCar.priceOther?.replace(/,/g, ""))
          : 0,
      };
      console.log("json---> ", json);
      //   return
      if (payloadCar?.id && payloadCar?.id !== "") {
        json = { ...json, carInformation_id: payloadCar.id };
      }
      const result = await _SaleItemApi().create(json);
      if (result.statusCode === 200) {
        alert("บันทึกข้อมูลสำเร็จ");
        onClearForm();
      }
      context?.setLoadingContext(false);
    }
  };

  const onViewData = async (row: any) => {
    setRowActive(row);
    setIdSaleItem(row.id);
    // setIdCarInformation(row.carInformation.id)

    setDateCreate(dayjs(row.createdAt).format("DD/MM/YYYY"));
    const interestPerMonth = Math.ceil(Number(row.totalOrder) * ( Number(row.interestRate) / 100 ))   // 1440  ดอกเบี้ยต่อเดือน

    const newPayloadCustomer = {
      customerName: row.customerName,
      address: row.address,
      //   idCardNumber: row.idCardNumber,
      phoneNumber: row.phoneNumber,
      downPayment: row.downPayment,
      totalOrder: row.totalOrder,
      numInstallments: row.numInstallments,
      interestRate: row.interestRate,
      interestType: row.interestType,
      interestMonth: interestPerMonth,
      // discount: row.discount,
      contractDate: row.contractDate,
      saleItemNote: row.saleItemNote,
      gps: row.gps,
    };

    const newPayloadGuarantor = row.guarantors.map((item: any) => {
      return {
        guarantorName: item.guarantorName,
        guarantorAddress: item.guarantorAddress,
        // guarantorIdCard: item.guarantorIdCard,
        guarantorImage: item.guarantorImage,
        guarantorPhone: item.guarantorPhone,
        guarantorGPS: item.guarantorGPS,
        guarantorNote: item.guarantorNote,
        id: item.id,
      };
    });

    const newPayloadCar = {
      carBrand: row.carInformation.carBrand,
      model: row.carInformation.model,
      carColor: row.carInformation.carColor,
      carDate: row.carInformation.carDate,
      licensePlate: row.carInformation.licensePlate,
      //   engineNumber: row.carInformation.engineNumber,
      //   vin: row.carInformation.vin,
      sellingPrice: row.carInformation.sellingPrice,
      id: row.carInformation.id,
      carType: row.carInformation.carType,
      carCategory: row.carInformation.carCategory,
      priceOther: row.carInformation.priceOther,
      productOther: row.carInformation.productOther,
    };

    setPayloadCustomer(newPayloadCustomer);
    setPayloadGuarantor(newPayloadGuarantor);
    setPayloadCar(newPayloadCar);

    const validCar = await returnInputCarChange(newPayloadCar);
    const validGuarantor = await returnInputGuarantorChange(
      newPayloadGuarantor
    );
    const validCustomer = await returnInputCustomerChange(newPayloadCustomer);

    setValidationForm({
      car: validCar,
      guarantor: validGuarantor,
      customer: validCustomer,
    });
    setStateForm("view");
    // setDisableForm({
    //     customer: true,
    //     guarantor: true,
    //     car: true
    // })
    setShowModalSearchSale(false);
  };

    const onUpdate = async() => {
      const json = {
        saleitem_id: Number(idSaleItem),
        customerName: payloadCustomer.customerName,
        address: payloadCustomer.address,
        phoneNumber: payloadCustomer.phoneNumber,
        gps: payloadCustomer.gps,
        saleItemNote: payloadCustomer.saleItemNote,
        
        guarantors: payloadGuarantor

        // ...payloadCustomer,
        // interestMonth: Math.ceil(payloadCustomer.interestMonth),
        // interestRate: Number(payloadCustomer.interestRate),
        // totalOrder: Math.ceil(payloadCustomer.totalOrder),
        // downPayment: Math.ceil(payloadCustomer.downPayment),
        // saleitem_id: idSaleItem,
        // carInformation_id: idCarInformation
      }

      console.log("payloadGuarantor--> ", payloadGuarantor)
      console.log("json---> ", json)
    //   return 
      context?.setLoadingContext(true);
      const result = await _SaleItemApi().updateAdvance(json)
      if( result.statusCode === 200 ){
        alert("แก้ไขข้อมูลสำเร็จ")
        onClearForm();
      }
      context?.setLoadingContext(false);
    }

  const onDelete = async () => {
    if (
      confirm(
        "ท่านต้องการลบข้อมูลสัญญาของ คุณ " +
          payloadCustomer.customerName +
          " ใช่หรือไม่ ?"
      ) == true
    ) {
      context?.setLoadingContext(true);
      const result = await _SaleItemApi().delete(idSaleItem);
      if (result.statusCode === 200) {
        alert("ลบข้อมูลสำเร็จ");
        onClearForm();
      }
      context?.setLoadingContext(false);
    }
  };


  return (
    <>
      {/* showModalExport */}

      <ModalReport
        showModal={showModalExport}
        returnShowModal={() => setShowModalExport(false)}
      />

      <ModalSearchSaleItem
        showModal={showModalSearchSale}
        returnViewData={onViewData}
        returnShowModal={() => setShowModalSearchSale(false)}
      />
      <div className="flex justify-between">
        <p className="font-bold text-2xl text-white">ข้อมูลลูกค้า  </p>
        <div className="flex space-x-2">
          <span className="text-white font-semibold">รหัส : {idSaleItem}</span>
          <span className="text-white font-semibold">|</span>
          <span className="text-white font-semibold">
            {" "}
            วันที่ซื้อ : {dateCreate}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex  justify-between">
          <div className="flex space-x-14 items-center">
            <div className="flex">
              <div
                onClick={() => onChangeTab(1)}
                className={`cursor-pointer h-16 bg-white hover:bg-gray-300 w-60 rounded-l-lg border-r-2 flex items-center justify-center space-x-3 px-3 ${
                  tabActive === 1 && `border-b-4 border-b-amber-600`
                }`}
              >
                <svg
                  className={validationForm.customer ? "text-green-500" : ""}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                  />
                </svg>
                <span className="font-bold text-black">ข้อมูลลูกค้า</span>
              </div>
              <div
                onClick={() => onChangeTab(2)}
                className={`cursor-pointer h-16 bg-white hover:bg-gray-300 w-60 flex items-center border-r-2 justify-center space-x-3 px-3 ${
                  tabActive === 2 && `border-b-4 border-b-amber-600`
                }`}
              >
                <svg
                  className={validationForm.guarantor ? "text-green-500" : ""}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                  />
                </svg>
                <span className="font-bold text-black">ข้อมูลผู้ค้ำประกัน</span>
              </div>
              <div
                onClick={() => onChangeTab(3)}
                className={`cursor-pointer h-16 bg-white hover:bg-gray-300 w-60 rounded-r-lg flex items-center justify-center space-x-3 px-3 ${
                  tabActive === 3 && `border-b-4 border-b-amber-600`
                }`}
              >
                <svg
                  className={validationForm.car ? "text-green-500" : ""}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                  />
                </svg>
                <span className="font-bold text-black">ข้อมูลหลักทรัพย์</span>
              </div>
            </div>
            {rowActive?.statusInstallment === "Close" && (
              <div className="px-5 py-2 rounded-lg outline outline-green-500 text-green-500  -rotate-12 hover:-rotate-0">
                ปิดยอด
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClearForm}
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
              onClick={() => setShowModalSearchSale(true)  }
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
              onClick={() => setShowModalExport(true)}
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
                <span>รายงานรายชื่อลูกค้า</span>
              </div>
            </button>
          </div>
        </div>

        <div className="w-full mt-5">
          {tabActive === 1 ? (
            <div>
              <FormCustomer
                returnInputChange={returnInputCustomerChange}
                payloadCustomer={payloadCustomer}
                stateForm={stateForm}
              />
            </div>
          ) : tabActive === 2 ? (
            <div>
              <FormGuarantor
                payloadGuarantor={payloadGuarantor}
                returnInputChange={returnInputGuarantorChange}
                stateForm={stateForm}
              />
            </div>
          ) : (
            <FormCar
              returnPayload={returnInputCarChange}
              payloadData={payloadCar}
              stateForm={stateForm}
            />
          )}
        </div>

        {fnCheckValidation() && stateForm !== "view" && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={onSubmitForm}
              className="bg-orange-600 hover:bg-orange-500 rounded-lg text-white px-16 py-3 font-bold"
            >
              <div className="flex items-center space-x-3">
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
        )}

        {fnCheckValidation() && stateForm == "view" && (
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onUpdate}
              className="bg-orange-600 hover:bg-orange-500 rounded-lg text-white px-16 py-3 font-bold"
            >
              <div className="flex items-center space-x-3">
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
                <span>แก้ไข</span>
              </div>
            </button>

            <button
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-500 rounded-lg text-white px-16 py-3 font-bold"
            >
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877"
                  />
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707"
                    clipRule="evenodd"
                  />
                </svg>
                <span>ลบ</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default CustomerInformation;
