/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_PIXABAY_API: string
    readonly VITE_PIXABAY_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
