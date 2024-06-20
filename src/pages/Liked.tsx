import CountryCard from '../components/CountryCard'
import { useCountriesStore } from '../storage/contriesStore'

export default function Liked() {
    const { countriesLiked } = useCountriesStore()

    return (
        <div className="p-5 w-full h-full overflow-x-hidden overflow-y-scroll" id="infinite-scroll">
            <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-4">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2">
                    {countriesLiked.length > 0 ? (
                        countriesLiked.map((country) => (
                            <CountryCard key={country.code} country={country} />
                        ))
                    ) : (
                        <div className="text-3xl font-medium">Add to see results</div>
                    )}
                </div>
            </div>
        </div>
    )
}
