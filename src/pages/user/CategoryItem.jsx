import {GetHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useEffect, useState} from "react";
import {Loading} from "../../component/Loading";
import {useParams} from 'react-router-dom'
import {Products} from "./Products";

export const CategoryItem = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const param = useParams().id
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
                <Products products={products} getAll={getAll}/>
            </div>
        ) : (
            <Loading/>
        )
    )
}