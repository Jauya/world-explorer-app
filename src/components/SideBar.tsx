import { NavLink } from 'react-router-dom'
import { HiHome, HiBell } from 'react-icons/hi'
import { HiMiniHeart } from 'react-icons/hi2'
export default function SideBar() {
    return (
        <nav className="flex sm:flex-col sm:w-80 sm:p-5 sm:shadow-none shadow bg-card max-sm:sticky max-sm:bottom-0">
            <div className="hidden sm:flex justify-center items-center font-medium text-2xl rounded-lg p-5 text-secondary bg-secondary/10 gap-2">
            <img src="/images/logo.png" className='w-16' alt="World Explorer App Logo" />
                <h1>World Explorer!</h1>
            </div>
            <div className="sm:mt-8 flex sm:flex-col flex-row sm:gap-3 sm:justify-start justify-center w-full">
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        [
                            isPending ? '' : '',
                            isActive
                                ? 'sm:text-page sm:bg-secondary text-secondary  border-t-secondary'
                                : 'border-t-card bg-card',
                            'transition-colors duration-200 sm:rounded-lg sm:px-5 sm:py-3 py-5 w-full flex sm:justify-normal justify-center items-center sm:gap-2 sm:border-none border-t-2',
                        ].join(' ')
                    }
                >
                    <HiHome className="text-3xl" />
                    <span className="sm:block hidden">Home</span>
                </NavLink>
                <NavLink
                    to="/liked"
                    className={({ isActive, isPending }) =>
                        [
                            isPending ? '' : '',
                            isActive
                                ? 'sm:text-page sm:bg-secondary text-secondary  border-t-secondary'
                                : 'border-t-card bg-card',
                            'transition-colors duration-200 sm:rounded-lg sm:px-5 sm:py-3 py-5 w-full flex sm:justify-normal justify-center items-center sm:gap-2 sm:border-none border-t-2',
                        ].join(' ')
                    }
                >
                    <HiMiniHeart className="text-3xl" />
                    <span className="sm:block hidden">Liked</span>
                </NavLink>
                <NavLink
                    to="/vista-2"
                    className={({ isActive, isPending }) =>
                        [
                            isPending ? '' : '',
                            isActive
                                ? 'sm:text-page sm:bg-secondary text-secondary  border-t-secondary'
                                : 'border-t-card bg-card',
                            'transition-colors duration-200 sm:rounded-lg sm:px-5 sm:py-3 py-5 w-full flex sm:justify-normal justify-center items-center sm:gap-2 sm:border-none border-t-2',
                        ].join(' ')
                    }
                >
                    <HiBell className="text-3xl" />
                    <span className="sm:block hidden">Vista 2</span>
                </NavLink>
            </div>
        </nav>
    )
}
