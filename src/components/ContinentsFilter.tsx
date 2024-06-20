import { useQuery } from '@apollo/client'
import { GET_CONTINENTS } from '../graphql/querys'
import { Continent } from '../graphql/inferfaces'
import ContinentCard from './ContinentCard'
import { useCountriesStore } from '../storage/contriesStore'

interface ContinentData {
    continents: Continent[]
}
interface Props {
    className?: string
}
export default function ContinentsFilter({ className }: Props) {
    const { clearContinentFilter, clearFilteredCountries, continentsFilter } = useCountriesStore()
    const { data } = useQuery<ContinentData>(GET_CONTINENTS)
    return (
        <div
            className={[
                'absolute w-full lgs:h-96 bg-card top-16 rounded-lg p-3 shadow-sm transition-all duration-100 font-bold flex flex-col gap-2',
                className,
            ].join(' ')}
        >
            <div className="flex justify-between">
                <span>Explore by Continent</span>
                <button
                    onClick={() => {
                        clearContinentFilter()
                        clearFilteredCountries()
                    }}
                    className="text-sm font-medium mr-2 underline"
                >
                    Clear filter
                </button>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
                {data
                    ? data.continents.map((continent) => (
                          <ContinentCard
                              key={continent.code}
                              continent={continent}
                              continentsFilter={continentsFilter}
                          />
                      ))
                    : 'Loading...'}
            </div>
        </div>
    )
}
