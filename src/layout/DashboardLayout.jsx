import '../assets/dashboard.css'
import {SideBar} from "../component/admin/SideBar";
import {Nav} from "../component/admin/Nav";
import {Outlet} from 'react-router-dom'

export const DashboardLayout = () => {
    return (
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
    )
}