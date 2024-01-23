import {Outlet} from 'react-router-dom'

export const UserLayout = () => {
    return (
        <div className={"w-100"}>
            <Outlet/>
        </div>
    )
}