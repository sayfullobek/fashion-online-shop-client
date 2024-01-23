import {Link, Outlet, useLocation} from 'react-router-dom'

export const UserLayout = ({chatId, allPrice, size, getAll}) => {
    const path = useLocation().pathname.split('/')[1]
    return (
        <div className={"w-100"}>
            <Outlet/>
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
    )
}