import {SERVER_URL} from "../utils/Utils";

export const APP_API = {
    login: '/auth/login',
    users: '/auth/users',
    getUserMe: "/auth/get-user-me",
    getUserMeByChatId: "/auth/chat-id",
    saveBasket: "/auth/basket-save",
    upload: "/attachment/upload",
    download: `${SERVER_URL}/attachment/download?id=`,
    category: "/category",
    product: "/product",
    getProductByCategoryId: "/product/category-by",
    photo: '/product/photo',
    settings: '/auth/settings/edit',
    attachment: "/attachment"
}