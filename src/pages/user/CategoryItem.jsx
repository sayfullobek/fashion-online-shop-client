import {GetHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useEffect, useState} from "react";
import {Loading} from "../../component/Loading";
import {Link, useLocation, useParams} from 'react-router-dom'
import {Products} from "./Products";

export const CategoryItem = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const param = useParams().id
    const chatId = useParams().chatId
    const path = useLocation().pathname.split('/')[1]
    const [allPrice, setAllPrice] = useState(0)
    const [size, setSize] = useState(0)

    const getAll = async () => {
        try {
            const product = await GetHandler(`${APP_API.getProductByCategoryId}/${param}`, "data")
            const res = await GetHandler(`${APP_API.getBasket}/${chatId}`, "data")
            setAllPrice(res.allPrice)
            setSize(res.productBaskets.length)
            setProducts(product)
            setLoading(true)
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        loading ? (
            <div className={"container"}>
                <div className={"w-100 position-fixed top-0 mt-1"} style={{zIndex: '10000'}}>
                    <Link to={`/${chatId}`} className={"btn btn-primary "}><i className="bi bi-box-arrow-left"/></Link>
                </div>
                <div className={"mt-5"}/>
                <Products products={products} getAll={getAll} chatId={chatId}/>
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
        ) : (
            <Loading/>
        )
    )
}