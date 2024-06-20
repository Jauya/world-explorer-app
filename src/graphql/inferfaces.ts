export interface Continent {
    name: string
    code: string
}

export interface Country {
    name: string
    code: string
    capital: string
    awsRegion: string
    currencies: string[]
    phones: string[]
    languages: { name: string }[]
    states: { name: string }[]
    continent: Continent
}
