import {BreadCrumb} from "../component/admin/BreadCrumb";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {GetHandler, SaveHandler, UploadPhoto} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";

export const Category = () => {
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState()
    const [categories, setCategories] = useState([])
    const formArr = {
        name: "Kategoriya saqlash",
        arr: [
            {name: "Kategoriya nomini kiriting", type: 'text', value: name, setValue: setName},
            {name: "Kategoriya rasmini tanlang", type: 'file', value: photo, setValue: setPhoto},
        ]
    }

    const getAll = async () => {
        try {
            const res = await GetHandler(APP_API.category)
            setCategories(res)
        } catch (err) {
        }
    }

    const saveHandler = async () => {
        if (name.trim().length === 0) {
            return toast.error("Kategoriya nomi bo'lishi shart")
        }
        const formData = new FormData();
        let ph = document.getElementById("photo")
        formData.append("photo", ph.files[0])
        const photoId = await UploadPhoto(formData)
        if (!photoId) {
            return toast.error("Rasm bo'lishi shart")
        }
        await SaveHandler(APP_API.category, data, getAll)
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            <BreadCrumb name={"Kategoriyalar"} formArr={formArr} saveFunction={saveHandler}/>
        </div>
    )
}