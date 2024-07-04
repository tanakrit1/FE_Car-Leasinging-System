import { useEffect, useState } from "react";

interface props {
  showModal: boolean;
  statusForm: string;
  data: any;
  returnShowModal: any
}

const ddl = {
    role: [
        { label: "เจ้าของธุรกิจ", value: "เจ้าของธุรกิจ" },
        { label: "หัวหน้าแผนก", value: "หัวหน้าแผนก" },
        { label: "บัญชี", value: "บัญชี" },
        { label: "ตัวแทน", value: "ตัวแทน" },
        { label: "พนักงานขาย", value: "พนักงานขาย" },
    ]
}

const ModalManage = ({ showModal, returnShowModal, statusForm, data }: props) => {
  const [formData, setFormData] = useState<any>({
    employeeID: "",
    firstName: "",
    lastName: "",
    phone: "",
    userName: "",
    password: "",
    status: true,
    isDashboard: false,
    isCarData: false,
    isCustomerData: false,
    isPayment: false,
    isEmployee: false,
    role: "",
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
  };

  useEffect(() => {
    if (statusForm == "add") {
      setFormData({
        employeeID: "",
        firstName: "",
        lastName: "",
        phone: "",
        userName: "",
        password: "",
        status: true,
        isDashboard: false,
        isCarData: false,
        isCustomerData: false,
        isPayment: false,
        isEmployee: false,
        role: "",
      });
    }

    if( showModal===true ){
        (document.getElementById("modal-employee-detail") as HTMLFormElement).showModal()
    }else{
        (document.getElementById("modal-employee-detail") as HTMLFormElement).close()
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
            <button onClick={()=> returnShowModal(false)} type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
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
                  </p>
                  <input
                    autoComplete="off"
                    type="text"
                    name="employeeID"
                    value={formData.employeeID}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1"> ชื่อ : </p>
                  <input
                    autoComplete="off"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1"> สกุล : </p>
                  <input
                    autoComplete="off"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1"> เบอร์โทร : </p>
                  <input
                    autoComplete="off"
                    type="number"
                    name="phone"
                    value={formData.phone}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1"> ตำแหน่งงาน : </p>
                  <select name="role" onChange={onChangeInput} className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50">
                    { ddl.role.map( (item: any) => (
                        <option value={item.value} >{item.label}</option>
                    ) ) }
                  </select>
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1">
                    {" "}
                    ชื่อผู้ใช้ :{" "}
                  </p>
                  <input
                    autoComplete="off"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    className="text-black mb-3 w-full rounded-lg h-12 px-3 focus:outline-primary focus:outline focus:outline-2 bg-slate-50"
                    onChange={onChangeInput}
                  />
                </div>

                <div className={`basis-4/12 px-2`}>
                  <p className="text-white font-semibold mb-1"> รหัสผ่าน : </p>
                  <input
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
                      checked={formData.isCarData}
                      className="checkbox checkbox-warning"
                      value={formData.isCarData}
                      name="isCarData"
                      onChange={onChangeInputBoolean}
                    />
                    <span className="ml-6 label-text text-white">
                      การมองเห็นหน้าข้อมูลรถ
                    </span>
                  </div>

                  <div className="flex space-x-6 mb-3">
                    <input
                      type="checkbox"
                      checked = {formData.isCustomerData}
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
                      checked = {formData.isPayment}
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
                      checked = {formData.isEmployee}
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
                <button type="submit" className="rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 text-white">บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalManage;
