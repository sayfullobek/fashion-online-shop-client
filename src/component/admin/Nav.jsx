export const Nav = () => {
    return (
        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <a className="navbar-brand" href="#">
                    <img
                        src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/280443298/original/9444e4e05462071943b8dc930e6d2853a6f005f0/create-fantastic-online-shop-logo-with-fastest-delivery.png"
                        height="46"
                        width="100"
                        alt="MDB Logo"
                        loading="lazy"
                    />
                </a>

                <ul className="navbar-nav ms-auto d-flex flex-row">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                                className="rounded-circle"
                                height="22"
                                alt="Avatar"
                                loading="lazy"
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <li>
                                <a className="dropdown-item" href="#">My profile</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Settings</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}