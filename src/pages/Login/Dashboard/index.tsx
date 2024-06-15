import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        console.log("**Logout**")
        navigate('/login', { state: { key: "value" } })
    }
    return (
        <>
            <p>Dashboard</p>
            <button className="bg-primary rounded-lg px-3 py-1 text-black" onClick={onLogout}>Log Out</button>
        </>
    )
}

export default Dashboard