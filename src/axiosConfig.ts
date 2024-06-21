import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { PixabayResponse } from './services/PixabayInterfaces'

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000

const pixabayApi = axios.create({
    baseURL: import.meta.env.VITE_PIXABAY_API,
    params: {
        key: import.meta.env.VITE_PIXABAY_KEY,
    },
})
const cache = new Map<string, { data: PixabayResponse; timestamp: number }>()

const loadCacheFromLocalStorage = () => {
    const storedCache = localStorage.getItem('pixabayCache')
    if (storedCache) {
        try {
            const parsedCache: Record<string, { data: PixabayResponse; timestamp: number }> =
                JSON.parse(storedCache) as Record<
                    string,
                    { data: PixabayResponse; timestamp: number }
                >

            Object.entries(parsedCache).forEach(([key, value]) => {
                if (
                    typeof value === 'object' &&
                    'timestamp' in value &&
                    'data' in value &&
                    Date.now() - value.timestamp < CACHE_EXPIRATION_TIME
                ) {
                    cache.set(key, value)
                }
            })
        } catch (e) {
            console.error('Error al parsear la caché del localStorage:', e)
        }
    }
}

// Guardar la caché en el localStorage
const saveCacheToLocalStorage = () => {
    const cacheObject = Object.fromEntries(cache.entries())
    localStorage.setItem('pixabayCache', JSON.stringify(cacheObject))
}

loadCacheFromLocalStorage()

pixabayApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        if (config.url && cache.has(config.url)) {
            const cachedResponse = cache.get(config.url)
            const now = Date.now()
            if (cachedResponse && now - cachedResponse.timestamp < CACHE_EXPIRATION_TIME) {
                return Promise.resolve({
                    ...config,
                    data: cache.get(config.url),
                })
            } else {
                cache.delete(config.url)
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
interface AxiosResponseWithPixabayData extends AxiosResponse {
    data: PixabayResponse
}
pixabayApi.interceptors.response.use(
    (response: AxiosResponseWithPixabayData) => {
        if (response.config.url) {
            const now = Date.now()
            const cachedResponse = cache.get(response.config.url)

            const responseData: PixabayResponse = response.data

            if (
                !cachedResponse ||
                JSON.stringify(cachedResponse.data) !== JSON.stringify(responseData)
            ) {
                cache.set(response.config.url, { data: responseData, timestamp: now })
                saveCacheToLocalStorage()
            }
        }
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default pixabayApi
