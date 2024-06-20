import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import DefaultLayout from './layouts/DefaultLayout'
import Vista2 from './pages/Vista2'
import Liked from './pages/Liked'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/Liked',
                element: <Liked />,
            },
            {
                path: '/vista-2',
                element: <Vista2 />,
            },
        ],
    },
])
