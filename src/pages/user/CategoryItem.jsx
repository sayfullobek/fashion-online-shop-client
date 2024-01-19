import {GetHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useEffect, useState} from "react";
import {Loading} from "../../component/Loading";
import empty from "../../assets/empty.jpg";
import {Carous} from "../../component/Carous";
import {useParams} from 'react-router-dom'

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
                <div className={"row mt-3 m-1"}>
                    {products.map(item => (
                        <div className={"col-12 col-sm-6 col-md-3 p-2"}>
                            <div className={"ripple hover-zoom shadow-1-strong rounded w-100 p-3"}>
                                {item.photoId.length === 0 ? (
                                    <img width={"100%"} height={"200px"} src={empty} alt="1"/>
                                ) : (
                                    <Carous item={item} getAll={getAll}/>
                                )}
                                <h5 className={"text-start mt-3"}>
                                    {item.name}
                                </h5>
                                <h5 className={"text-start"}>
                                    {item.salePrice === 0 ? (
                                        <>{item.price} so'm</>
                                    ) : (
                                        <>
                                            {item.price - item.salePrice} so'm
                                            <del className={"text-danger"}> {item.price} so'm</del>
                                        </>
                                    )}
                                </h5>
                                <p className={"text-secondary"}>{item.description.slice(0, 28)}</p>
                                <button className={"btn btn-primary"}><i className="bi bi-cart-check-fill"/> Savatga
                                    saqlash
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <Loading/>
        )
    )
}