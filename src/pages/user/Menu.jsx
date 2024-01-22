import {GetHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useEffect, useState} from "react";
import {Loading} from "../../component/Loading";
import {Link} from "react-router-dom";
import {Products} from "./Products";

export const Menu = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const getAll = async () => {
        try {
            const product = await GetHandler(APP_API.product, "data")
            const category = await GetHandler(APP_API.category, "embedded")
            setProducts(product)
            setCategories(category)
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
                <div className="row mt-3 m-1">
                    {categories.map(item => (
                        <Link to={`/1/${item.id}`} className="col-lg-4 col-md-12 mb-4">
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
                <Products products={products}/>
                <div className={"w-100 mt-3 mb-5 d-flex align-items-center justify-content-center"}>
                    <button className={"btn btn-secondary w-25"}>Yana ko'proq...</button>
                </div>
            </div>
        ) : (
            <Loading/>
        )
    )
}