import {toast} from "react-toastify";
import {BASE_CONFIG} from "../BaseConfig";
import {APP_API} from "../AppApi";
import {jwtDecode} from "jwt-decode";
import {CLIENT_URL} from "../../utils/Utils";

export const LoginHandler = async (data, navigate) => {
    if (data.username.trim().length === 0) {
        return toast.error("Username bo'lishi shart")
    }
    if (data.password.length === 0) {
        return toast.error("Parol bo'lishi shart")
    }
    try {
        const res = await BASE_CONFIG.doPost(APP_API.login, data)
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            toast.success("Muvaffaqiyatli xisobga kirdingiz")
            sessionStorage.setItem("__token__", res.data.token)
            navigate(`${CLIENT_URL}`)
        } else {
            toast.error("Username yoki parolda xatolik")
        }
    } catch (err) {
        toast.error(err.message)
    }
}

export const GetUserMe = async () => {
    const decode = jwtDecode(sessionStorage.getItem("token"))
    try {
        const res = await BASE_CONFIG.doGet(APP_API.getUserMe + "/" + decode.sub)
        return res.data
    } catch (err) {

    }
}