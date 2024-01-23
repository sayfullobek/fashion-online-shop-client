import {Link, Outlet, useLocation, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import {GetHandler} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";

export const UserLayout = () => {
    const path = useLocation().pathname.split('/')[1]
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
        <div className={"w-100"}>
            <Outlet/>
            <div className={"w-100"} style={{height: '13vh'}}/>
            <div className={"w-100 card bottom-0 position-fixed"} style={{height: '13vh', zIndex: '10000'}}>
                <div className={"w-100 d-flex align-items-center justify-content-around p-3"}>
                    <button className={"btn btn-success w-50 m-1"}>{allPrice} so'm</button>
                    {path === "basket" ? (
                        <button className={"btn btn-primary w-50 m-1"}>Buyurtma qilish <span>{size}</span></button>
                    ) : (
                        <Link to={`/basket/${chatId}`}
                              className={"btn btn-primary w-50 m-1"}>Savatcha <span>{size}</span></Link>
                    )}
                </div>
            </div>
        </div>
    )
}