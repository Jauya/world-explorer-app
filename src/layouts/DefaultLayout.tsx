import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

export default function DefaultLayout() {
    return (
        <div className="flex sm:flex-row flex-col-reverse w-full h-screen ">
            <SideBar />
            <Outlet />
        </div>
    )
}
