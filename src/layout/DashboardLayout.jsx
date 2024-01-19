import '../assets/dashboard.css'
import {SideBar} from "../component/admin/SideBar";
import {Nav} from "../component/admin/Nav";
import {Outlet, useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import {GetUserMe} from "../config/service/AuthService";
import {CLIENT_URL} from "../utils/Utils";
import {NotFoundPage} from "../pages/NotFoundPage";

export const DashboardLayout = () => {
    const navigate = useNavigate()
    const token = sessionStorage.getItem("__token__")
    const [users, setUsers] = useState({})
    const getUserMe = async () => {
        try {
            setUsers(await GetUserMe())
        } catch (err) {
        }
    }
    useEffect(() => {
        const secure = () => {
            if (token == null || !users) return navigate(`${CLIENT_URL}/login-handler`)
        }
        getUserMe()
        secure()
    }, [])
    return (
        token != null && users ? (
            <>
                <header>
                    <SideBar/>
                    <Nav/>
                </header>
                <main style={{marginTop: "58px"}}>
                    <div className="container pt-4">
                        <Outlet/>
                    </div>
                </main>
            </>
        ) : (
            <NotFoundPage/>
        )
    )
}