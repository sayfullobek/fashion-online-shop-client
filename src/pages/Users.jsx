import {useEffect, useState} from "react";
import {GetHandler} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";
import {Loading} from "../component/Loading";

export const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const getAll = async () => {
        try {
            setUsers(await GetHandler(APP_API.users, "data"))
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
                    <h3 className={"text-center mt-3 mb-3 text-primary"}>Botdan foydalanadigan foydalanuvchilar</h3>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>T/r</th>
                            <th>Chat Id</th>
                            <th>Ism</th>
                            <th>Familiya</th>
                            <th>Username</th>
                            <th>Vaqt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((item, i) => (
                            item.roles[0].roleName === "USER" ? (
                                <tr>
                                    <td>{i}</td>
                                    <td>{item.chatId}</td>
                                    <td>{item.botFirstName}</td>
                                    <td>{item.botLastName}</td>
                                    <td>{item.botUsername}</td>
                                    <td>{item.createdAt.substring(0, 10)} / {item.createdAt.substring(11, 19)}</td>
                                </tr>
                            ) : (
                                <></>
                            )
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