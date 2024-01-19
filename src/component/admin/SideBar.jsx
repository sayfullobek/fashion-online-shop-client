import {Link, useLocation} from "react-router-dom";
import {SIDE_ARR} from "../../utils/Utils";

export const SideBar = () => {
    const path = useLocation().pathname
    return (
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
            <div className="position-sticky">
                <div
                    className={"list-group list-group-flush mx-3 mt-4"}>
                    {SIDE_ARR.map(item => (
                        <Link
                            to={item.url}
                            className={item.url === path ? "list-group-item list-group-item-action py-2 ripple active" : "list-group-item list-group-item-action py-2 ripple"}
                            aria-current="true"
                        >
                            <i className={`${item.logo} me-3`}/><span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}