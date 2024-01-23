import empty from "../../assets/empty.jpg";
import {Carous} from "../../component/Carous";
import {useState} from "react";
import {EditHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useNavigate} from 'react-router-dom'

export const Products = ({products, getAll, chatId}) => {
    const [see, setSee] = useState('')
    const [item, setItem] = useState({})
    const [nowPrice, setNowPrice] = useState(0)
    const [buyPrice, setBuyPrice] = useState(0)
    const navigate = useNavigate()

    const saveBasket = async () => {
        const sizeProduct = nowPrice / buyPrice;
        const data = {oneProduct: item.id, sizeProduct}
        await EditHandler(chatId, APP_API.saveBasket, data)
        navigate(`/${chatId}`)
    }

    return (
        <div className={"row mt-3 m-1"}>
            {products.map(item => (
                item.active ? (
                    <div className={"col-12 col-sm-6 col-md-3 p-2"}>
                        <div className={"ripple shadow-1-strong rounded w-100 p-3"}>
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
                            <div className={"w-100 d-flex align-items-center justify-content-between"}>
                                <button data-bs-toggle="modal" className={"btn btn-primary"}
                                        data-bs-target="#exampleModalBasket" onClick={() => {
                                    setItem(item)
                                    if (item.salePrice) {
                                        setNowPrice(item.price - item.salePrice)
                                        setBuyPrice(item.price - item.salePrice)
                                    } else {
                                        setNowPrice(item.price)
                                        setBuyPrice(item.price)
                                    }
                                }}><i
                                    className="bi bi-cart-check-fill"/> Savatga
                                    saqlash
                                </button>
                                <button data-bs-toggle="modal" onClick={() => setSee(item.description)}
                                        data-bs-target="#exampleModal" className={"btn btn-success"}>
                                    <i className="bi bi-eye-fill"/></button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            ))}

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mahsulot haqida</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            {see}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalBasket" tabIndex="-1" aria-labelledby="exampleModalLabelBasket"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabelBasket">Mahsulot haqida</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className={"w-100 d-flex align-items-center justify-content-between"}>
                                <div className={"w-50"}>
                                    <Carous item={item} getAll={getAll} status={"user"}/>
                                </div>
                                <div className={"w-50 flex-column d-flex align-items-center justify-content-center"}>
                                    <h5 className={"text-center text-dark"}>{item.name}</h5>
                                    {item.salePrice === 0 ? (
                                        <>{item.price} so'm</>
                                    ) : (
                                        <>
                                            <del className={"text-danger"}> {item.price} so'm</del>
                                            <h3>{item.price - item.salePrice} so'm <span style={{fontSize: '16px'}}
                                                                                         className={"text-success"}><span
                                                style={{fontSize: '10px'}}>X</span>{nowPrice / buyPrice}</span></h3>
                                        </>
                                    )}
                                    <div style={{width: "60%"}}
                                         className={"d-flex align-items-center justify-content-between"}>
                                        {item.salePrice ? (
                                            <>
                                                <button
                                                    className={nowPrice === (item.price - item.salePrice) ? "btn btn-secondary disabled" : "btn btn-danger"}
                                                    onClick={() => {
                                                        setNowPrice(nowPrice - buyPrice)
                                                    }}>-
                                                </button>
                                                <button className={"btn btn-success"} onClick={() => {
                                                    setNowPrice(nowPrice + buyPrice)
                                                }}>+
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={nowPrice === (item.price) ? "btn btn-secondary disabled" : "btn btn-danger"}
                                                    onClick={() => {
                                                        setNowPrice(nowPrice - buyPrice)
                                                    }}>-
                                                </button>
                                                <button className={"btn btn-success"} onClick={() => {
                                                    setNowPrice(nowPrice + buyPrice)
                                                }}>+
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <h4 className={"text-success mt-3"}>{nowPrice}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" onClick={() => saveBasket()} className="btn btn-primary"><i
                                className="bi bi-cart-check-fill"/> Savatga saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}