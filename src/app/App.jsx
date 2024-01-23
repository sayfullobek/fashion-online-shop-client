import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
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
import {useEffect, useState} from "react";
import {GetHandler} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";

function App() {
    const chatId = useParams().chatId
    const [allPrice, setAllPrice] = useState(0)
    const [size, setSize] = useState(0)
    const getAll = async () => {
        try {
            const res = await GetHandler(`${APP_API.getBasket}/${chatId}`, "data")
            setAllPrice(res.allPrice)
            setSize(res.productBaskets.length)
        } catch (err) {

        }
    }
    useEffect(() => {
        getAll()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`${CLIENT_URL}/login-handler`} element={<Login/>}/>
                <Route element={<UserLayout chatId={chatId} getAll={getAll} allPrice={allPrice} size={size}/>}>
                    <Route path={`/:chatId`} element={<Menu getBasket={getAll}/>}/>
                    <Route path={`/:chatId/:id`} element={<CategoryItem getBasket={getAll}/>}/>
                    <Route path={`/basket/:chatId`} element={<Basket getBasket={getAll}/>}/>
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
