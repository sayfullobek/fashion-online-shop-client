import {GetHandler} from "../../config/service/AppService";
import {APP_API} from "../../config/AppApi";
import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {Carous} from "../../component/Carous";
import {Loading} from "../../component/Loading";

export const Basket = () => {
    const navigate = useNavigate
    const [basket, setBasket] = useState({})
    const [loading, setLoading] = useState(false)
    const chatId = useParams().chatId
    const path = useLocation().pathname.split('/')[1]
    const [allPrice, setAllPrice] = useState(0)
    const [size, setSize] = useState(0)

    const getAll = async () => {
        try {
            const res = await GetHandler(`${APP_API.getBasket}/${chatId}`, "data")
            setBasket(res)
            setAllPrice(res.allPrice)
            setSize(res.productBaskets.length)
            setLoading(true)
        } catch (err) {

        }
    }
    useEffect(() => {
        getAll()
    }, [])
    const close = async () => {
        const res = await GetHandler(`${APP_API.sendMsg}/${chatId}`, "data")
        if (res.status === 200) {
            window.location.href = "https://t.me/onlien_fashion_bot"
        }
        // window.location.href = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${chatId}&text=${basket.productBaskets.map(item => (
        //     item.product[0].name + " " + item.size + " X " + (item.product[0].price - item.product[0].salePrice) + " = " + (item.size * (item.product[0].price - item.product[0].salePrice)) + "\n"
        // ))}\n\n\nUmumiy narxi = ${basket.allPrice}&reply_markup={"inline_keyboard":%20[[{"text":%20"Tasdiqlash ✅",%20"callback_data":%20"sotib olaman : ${chatId}"}]]}`
        // window.close();

    }
    return (
        <div>
            {loading ? (
                <div className={"container"}>
                    <div className={"w-100 position-fixed top-0 mt-1"} style={{zIndex: '100000'}}>
                        <Link to={`/${chatId}`} className={"btn btn-primary "}><i
                            className="bi bi-box-arrow-left"/></Link>
                    </div>
                    {basket.productBaskets.length === 0 ? (
                        <h1 className={"text-center text-primary"}>Hozircha savatda hech qanday mahsulot mavjud
                            emas</h1>
                    ) : (
                        <>
                            <div className={"mt-5"}/>
                            {basket.productBaskets.map(item => (
                                <div className="card w-100 p-2 mt-1" style={{height: '18%'}}>
                                    <div className={"w-100 d-flex align-items-center justify-content-between"}>
                                        <div className={"w-50"}>
                                            <Carous item={item.product[0]} getAll={getAll} status={"user"}/>
                                        </div>
                                        <div
                                            className={"w-50 flex-column d-flex align-items-center justify-content-center"}>
                                            <h5 className={"text-center text-dark"}>{item.product[0].name}</h5>
                                            {item.product[0].salePrice === 0 ? (
                                                <>{item.product[0].price} so'm <span
                                                    style={{fontSize: '16px'}}
                                                    className={"text-success"}><span
                                                    style={{fontSize: '10px'}}>X</span>{item.size}</span></>
                                            ) : (
                                                <>
                                                    <del className={"text-danger"}> {item.product[0].price} so'm</del>
                                                    <h3>{item.product[0].price - item.product[0].salePrice} so'm <span
                                                        style={{fontSize: '16px'}}
                                                        className={"text-success"}><span
                                                        style={{fontSize: '10px'}}>X</span>{item.size}</span></h3>
                                                </>
                                            )}
                                            {/*<div style={{width: "60%"}}*/}
                                            {/*     className={"d-flex align-items-center justify-content-between"}>*/}
                                            {/*    {item.product[0].salePrice ? (*/}
                                            {/*        <>*/}
                                            {/*            <button*/}
                                            {/*                className={nowPrice === (item.price - item.salePrice) ? "btn btn-secondary disabled" : "btn btn-danger"}*/}
                                            {/*                onClick={() => {*/}
                                            {/*                    setNowPrice(nowPrice - buyPrice)*/}
                                            {/*                }}>-*/}
                                            {/*            </button>*/}
                                            {/*            <button className={"btn btn-success"} onClick={() => {*/}
                                            {/*                setNowPrice(nowPrice + buyPrice)*/}
                                            {/*            }}>+*/}
                                            {/*            </button>*/}
                                            {/*        </>*/}
                                            {/*    ) : (*/}
                                            {/*        <>*/}
                                            {/*            <button*/}
                                            {/*                className={nowPrice === (item.price) ? "btn btn-secondary disabled" : "btn btn-danger"}*/}
                                            {/*                onClick={() => {*/}
                                            {/*                    setNowPrice(nowPrice - buyPrice)*/}
                                            {/*                }}>-*/}
                                            {/*            </button>*/}
                                            {/*            <button className={"btn btn-success"} onClick={() => {*/}
                                            {/*                setNowPrice(nowPrice + buyPrice)*/}
                                            {/*            }}>+*/}
                                            {/*            </button>*/}
                                            {/*        </>*/}
                                            {/*    )}*/}
                                            {/*</div>*/}
                                            <h4 className={"text-success mt-3"}>{(item.product[0].price - item.product[0].salePrice) * item.size}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <h1 className={"text-center text-secondary mt-3"}>Umumiy summa : {allPrice}</h1>
                        </>
                    )}
                    <div className={"w-100"} style={{height: '13vh'}}/>
                    <div className={"w-100 card bottom-0 position-fixed"} style={{height: '13vh', zIndex: '10000'}}>
                        <div className={"w-100 d-flex align-items-center justify-content-around p-3"}>
                            <button className={"btn btn-success w-50 m-1"}>{allPrice} so'm</button>
                            {path === "basket" ? (
                                <button onClick={() => close()}
                                        className={"btn btn-primary w-50 m-1"}>Buyurtma
                                    qilish
                                </button>
                            ) : (
                                <Link to={`/basket/${chatId}`}
                                      className={"btn btn-primary w-50 m-1"}>Savatcha <span>{size}</span></Link>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </div>
    )
}