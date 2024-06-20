import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CountryCard from '../components/CountryCard'
import SearchBar from '../components/SearchBar'
import { useCountriesStore } from '../storage/contriesStore'
import { Country } from '../graphql/inferfaces'

export default function Home() {
    const { countries, filteredCountries } = useCountriesStore()
    const [currentItems, setCurrentItems] = useState<Country[]>([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const itemsPerPage = 20
    const limitItems = 100

    useEffect(() => {
        if (countries.length == 0) {
            setLoading(true)
        }
        setCurrentItems(countries.slice(0, itemsPerPage))
        setTimeout(() => setLoading(false), 100)
    }, [countries])

    const loadMoreItems = () => {
        if (currentItems.length <= limitItems) {
            setTimeout(() => {
                const next = countries.slice(
                    currentItems.length,
                    currentItems.length + itemsPerPage
                )
                setCurrentItems((prev) => [...prev, ...next])
            }, 500)
        } else {
            setHasMore(false)
        }
    }

    return (
        <div className="p-5 w-full h-full overflow-x-hidden overflow-y-scroll" id="infinite-scroll">
            <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-4">
                <SearchBar />
                <div
                    className={[
                        'grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2',
                        loading ? '' : 'hidden',
                    ].join(' ')}>
                    {currentItems.map((country) => (
                        <CountryCard key={country.code} country={country} loading={true} />
                    ))}
                </div>
                <div className={['', filteredCountries.length > 0 ? '' : 'hidden'].join(' ')}>
                    <span className="p-2">{filteredCountries.length} Related results</span>
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2">
                        {filteredCountries.slice(0, itemsPerPage).map((country) => (
                            <CountryCard key={country.code} country={country} />
                        ))}
                    </div>
                </div>
                <h2
                    className={[
                        'p-2 text-2xl font-medium',
                        filteredCountries.length == 0 ? '' : 'hidden',
                    ].join(' ')}>
                    Most popular
                </h2>
                <InfiniteScroll
                    className={['', filteredCountries.length == 0 ? '' : 'hidden'].join(' ')}
                    dataLength={currentItems.length}
                    next={loadMoreItems}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more countries to load</p>}
                    scrollableTarget="infinite-scroll">
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        {currentItems.map((country) => (
                            <CountryCard key={country.code} country={country} />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}
