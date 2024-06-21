import { AxiosResponse } from 'axios'
import { PixabayParams, PixabayResponse } from './PixabayInterfaces'
import pixabayApi from '../axiosConfig'

export const searchImage = async (params: PixabayParams): Promise<PixabayResponse> => {
    const response: AxiosResponse<PixabayResponse> = await pixabayApi.get('', {
        params: {
            ...params,
        },
    })
    return response.data
}
