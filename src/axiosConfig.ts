import axios from 'axios'

export const pixabayApi = axios.create({
    baseURL: import.meta.env.VITE_PIXABAY_API,
    params: {
        key: import.meta.env.VITE_PIXABAY_KEY,
    },
})
