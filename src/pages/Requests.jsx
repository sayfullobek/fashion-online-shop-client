import {useEffect, useState} from "react";
import {GetHandler} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";
import {Loading} from "../component/Loading";

export const Requests = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)
    const getAll = async () => {
        try {
            setRequests(await GetHandler(APP_API.request, "data"))
            setLoading(true)
        } catch (err) {
        }
    }
    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            {loading ? (
                <>
                    <h3 className={"text-center mt-3 mb-3 text-primary"}>Botdan tushgan buyurtmalar</h3>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>T/r</th>
                            <th>Buyurtma ID</th>
                            <th>Telefon raqami</th>
                            <th>Ism</th>
                            <th>Familiya</th>
                            <th>Username</th>
                            <th>Vaqt</th>
                            <th>Batafsil</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((item, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{item.tr}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.users.botFirstName}</td>
                                <td>{item.users.botLastName}</td>
                                <td>{item.users.botUsername}</td>
                                <td>{item.createdAt.substring(0, 10)} / {item.createdAt.substring(11, 19)}</td>
                                <td>
                                    <button className={"btn btn-primary"}>Ba'tafsil</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <Loading/>
            )}
        </div>
    )
}