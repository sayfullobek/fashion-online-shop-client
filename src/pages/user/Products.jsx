import empty from "../../assets/empty.jpg";
import {Carous} from "../../component/Carous";
import {useState} from "react";

export const Products = ({products, getAll}) => {
    const [see, setSee] = useState('')
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
                                <button className={"btn btn-primary"}><i className="bi bi-cart-check-fill"/> Savatga
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}