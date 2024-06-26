import { useState, ChangeEvent, useEffect } from 'react'
import { Country } from '../graphql/inferfaces'
import { useCountriesStore } from '../storage/contriesStore'
import { useQuery } from '@apollo/client'
import { GET_COUNTRIES } from '../graphql/querys'
import { HiAdjustments } from 'react-icons/hi'
import { FiSearch } from 'react-icons/fi'
import ContinentsFilter from './ContinentsFilter'

interface CountriesData {
    countries: Country[]
}

// Algoritmo de Fisher-Yates (Desordenar el array)
const shuffleArray = (array: Country[]) => {
    const newArray = array.slice()
    for (let i = newArray.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
}

export default function SearchBar() {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchName] = useState<string>('')
    const { setCountries, searchCountries, clearFilteredCountries, countries, filteredCountries } =
        useCountriesStore()
    const { data } = useQuery<CountriesData>(GET_COUNTRIES)

    const handleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value)
    }

    useEffect(() => {
        if (data && countries.length === 0) {
            const shuffleCountries = shuffleArray(data.countries)
            setCountries(shuffleCountries)
        }
    }, [data, setCountries, countries])

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            searchCountries(searchTerm)
        } else {
            clearFilteredCountries()
        }
    }, [clearFilteredCountries, searchCountries, searchTerm])

    return (
        <div className="flex flex-col sticky top-0 z-40">
            <div className="absolute -top-5 bg-page w-full h-20"></div>
            <div className="flex gap-2">
                <div className="w-full flex items-center gap-3 px-5 py-3 bg-card rounded-lg shadow-sm z-40">
                    <FiSearch className="text-2xl" />
                    <input
                        className="text-lg font-normal outline-none placeholder:text-placeholder w-full"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchName}
                        placeholder="Search countries..."
                    />
                </div>
                <button
                    className="flex justify-center items-center px-4 bg-secondary text-card rounded-lg shadow-sm z-40"
                    onClick={() => setOpen(!open)}>
                    <HiAdjustments className="text-2xl" />
                </button>
            </div>
            <div>
                <ContinentsFilter
                    className={[
                        'transition-all duration-100',
                        open ? '' : 'pointer-events-none opacity-0',
                    ].join(' ')}
                />
            </div>
            {filteredCountries.length === 0 && searchTerm.trim() !== '' && (
                <p className="text-center my-20 text-gray-600 text-xl">
                    No results found for &quot;{searchTerm}&quot;
                </p>
            )}
        </div>
    )
}
