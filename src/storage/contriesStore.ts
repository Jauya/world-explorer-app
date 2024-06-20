import { create } from 'zustand'
import { Country } from '../graphql/inferfaces'

interface CountriesState {
    countriesLiked: Country[]
    toggleCountryLiked: (country: Country) => void
    countries: Country[]
    filteredCountries: Country[]
    continentsFilter: string[]
    setCountries: (countries: Country[]) => void
    toggleContinentFilter: (continent: string) => void
    clearContinentFilter: () => void
    clearFilteredCountries: () => void
    searchCountries: (searchTerm: string) => void
}

const calculateRelevance = (countryName: string, searchName: string) => {
    if (countryName.toLowerCase() === searchName.toLowerCase()) return 3
    if (countryName.toLowerCase().startsWith(searchName.toLowerCase())) return 2
    if (countryName.toLowerCase().includes(searchName.toLowerCase())) return 1
    return 0
}

const loadCountriesLikedFromLocalStorage = (): Country[] => {
    const storedData = localStorage.getItem('countriesLiked')
    return storedData ? (JSON.parse(storedData) as Country[]) : []
}
const initialCountriesLiked: Country[] = loadCountriesLikedFromLocalStorage()

export const useCountriesStore = create<CountriesState>((set) => ({
    countriesLiked: initialCountriesLiked,
    setCountriesLiked: [],
    countries: [],
    filteredCountries: [],
    continentsFilter: [],
    setCountries: (countries) => set({ countries }),
    clearFilteredCountries: () => set({ filteredCountries: [] }),
    toggleContinentFilter: (continent) =>
        set((state) => ({
            continentsFilter: state.continentsFilter.includes(continent)
                ? state.continentsFilter.filter((c) => c !== continent)
                : [...state.continentsFilter, continent],
        })),
    clearContinentFilter: () => set({ continentsFilter: [] }),

    searchCountries: (searchTerm) => {
        const normalizedSearchTerm = searchTerm.toLowerCase().trim()
        set((state) => {
            const isContinentFilterActive = state.continentsFilter.length > 0

            const filteredByContinent = isContinentFilterActive
                ? state.countries.filter((country) =>
                      state.continentsFilter.includes(country.continent.code)
                  )
                : state.countries

            const filteredBySearchTerm = filteredByContinent.filter((country) =>
                country.name.toLowerCase().includes(normalizedSearchTerm)
            )

            const sortedByRelevance = filteredBySearchTerm.sort(
                (a, b) =>
                    calculateRelevance(b.name, searchTerm) - calculateRelevance(a.name, searchTerm)
            )

            return { filteredCountries: sortedByRelevance }
        })
    },

    toggleCountryLiked: (country: Country) => {
        set((state) => {
            const isLiked = state.countriesLiked.some((c) => c.code === country.code)
            const updatedLikedCountries = isLiked
                ? state.countriesLiked.filter((c) => c.code !== country.code)
                : [...state.countriesLiked, country]

            localStorage.setItem('countriesLiked', JSON.stringify(updatedLikedCountries))

            return { countriesLiked: updatedLikedCountries }
        })
    },
}))
