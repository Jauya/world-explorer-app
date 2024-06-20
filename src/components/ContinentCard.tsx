import { useEffect, useState } from 'react'
import { searchImage } from '../services/pixabayService'
import { Hit } from '../services/PixabayInterfaces'
import { Continent } from '../graphql/inferfaces'
import { useCountriesStore } from '../storage/contriesStore'

interface Props {
    continent: Continent
    continentsFilter: string[]
}

export default function ContinentCard({ continent, continentsFilter }: Props) {
    const [selected, setSelected] = useState<boolean>(false)
    const { toggleContinentFilter, searchCountries } = useCountriesStore()
    const [hit, setHit] = useState<Hit | undefined>()

    useEffect(() => {
        searchImage({
            q: `${continent.name}`,
            category: 'buildings',
            image_type: 'photo',
            per_page: 3,
            safesearch: true,
        })
            .then((res) => setHit(res.hits[0]))
            .catch((err) => console.log(err))
    }, [continent.name])

    useEffect(() => {
        setSelected(continentsFilter.some((cf) => cf === continent.code))
    }, [continentsFilter, continent])

    return (
        <button
            className={[
                'rounded-lg w-full h-full overflow-hidden relative flex',
                selected ? 'border border-secondary' : '',
            ].join(' ')}
            onClick={() => {
                setSelected(!selected)
                toggleContinentFilter(continent.code)
                searchCountries('')
            }}
        >
            <img
                className="w-full h-full"
                src={hit?.webformatURL ? hit.webformatURL : '/images/no-photo.webp'}
                alt={`Image of ${continent.name}`}
            />
            <div
                className={[
                    'absolute object-cover w-full h-full',
                    selected ? 'bg-slate-700/20 saturate-150' : 'bg-slate-900/50',
                ].join(' ')}
            ></div>
            <div
                className={['absolute bottom-0 p-3', selected ? 'text-card' : 'text-gray-300'].join(
                    ' '
                )}
            >
                {continent.name}
            </div>
        </button>
    )
}
