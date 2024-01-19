import {BreadCrumb} from "../component/admin/BreadCrumb";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {DeleteHandler, GetHandler, SaveHandler} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";
import {Loading} from "../component/Loading";
import empty from "../assets/empty.jpg"

export const Product = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [categoryId, setCategoryId] = useState("0")
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const formArr = {
        name: "Mahsulot saqlash",
        arr: [
            {
                name: "Mahsulot qaysi kategoriyaga tegishli",
                type: 'select',
                value: categoryId,
                setValue: setCategoryId,
                arr: categories
            },
            {name: "Mahsulot nomini kiriting", type: 'text', value: name, setValue: setName},
            {name: "Mahsulot narxini kiriting", type: 'number', value: price, setValue: setPrice},
            {name: "Mahsulot haqida ma'lumot kiriting", type: 'textarea', value: description, setValue: setDescription},
        ]
    }

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

    const saveHandler = async () => {
        if (categoryId === "0") {
            return toast.error("Mahsulot qaysi kategoriyaga tegishli ekanini belgilang")
        }
        if (name.trim().length === 0) {
            return toast.error("Mahsulot nomi bo'lishi shart")
        }
        if (price === 0) {
            return toast.error("Mahsulot narxi bo'lishi shart")
        }
        if (description.trim().length === 0) {
            return toast.error("Mahsulot haqida ma'lumot bo'lishi shart")
        }
        const data = {name, price, description, categoryId}
        await SaveHandler(APP_API.product, data)
        setCategoryId("0")
        setName("")
        setPrice(0)
        setDescription("")
        await getAll()
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div>
            {loading ? (
                <>
                    <BreadCrumb name={"Kategoriyalar"} formArr={formArr} saveFunction={saveHandler}/>
                    <GetProduct products={products} getAll={getAll}/>
                </>
            ) : (
                <Loading/>
            )}
        </div>
    )
}

const GetProduct = (
    {
        products, getAll
    }
) => {
    return (
        <div className={"row mt-3 m-1"}>
            {products.map(item => (
                <div className={"col-12 col-sm-6 col-md-3 p-2"}>
                    <div className={"card w-100 p-3"}>
                        {item.photoId.length === 0 ? (
                            <img width={"100%"} height={"200px"} src={empty} alt="1"/>
                        ) : (
                            <img width={"100%"} height={"200px"} src={`${APP_API.download}${item.photoId}`} alt="1"/>
                        )}
                        <h5 className={"text-start mt-3"}>
                            {item.name}
                        </h5>
                        <h5 className={"text-start"}>
                            {item.salePrice === 0 ? (
                                <>{item.price} so'm</>
                            ) : (
                                <>
                                    {item.salePrice} so'm
                                    <del className={"text-danger"}>{item.price} so'm</del>
                                </>
                            )}
                        </h5>
                        <p className={"text-secondary"}>{item.description.slice(0, 36)}</p>
                        <div className={"w-100 d-flex align-items-center justify-content-between"}>
                            <button className={"btn btn-info"}><i className="bi bi-cash"/></button>
                            <button className={"btn btn-secondary"}><i className="bi bi-journal-arrow-up"/></button>
                            <button className={"btn btn-success"}><i className="bi bi-image"/></button>
                            <button className={"btn btn-warning"}><i className="bi bi-pencil-square"/></button>
                            <button className={"btn btn-danger"}
                                    onClick={() => DeleteHandler(APP_API.product, item.id, getAll)}><i
                                className="bi bi-trash"/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}