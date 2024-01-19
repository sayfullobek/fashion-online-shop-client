import '../assets/settings.css'
import {useEffect, useState} from "react";
import {GetUserMe} from "../config/service/AuthService";
import {Loading} from "../component/Loading";
import {toast} from "react-toastify";
import {EditHandler} from "../config/service/AppService";
import {APP_API} from "../config/AppApi";

export const Settings = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [usernamePassword, setUsernamePassword] = useState('')
    const [chatId, setChatId] = useState('')
    const [token, setToken] = useState('')
    const [usernameBot, setUserNameBot] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPrePassword, setNewPrePassword] = useState('')

    const getUserMe = async () => {
        const res = await GetUserMe()
        setUser(res)
        setFirstName(res.firstName)
        setLastName(res.lastName)
        setChatId(res.chatId)
        setToken(res.token)
        setUserNameBot(res.usernameBot)
        setUsername(res.username)
        setLoading(true)
    }
    useEffect(() => {
        getUserMe()
    }, [])

    const editNameAndLastName = async () => {
        if (firstName.trim().length === 0) {
            return toast.error("Ismingiz bo'lishi shart")
        }
        if (lastName.trim().length === 0) {
            return toast.error("Familiyangiz bo'lishi shart")
        }
        const data = {firstName, lastName, about: 'firstNameAndLastName'}
        await EditHandler(user.id, APP_API.settings, data)
        await getUserMe()
    }
    const editUserName = async () => {
        if (username.trim().length === 0) {
            return toast.error("Username bo'lishi shart")
        }
        if (usernamePassword.length === 0) {
            return toast.error("Parol bo'lishi shart")
        }
        const data = {username, password: usernamePassword, about: "username"}
        await EditHandler(user.id, APP_API.settings, data)
        await getUserMe()
    }
    const editPassword = async () => {
        if (oldPassword.trim().length === 0) {
            return toast.error("Xozirgi parolni kiritish shart")
        }
        if (newPassword.trim().length === 0) {
            return toast.error("Yangi parolni kiritish shart")
        }
        if (newPassword !== newPrePassword) {
            return toast.error("Yangi parol va tasdiqlash paroli bir xol bo'lishi shart")
        }
        const data = {oldPassword, newPassword, newPrePassword, about: "password"}
        await EditHandler(user.id, APP_API.settings, data)
        await getUserMe()
    }
    const editBotSettings = async () => {
        if (chatId.trim().length === 0) {
            return toast.error("Admin chat Id si bo'lishi shart")
        }
        if (token.trim().length === 0) {
            return toast.error("Token bo'lishi shart")
        }
        if (usernameBot.trim().length === 0) {
            return toast.error("Bot usernamesi bo'lishi shart")
        }
        const data = {chatId, token, usernameBot, about: "bot"}
        await EditHandler(user.id, APP_API.settings, data)
        await getUserMe();
    }
    return (
        <div>
            {loading ? (
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img
                                className="rounded-circle mt-5" width="150px"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                alt={"1"}/><span
                                className="font-weight-bold">{user.firstName} {user.lastName}</span><span> </span></div>
                        </div>
                        <div className="col-md-5 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Ism familiyanigz</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">Ismingiz</label><input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ismingizni kiriting"
                                        value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                    </div>
                                    <div className="col-md-6"><label className="labels">Familiyangiz</label><input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        placeholder="Familiyangizni kiriting"/>
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    <button className="btn btn-primary profile-button"
                                            onClick={() => editNameAndLastName()} type="button">
                                        Saqlash
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Username sozlamasi</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">Yangi username</label><input
                                        type="text"
                                        className="form-control"
                                        placeholder="Yangi usernameyingizni kiriting"
                                        value={username} onChange={e => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="col-md-6"><label className="labels">Parolingiz</label><input
                                        type="password"
                                        className="form-control"
                                        value={usernamePassword}
                                        onChange={e => setUsernamePassword(e.target.value)}
                                        placeholder="Parolingizni kiriting"/>
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    <button onClick={() => editUserName()} className="btn btn-primary profile-button"
                                            type="button">
                                        Saqlash
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Bot admini sozlamalari</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">Chat Id</label><input
                                        type="text"
                                        className="form-control"
                                        placeholder="ChatIdingizni kiriting"
                                        value={chatId} onChange={e => setChatId(e.target.value)}/>
                                    </div>
                                    <div className="col-md-6"><label className="labels">Token</label><input
                                        type="text"
                                        className="form-control"
                                        value={token}
                                        onChange={e => setToken(e.target.value)}
                                        placeholder="Tokeningizni kiriting"/>
                                    </div>
                                    <div className="col-md-12"><label className="labels">Bot username</label><input
                                        type="text"
                                        className="form-control"
                                        value={usernameBot}
                                        onChange={e => setUserNameBot(e.target.value)}
                                        placeholder="Botingizni  usernamsini kiriting"/>
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    <button onClick={() => editBotSettings()} className="btn btn-primary profile-button"
                                            type="button">
                                        Saqlash
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div className="p-3 py-5">
                                <div className="col-md-12"><label className="labels">Xozirgi parolingiz</label><input
                                    type="text" className="form-control" placeholder="Xozirgi parolingizni kiriting"
                                    value={oldPassword} onChange={e => setOldPassword(e.target.value)}/></div>
                                <br/>
                                <div className="col-md-12"><label className="labels">Yangi parol</label><input
                                    type="text" className="form-control" placeholder="Yangi parolni kiriting"
                                    value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                                </div>
                                <br/>
                                <div className="col-md-12"><label className="labels">Yangi parolni qayta
                                    kiriting</label><input
                                    type="text" className="form-control" placeholder="Yangi parolni qayta kiriting"
                                    value={newPrePassword} onChange={e => setNewPrePassword(e.target.value)}/>
                                </div>
                                <div className="mt-5 text-center">
                                    <button onClick={() => editPassword()} className="btn btn-primary profile-button"
                                            type="button">Saqlash
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </div>
    )
}