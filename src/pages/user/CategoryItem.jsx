import {GetHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useEffect, useState} from "react";
import {Loading} from "../../component/Loading";
import {Link, useParams} from 'react-router-dom'
import {Products} from "./Products";

export const CategoryItem = ({getBasket}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const param = useParams().id
    const chatId = useParams().chatId
    const getAll = async () => {
        try {
            const product = await GetHandler(`${APP_API.getProductByCategoryId}/${param}`, "data")
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
                <Products products={products} getAll={getAll} chatId={chatId} getBasket={getBasket}/>
            </div>
        ) : (
            <Loading/>
        )
    )
}