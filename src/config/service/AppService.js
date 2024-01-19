import {toast} from "react-toastify";
import {BASE_CONFIG} from "../BaseConfig";
import {APP_API} from "../AppApi";

export const SaveHandler = async (api, data) => {
    try {
        const res = await BASE_CONFIG.doPost(api, data)
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            toast.success("Muvaffaqiyatli saqlandi")
        }
    } catch (err) {
        toast.error("Saqlashda xatolik")
    }
}


export const EditHandler = async (id, api, data) => {
    try {
        const res = await BASE_CONFIG.doPut(api, id, data)
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            toast.success("Muvaffaqiyatli Taxrirlandi")
        }
    } catch (err) {
        toast.error("Taxrirlashda xatolik")
    }
}

export const GetHandler = async (api, status) => {
    try {
        const res = await BASE_CONFIG.doGet(api)
        if (status === "data") {
            return res.data
        } else {
            return res.data._embedded.list
        }
    } catch (err) {
    }
}

export const DeleteHandler = async (api, id, getAll) => {
    const deleteFun = window.confirm("O'chirasizmi?");
    if (deleteFun) {
        try {
            await BASE_CONFIG.doDelete(api, id)
            toast.success("Muvaffaqiyatli o'chirildi")
            await getAll()
        } catch (err) {
            toast.error("O'chirishda xatolik")
        }
    }
}

export const UploadPhoto = async (formData) => {
    try {
        const res = await BASE_CONFIG.doPost(APP_API.upload, formData)
        return res.data
    } catch (err) {
        return toast.error("Rasm saqlashda xatolik")
    }
}