import {GetHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useEffect, useState} from "react";
import {Loading} from "../../component/Loading";
import {Link, useLocation, useParams} from "react-router-dom";
import {Products} from "./Products";

export const Menu = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const chatId = useParams().chatId
    const path = useLocation().pathname.split('/')[1]
    const [allPrice, setAllPrice] = useState(0)
    const [size, setSize] = useState(0)

    const getAll = async () => {
        try {
            const product = await GetHandler(APP_API.product, "data")
            const category = await GetHandler(APP_API.category, "embedded")
            const validateUser = await GetHandler(`${APP_API.getUserMeByChatId}/${chatId}`, "data")
            const res = await GetHandler(`${APP_API.getBasket}/${chatId}`, "data")
            if (validateUser.status === 200) {
                setProducts(product)
                setCategories(category)
                setAllPrice(res.allPrice)
                setSize(res.productBaskets.length)
                setLoading(true)
            }
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        loading ? (
            <div className={"container"}>
                <div className="row mt-3 m-1">
                    {categories.map(item => (
                        <Link to={`/${chatId}/${item.id}`} className="col-lg-4 col-md-12 mb-4">
                            <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                                <img height={"180px"} src={`${APP_API.download}${item.photoId}`}
                                     className="w-100"/>
                                <a href="#!">
                                    <div className="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
                                        <div className="d-flex justify-content-start align-items-start h-100">
                                            <h2><span
                                                className="badge bg-light pt-2 ms-3 mt-3 text-dark">{item.name}</span>
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="hover-overlay">
                                        <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}/>
                                    </div>
                                </a>
                            </div>
                        </Link>
                    ))}
                </div>
                <Products products={products} getAll={getAll} chatId={chatId}/>
                <div className={"w-100 mt-3 mb-5 d-flex align-items-center justify-content-center"}>
                    <button className={"btn btn-secondary w-25"}>Yana ko'proq...</button>
                </div>
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