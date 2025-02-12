import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DashboardLayout} from "../layout/DashboardLayout";
import {CLIENT_URL} from "../utils/Utils";
import {Dashboard} from "../pages/Dashboard";
import {Login} from "../pages/Login";
import {NotFoundPage} from "../pages/NotFoundPage";
import {Category} from "../pages/Category";
import {Product} from "../pages/Product";
import {Requests} from "../pages/Requests";
import {Settings} from "../pages/Settings";
import {Menu} from "../pages/user/Menu";
import {CategoryItem} from "../pages/user/CategoryItem";
import {Users} from "../pages/Users";
import {Basket} from "../pages/user/Basket";
import {UserLayout} from "../layout/UserLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`${CLIENT_URL}/login-handler`} element={<Login/>}/>
                <Route element={<UserLayout/>}>
                    <Route path={`/:chatId`} element={<Menu/>}/>
                    <Route path={`/:chatId/:id`} element={<CategoryItem/>}/>
                    <Route path={`/basket/:chatId`} element={<Basket/>}/>
                </Route>
                <Route path={CLIENT_URL} element={<DashboardLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={`${CLIENT_URL}/category`} element={<Category/>}/>
                    <Route path={`${CLIENT_URL}/product`} element={<Product/>}/>
                    <Route path={`${CLIENT_URL}/users`} element={<Users/>}/>
                    <Route path={`${CLIENT_URL}/request`} element={<Requests/>}/>
                    <Route path={`${CLIENT_URL}/settings`} element={<Settings/>}/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
