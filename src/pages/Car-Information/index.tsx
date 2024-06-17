
import FormList from "./form-list"
import FormRecord from "./form-record"

const CarInformation = () => {
    return (
        <>
            <p className="font-bold text-2xl text-white">บันทึกข้อมูลรถ</p>
            <div className="flex space-x-2 mt-5">
                <div className="w-1/2">
                    <FormRecord />
                </div>
                <div className="w-1/2">
                    <FormList />
                </div>
            </div>
        </>
    )
}
export default CarInformation