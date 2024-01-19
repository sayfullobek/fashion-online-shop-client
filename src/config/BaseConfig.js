import axios from "axios";
import {SERVER_URL} from "../utils/Utils";

const token = sessionStorage.getItem("__token__")
const settings = {headers: {"Authorization": `Bearer ${token}`}}

export const BASE_CONFIG = {
    doGet: (api) => axios.get(
        `${SERVER_URL}${api}`, settings
    ), doPost: (api, data) => axios.post(
        `${SERVER_URL}${api}`, data, settings
    ), doPut: (api, id, data) => axios.put(
        `${SERVER_URL}${api}/${id}`, data, settings
    ), doDelete: (api, id) => axios.delete(
        `${SERVER_URL}${api}/${id}`, settings
    )
}