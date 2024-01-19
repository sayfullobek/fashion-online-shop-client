import {BreadCrumb} from "../component/admin/BreadCrumb";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {DeleteHandler, EditHandler, GetHandler, SaveHandler, UploadPhoto} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";
import {Loading} from "../component/Loading";
import empty from "../assets/empty.jpg"
import {Carous} from "../component/Carous";

export const Product = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [categoryId, setCategoryId] = useState("0")
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [seeDes, setSeeDes] = useState('')
    const [status, setStatus] = useState('')
    const [salePrice, setSalePrice] = useState(0)
    const [pr, setPr] = useState(0)

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
        if (price <= 0) {
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

    const seeDescription = (des, status) => {
        if (status === "seeDescription") {
            setSeeDes(des)
        } else if (status === "salePrice") {
            setSalePrice(des.salePrice)
            setPr(des)
        } else if (status === "photo") {
            setPr(des)
        }
        setStatus(status)
    }
    const editSalePrice = async () => {
        const data = {salePrice, about: "salePrice"}
        await EditHandler(pr.id, APP_API.product, data)
        await getAll()
        setSalePrice(0)
    }

    const photoSave = async () => {
        const formData = new FormData();
        let ph = document.getElementById("img")
        formData.append("photo", ph.files[0])
        const photoId = await UploadPhoto(formData)
        const data = {photoId, about: "photo"}
        await EditHandler(pr.id, APP_API.product, data)
        await getAll()
    }

    return (
        <div>
            {loading ? (
                <>
                    <BreadCrumb name={"Kategoriyalar"} formArr={formArr} saveFunction={saveHandler}/>
                    <GetProduct products={products} getAll={getAll} seeDescription={seeDescription}/>
                </>
            ) : (
                <Loading/>
            )}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mahsulot haqidagi ma'lumot</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            {seeDes ? seeDes : ""}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalSale" tabIndex="-1" aria-labelledby="exampleModalLabelSale"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabelSale">Mahsulot chegirmali narxini
                                saqlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor={"salePrice"} className="form-label">Mahsulotning chegirmaliy narxini
                                    kiriting</label>
                                <input type={"number"}
                                       value={pr.price >= salePrice ? salePrice : pr.price}
                                       onChange={e => setSalePrice(e.target.value)}
                                       className="form-control" id="salePrice"
                                       placeholder={"Mahsulotning chegirmaliy narxini kiriting"}/>
                                <div className={"mt-3"}>Mahsulotning narxi {pr.price} so'm</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => editSalePrice()}>Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalImg" tabIndex="-1" aria-labelledby="exampleModalLabelImg"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabelImg">Mahsulot Rasmini
                                saqlash</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor={"img"} className="form-label">Mahsulotning Rasmini kiriting</label>
                                <input type={"file"}
                                       className="form-control" id="img"
                                       placeholder={"Mahsulotning chegirmaliy narxini kiriting"}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => photoSave()}>Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const GetProduct = (
    {
        products, getAll, seeDescription
    }
) => {
    const ButtonGroup = ({next, previous, goToSlide, ...rest}) => {
        const {carouselState: {currentSlide}} = rest;
        return (
            <div className="carousel-button-group">
                <button className={currentSlide === 0 ? 'btn disable' : 'btn'} onClick={() => previous()}/>
                <button className={"btn"} onClick={() => next()}/>
                <button className={"btn"} onClick={() => goToSlide(currentSlide + 1)}> Go to any slide</button>
            </div>
        );
    };
    return (
        <div className={"row mt-3 m-1"}>
            {products.map(item => (
                <div className={"col-12 col-sm-6 col-md-3 p-2"}>
                    <div className={"card w-100 p-3"}>
                        {item.photoId.length === 0 ? (
                            <img width={"100%"} height={"200px"} src={empty} alt="1"/>
                        ) : (
                            <Carous item={item}/>
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
                        <div className={"w-100 d-flex align-items-center justify-content-between"}>
                            <button className={"btn btn-info"}><i className="bi bi-cash"
                                                                  onClick={() => seeDescription(item, "salePrice")}
                                                                  data-bs-toggle="modal"
                                                                  data-bs-target="#exampleModalSale"/></button>
                            <button className={"btn btn-secondary"} data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => seeDescription(item.description, "seeDescription")}><i
                                className="bi bi-journal-arrow-up"/></button>
                            <button className={"btn btn-success"}
                                    onClick={() => seeDescription(item, "photo")}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalImg"><i className="bi bi-image"/></button>
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