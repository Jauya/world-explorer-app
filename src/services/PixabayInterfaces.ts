export interface PixabayParams {
    q: string
    image_type: 'all' | 'photo' | 'illustration' | 'vector'
    per_page: number
    safesearch: boolean
    category:
        | 'backgrounds'
        | 'fashion'
        | 'nature'
        | 'science'
        | 'education'
        | 'feelings'
        | 'health'
        | 'people'
        | 'religion'
        | 'places'
        | 'animals'
        | 'industry'
        | 'computer'
        | 'food'
        | 'sports'
        | 'transportation'
        | 'travel'
        | 'buildings'
        | 'business'
        | 'music'
}

export interface PixabayResponse {
    total: number
    totalHits: number
    hits: Hit[]
}

export interface Hit {
    id: number
    pageURL: string
    type: string
    tags: string
    previewURL: string
    previewWidth: number
    previewHeight: number
    webformatURL: string
    webformatWidth: number
    webformatHeight: number
    largeImageURL: string
    imageWidth: number
    imageHeight: number
    imageSize: number
    views: number
    downloads: number
    collections: number
    likes: number
    comments: number
    user_id: number
    user: string
    userImageURL: string
}
