import {Link} from "react-router-dom";
import {CLIENT_URL} from "../utils/Utils";

export const NotFoundPage = () => {
    const token = sessionStorage.getItem("__token__")
    return (
        <div className={"w-100 d-flex align-items-center justify-content-center flex-column"} style={{height: '100vh'}}>
            <h1 className={"text-danger"}>404</h1>
            <h2 className={"text-primary"}>Bunday sahifa topilmadi</h2>
            <Link to={token ? `${CLIENT_URL}` : `${CLIENT_URL}/login-handler`}
                  className={"btn btn-primary"}>{token ? "Asosiy sahifaga qaytish" : "Orqaga qaytish"}</Link>
        </div>
    )
}