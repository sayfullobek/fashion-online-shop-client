import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DashboardLayout} from "../layout/DashboardLayout";
import {CLIENT_URL} from "../utils/Utils";
import {Dashboard} from "../pages/Dashboard";
import {Login} from "../pages/Login";
import {NotFoundPage} from "../pages/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`${CLIENT_URL}/login-handler`} element={<Login/>}/>
                <Route path={CLIENT_URL} element={<DashboardLayout/>}>
                    <Route index element={<Dashboard/>}/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
