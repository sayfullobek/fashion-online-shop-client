export const CLIENT_URL = "/auth/online-fashion-shop/dashboard"
export const SERVER_URL = "http://localhost/api/v1"
// export const SERVER_URL = "https://online-fashion-bot-3a49d457053e.herokuapp.com/api/v1"

export const SIDE_ARR = [
    {name: 'Asosiy bo\'lim', url: `${CLIENT_URL}`, logo: 'bi bi-house-check-fill'},
    {name: 'Kategoriyalar', url: `${CLIENT_URL}/category`, logo: 'bi bi-bookmark-check-fill'},
    {name: 'Mahsulotlar', url: `${CLIENT_URL}/product`, logo: 'bi bi-bag-check-fill'},
    {name: 'Foydalanuvchilar', url: `${CLIENT_URL}/users`, logo: 'bi bi-people-fill'},
    {name: 'So\'rovlar', url: `${CLIENT_URL}/request`, logo: 'bi bi-clipboard-plus-fill'},
    {name: 'Sozlamalar', url: `${CLIENT_URL}/settings`, logo: 'bi bi-gear-fill'},
]

export const RESPONSIVE = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 1
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 1
    }
}