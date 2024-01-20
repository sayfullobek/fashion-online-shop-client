import {Link} from "react-router-dom";
import {CLIENT_URL} from "../utils/Utils";

export const Dashboard = () => {
    const arr = [
        {name: 'Kategoriyalar', size: 1, link: '/category'},
        {name: 'Mahsulotlar', size: 1, link: '/product'},
        {name: 'Foydalanuvchilar', size: 1, link: '/users'},
        {name: 'So\'rovlar', size: 1, link: '/request'},
    ]
    return (
        <>
            <div className={"row col-12"}>
                {arr.map(item => (
                    <div className="col-3">
                        <div className="card col-12">
                            <h5 className="card-header">{item.name}</h5>
                            <div className="card-body">
                                <h6 className="card-title">{item.name}ning soni {item.size}ta</h6>
                                <Link to={`${CLIENT_URL}${item.link}`} className="btn btn-primary" data-mdb-ripple-init>Batafsil</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}