import {BreadCrumb} from "../component/admin/BreadCrumb";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {GetHandler, SaveHandler, UploadPhoto} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";
import {Loading} from "../component/Loading";

export const Category = () => {
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState()
    const [loading, setLoading] = useState(false)
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
            const res = await GetHandler(APP_API.category, "embedded")
            setCategories(res)
            setLoading(true)
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
        } else {
            const data = {name, photoId}
            await SaveHandler(APP_API.category, data)
            setName("")
            setPhoto("")
            await getAll()
        }
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            {loading ? (
                <>
                    <BreadCrumb name={"Kategoriyalar"} formArr={formArr} saveFunction={saveHandler}/>
                    <GetCategory categories={categories}/>
                </>
            ) : (
                <Loading/>
            )}
        </div>
    )
}

const GetCategory = (
    {
        categories
    }
) => {
    return (
        <div className={"row mt-3 m-1"}>
            {categories.map(item => (
                <div className={"col-12 col-sm-6 col-md-3 p-2"}>
                    <div className={"card w-100 p-3"}>
                        <img width={"100%"} height={"200px"} src={`${APP_API.download}${item.photoId}`} alt="1"/>
                        <h5 className={"text-start mt-3"}>{item.name}</h5>
                    </div>
                </div>
            ))}
        </div>
    )
}