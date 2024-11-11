import { useEffect, useState } from "react";

interface props {
  showModal: boolean;
  statusForm: string;
  data: any;
  returnShowModal: any;
  returnSubmitModal: (formData: any, statusForm: string) => any;
}

const ddl = {
  role: [
    { label: "เจ้าของธุรกิจ", value: "เจ้าของธุรกิจ" },
    { label: "หัวหน้าแผนก", value: "หัวหน้าแผนก" },
    { label: "บัญชี", value: "บัญชี" },
    { label: "ตัวแทน", value: "ตัวแทน" },
    { label: "พนักงานขาย", value: "พนักงานขาย" },
  ],
};

const ModalManage = ({
  showModal,
  returnShowModal,
  statusForm,
  data,
  returnSubmitModal,
}: props) => {
  const [isPassword, setIsPassword] = useState(true);
  const [formData, setFormData] = useState<any>({
    employeeID: "",
    firstName: "",
    lastName: "",
    phone: "",
    username: "",
    password: "",
    status: true,
    isDashboard: false,
    isCardata: false,
    isCustomerData: false,
    isPayment: false,
    isEmployee: false,
    role: "เจ้าของธุรกิจ",
  });

  const [formDisable, setFormDisable] = useState<any>({
    employeeID: false,
    firstName: false,
    lastName: false,
    phone: false,
    username: false,
    password: false,
    status: false,
    isDashboard: false,
    isCardata: false,
    isCustomerData: false,
    isPayment: false,
    isEmployee: false,
    role: false,
  });

  const onChangeInput = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onChangeInputBoolean = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: !formData[event.target.name],
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("formData--> ", formData)
    let body = formData
    if( formData.password == "" ){
        delete body.password
    }
    console.log("body--> ", body)
    returnSubmitModal(body, statusForm);
  };

  useEffect(() => {
    setIsPassword(true);
    if (statusForm == "add") {
      setFormData({
        employeeID: "",
        firstName: "",
        lastName: "",
        phone: "",
        username: "",
        password: "",
        status: true,
        isDashboard: false,
        isCardata: false,
        isCustomerData: false,
        isPayment: false,
        isEmployee: false,
        role: "เจ้าของธุรกิจ",
      });
      setFormDisable({
        employeeID: false,
        firstName: false,
        lastName: false,
        phone: false,
        username: false,
        password: false,
        status: false,
        isDashboard: false,
        isCardata: false,
        isCustomerData: false,
        isPayment: false,
        isEmployee: false,
        role: false,
      });
    } else {
      setFormData({
        employeeID: data.employeeID,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        username: data.username,
        password: "",
        status: data.status,
        isDashboard: data.isDashboard,
        isCardata: data.isCardata,
        isCustomerData: data.isCustomerData,
        isPayment: data.isPayment,
        isEmployee: data.isEmployee,
        role: data.role,
      });
      setFormDisable({
        employeeID: true,
        firstName: false,
        lastName: false,
        phone: false,
        username: false,
        password: false,
        status: false,
        isDashboard: false,
        isCardata: false,
        isCustomerData: false,
        isPayment: false,
        isEmployee: false,
        role: false,
      });
    }

    if (showModal === true) {
      (
        document.getElementById("modal-employee-detail") as HTMLFormElement
      ).showModal();
    } else {
      (
        document.getElementById("modal-employee-detail") as HTMLFormElement
      ).close();
    }
  }, [showModal]);

  useEffect(() => {
  }, [statusForm, data]);
  return (
    <>
      <dialog id="modal-employee-detail" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg text-white">
              {statusForm == "add" ? "เพิ่มข้อมูลทีมงาน" : "แก้ไขข้อมูลทีมงาน"}
            </h3>
            <button
              onClick={() => returnShowModal(false)}
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 px-3 pb-6">
            <form onSubmit={onSubmit}>
              <div className="flex flex-row flex-wrap">
                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    รหัสพนักงาน :{" "}
                    {formDisable.employeeID === false && (
                      <span className="text-red-500">*</span>
                    )}
                  </p>
                  <input
                    required
                    disabled={formDisable.employeeID}
                    autoComplete="off"
                    type="text"
                    name="employeeID"
                    value={formData.employeeID}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    ชื่อ :{" "}
                    {formDisable.firstName === false && (
                      <span className="text-red-500">*</span>
                    )}
                  </p>
                  <input
                    required
                    disabled={formDisable.firstName}
                    autoComplete="off"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    สกุล :{" "}
                    {formDisable.lastName === false && (
                      <span className="text-red-500">*</span>
                    )}{" "}
                  </p>
                  <input
                    required
                    disabled={formDisable.lastName}
                    autoComplete="off"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    เบอร์โทร :{" "}
                    {formDisable.phone === false && (
                      <span className="text-red-500">*</span>
                    )}{" "}
                  </p>
                  <input
                    required
                    disabled={formDisable.phone}
                    autoComplete="off"
                    type="number"
                    name="phone"
                    value={formData.phone}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    ตำแหน่งงาน :{" "}
                    {formDisable.role === false && (
                      <span className="text-red-500">*</span>
                    )}
                  </p>
                  <select
                    disabled={formDisable.role}
                    value={formData.role}
                    required
                    name="role"
                    onChange={onChangeInput}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                  >
                    {ddl.role.map((item: any, index: number) => (
                      <option key={"ddl-role-" + index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    ชื่อผู้ใช้ :{" "}
                    {formDisable.username === false && (
                      <span className="text-red-500">*</span>
                    )}
                  </p>
                  <input
                    required
                    disabled={formDisable.username}
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={formData.username}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    รหัสผ่าน :{" "}
                    {formDisable.password === false && (
                      <span className="text-red-500">*</span>
                    )}{" "}
                  </p>
                  <input
                    // required={!formDisable.password}
                    required = { statusForm=='add' ? true : false }
                    // disabled={formDisable.password}
                    autoComplete="off"
                    type= {isPassword ? "password" : "text"}
                    name="password"
                    value={formData.password}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className="basis-4/12 px-2 items-center flex">
                        { isPassword ?  
                        <svg onClick={() => setIsPassword(!isPassword)} className="cursor-pointer hover:text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6c6.56 0 10-4.834 10-5.6c0-.768-3.44-5.6-10-5.6m0 9.907c-2.455 0-4.445-1.928-4.445-4.307c0-2.379 1.99-4.309 4.445-4.309s4.444 1.93 4.444 4.309c0 2.379-1.989 4.307-4.444 4.307M10 10c-.407-.447.663-2.154 0-2.154c-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154c0-.547-1.877.379-2.223 0"/></svg>
                        :
                        <svg onClick={() => setIsPassword(!isPassword)} className="cursor-pointer hover:text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M18.521 1.478a1 1 0 0 0-1.414 0L1.48 17.107a1 1 0 1 0 1.414 1.414L18.52 2.892a1 1 0 0 0 0-1.414zM3.108 13.498l2.56-2.56A4.18 4.18 0 0 1 5.555 10c0-2.379 1.99-4.309 4.445-4.309c.286 0 .564.032.835.082l1.203-1.202A12.645 12.645 0 0 0 10 4.401C3.44 4.4 0 9.231 0 10c0 .423 1.057 2.09 3.108 3.497zm13.787-6.993l-2.562 2.56c.069.302.111.613.111.935c0 2.379-1.989 4.307-4.444 4.307c-.284 0-.56-.032-.829-.081l-1.204 1.203c.642.104 1.316.17 2.033.17c6.56 0 10-4.833 10-5.599c0-.424-1.056-2.09-3.105-3.495"/></svg>
                        }
                </div>

                <div className="w-full divider text-white">
                  สิทธิ์การมองเห็น
                </div>

                <div className="">
                  <div className="flex space-x-6 mb-3">
                    <input
                      type="checkbox"
                      disabled={formDisable.isDashboard}
                      checked={formData.isDashboard}
                      className="checkbox checkbox-warning"
                      value={formData.isDashboard}
                      name="isDashboard"
                      onChange={onChangeInputBoolean}
                    />
                    <span className="ml-6 label-text text-white">
                      การมองเห็นหน้า Dashboard
                    </span>
                  </div>

                  <div className="flex space-x-6 mb-3">
                    <input
                      type="checkbox"
                      disabled={formDisable.isCardata}
                      checked={formData.isCardata}
                      className="checkbox checkbox-warning"
                      value={formData.isCardata}
                      name="isCardata"
                      onChange={onChangeInputBoolean}
                    />
                    <span className="ml-6 label-text text-white">
                      การมองเห็นหน้าข้อมูลรถ
                    </span>
                  </div>

                  <div className="flex space-x-6 mb-3">
                    <input
                      type="checkbox"
                      disabled={formDisable.isCustomerData}
                      checked={formData.isCustomerData}
                      className="checkbox checkbox-warning"
                      value={formData.isCustomerData}
                      name="isCustomerData"
                      onChange={onChangeInputBoolean}
                    />
                    <span className="ml-6 label-text text-white">
                      การมองเห็นหน้าข้อมูลลูกค้า
                    </span>
                  </div>

                  <div className="flex space-x-6 mb-3">
                    <input
                      type="checkbox"
                      disabled={formDisable.isPayment}
                      checked={formData.isPayment}
                      className="checkbox checkbox-warning"
                      value={formData.isPayment}
                      name="isPayment"
                      onChange={onChangeInputBoolean}
                    />
                    <span className="ml-6 label-text text-white">
                      การมองเห็นหน้าชำระเงิน
                    </span>
                  </div>

                  <div className="flex space-x-6 mb-3">
                    <input
                      type="checkbox"
                      disabled={formDisable.isEmployee}
                      checked={formData.isEmployee}
                      className="checkbox checkbox-warning"
                      value={formData.isEmployee}
                      name="isEmployee"
                      onChange={onChangeInputBoolean}
                    />
                    <span className="ml-6 label-text text-white">
                      การมองเห็นหน้าข้อมูลทีมงาน
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 text-white"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalManage;
