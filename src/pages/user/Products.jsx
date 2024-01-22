import empty from "../../assets/empty.jpg";
import {Carous} from "../../component/Carous";
import {useState} from "react";

export const Products = ({products, getAll}) => {
    const [see, setSee] = useState('')
    const [item, setItem] = useState({})
    const [nowPrice, setNowPrice] = useState(0)
    const [buyPrice, setBuyPrice] = useState(0)
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
                                    setNowPrice(item.price - item.salePrice)
                                    setBuyPrice(item.price - item.salePrice)
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
                                            <h3>{item.price - item.salePrice} so'm <span style={{fontSize:'16px'}} className={"text-success"}><span style={{fontSize:'10px'}}>X</span>{nowPrice/buyPrice}</span></h3>
                                        </>
                                    )}
                                    <div style={{width: "100%"}}
                                         className={"d-flex align-items-center justify-content-between"}>
                                        <button
                                            className={nowPrice === (item.price - item.salePrice) ? "btn btn-secondary p-5 pt-1 pb-1 disabled" : "btn btn-danger p-5 pt-1 pb-1"}
                                            onClick={() => {
                                                setNowPrice(nowPrice - buyPrice)
                                            }}>-
                                        </button>
                                        <button className={"btn btn-success p-5 pt-1 pb-1"} onClick={() => {
                                            setNowPrice(nowPrice + buyPrice)
                                        }}>+
                                        </button>
                                    </div>
                                    <h4 className={"text-success mt-3"}>{nowPrice}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"><i
                                className="bi bi-cart-check-fill"/> Savatga saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}