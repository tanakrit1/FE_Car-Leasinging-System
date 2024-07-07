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
    role: "",
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
    console.log("***Submit***", formData);
    returnSubmitModal(formData, statusForm);
  };

  useEffect(() => {
    console.log("data--> ", data);
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
        role: "",
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
        password: data.password,
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
        password: true,
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
    console.log("***");
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
                    required={!formDisable.password}
                    disabled={formDisable.password}
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={formData.password}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
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
