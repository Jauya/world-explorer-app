import { useEffect, useState, useRef, Ref, Dispatch } from 'react'
import { searchImage } from '../services/pixabayService'
import { Hit } from '../services/PixabayInterfaces'
import { Country } from '../graphql/inferfaces'
import { HiMiniHeart } from 'react-icons/hi2'
import { useCountriesStore } from '../storage/contriesStore'
import { IoArrowBack } from 'react-icons/io5'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component'
import noPhoto from '../assets/no-photo.webp'
interface Props {
    country: Country
}

export default function CountryCard({ country }: Props) {
    const [showMore, setShowMore] = useState(false)
    const [hit, setHit] = useState<Hit>()
    const { toggleCountryLiked, countriesLiked } = useCountriesStore()
    const showMoreRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        searchImage({
            q: `${country?.name} ${country?.capital}`,
            category: 'travel',
            image_type: 'photo',
            per_page: 3,
            safesearch: true,
        })
            .then((res) => setHit(res.hits[0]))
            .catch((err) => console.log(err))
    }, [country])

    const isLiked = countriesLiked.some((c) => c.code === country?.code)
    const tags: string[] = hit?.tags ? hit.tags.split(',').map((str) => str.trim()) : ['']

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (showMore && showMoreRef.current && !showMoreRef.current.contains(e.target as Node)) {
            setShowMore(false)
        }
    }

    return (
        <div className="relative" onClick={handleContainerClick}>
            <article className="rounded-lg p-2 pb-3 bg-card flex flex-col gap-2 h-80">
                <button
                    className={[
                        'absolute right-5 top-5 z-30 text-2xl',
                        isLiked ? 'text-secondary/90' : 'text-gray-600/70',
                    ].join(' ')}
                    onClick={(e) => {
                        e.stopPropagation()
                        toggleCountryLiked(country)
                    }}>
                    <HiMiniHeart />
                </button>
                <div
                    onClick={() => setShowMore(true)}
                    className="hover:cursor-pointer rounded-lg overflow-hidden w-full aspect-[3/2] relative">
                    <LazyLoadImage
                        src={hit ? hit.webformatURL : noPhoto}
                        className="absolute w-full h-full object-cover"
                        alt={`${country?.name} Photo`}
                    />
                    <div className="w-full h-full object-cover absolute bg-slate-400/10"></div>
                </div>
                <div className="flex flex-col justify-between h-1/3">
                    <div className="flex font-normal items-center gap-2">
                        <div className="relative flex items-center justify-center">
                            <LazyLoadImage
                                className="rounded-full object-cover aspect-square h-8"
                                src={`https://flagcdn.com/w80/${country?.code.toLocaleLowerCase()}.png`}
                                alt={`${country?.name} - ${country?.code}`}
                            />
                            <div className="rounded-full absolute w-full h-full object-cover bg-slate-800/5"></div>
                        </div>
                        <div className="xl:w-64 lg:w-60 md:w-44">
                            <div className="block overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                                {country?.name},{' '}
                                <span className="font-medium">{country?.continent.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600 px-2">
                        {`${country?.capital || ''} ${tags[0] !== '' ? `(${tags[0]})` : ''}`}
                    </div>
                </div>
                {showMore && (
                    <InfoCountryCard
                        country={country}
                        hit={hit}
                        setShowMore={setShowMore}
                        tags={tags}
                        showMoreRef={showMoreRef}
                    />
                )}
            </article>
        </div>
    )
}
const InfoCountryCard = ({
    showMoreRef,
    hit,
    country,
    setShowMore,
    tags,
}: {
    showMoreRef: Ref<HTMLDivElement>
    hit: Hit | undefined
    country: Country
    setShowMore: Dispatch<React.SetStateAction<boolean>>
    tags: string[]
}) => (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex sm:justify-end sm:items-end sm:px-10 max-sm:bg-page max-sm:p-6">
        <LazyLoadComponent>
            <div
                ref={showMoreRef}
                className="sm:absolute bg-card p-4  sm:w-[400px] sm:h-[600px]
        h-full w-full max-sm:rounded-lg rounded-t-lg overflow-hidden sm:bottom-0 sm:right-15 shadow flex flex-col gap-5">
                <div className=" rounded-lg overflow-hidden w-full h-3/5 aspect-[5/4] relative">
                    <LazyLoadImage
                        src={hit ? hit.webformatURL : noPhoto}
                        className="absolute w-full h-full object-cover"
                        alt={`${country?.name} Photo`}
                    />
                    <div className="w-full h-full object-cover absolute bg-slate-300/10"></div>
                    <div
                        onClick={() => setShowMore(false)}
                        className="absolute top-5 left-4 hover:cursor-pointer hover:bg-card/90 bg-card/60 rounded-full p-2 transition-colors duration-100 ease-linear">
                        <IoArrowBack className="text-2xl text-primary/80" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-between h-2/5">
                    <div className="block overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
                        {`${country?.capital} ${tags[0] !== '' ? `(${tags[0]})` : ''}`}
                    </div>
                    <ul className="flex flex-col sm:gap-1 gap-3">
                        <li className="flex gap-3 sm:gap-1 flex-wrap">
                            <span className="px-2 py-1 rounded-lg bg-page">
                                Name: {country?.name}
                            </span>
                            <span className="px-2 py-1 rounded-lg bg-page">
                                Capital: {country?.capital}
                            </span>
                        </li>
                        <li className="flex gap-3 sm:gap-1 flex-wrap">
                            <span className="px-2 py-1 rounded-lg bg-page">
                                Lenguages: {country?.languages[0].name}
                            </span>
                            <span className="px-2 py-1 rounded-lg bg-page">
                                Code: {country?.code}
                            </span>
                        </li>
                        <li className="flex gap-3 sm:gap-1 flex-wrap">
                            <span className="px-2 py-1 rounded-lg bg-page">
                                Phone: +{country?.phones[0]}
                            </span>
                            <span className="px-2 py-1 rounded-lg bg-page">
                                Currency: {country?.currencies[0]}
                            </span>
                        </li>
                        <li className="flex gap-3 sm:gap-2 flex-wrap mt-2">
                            {country?.states.length > 0 && (
                                <span
                                    className="   flex flex-wrap gap-2
                        ">
                                    <span className="p-1">States:</span>
                                    {country?.states.slice(0, 2).map((state) => (
                                        <span
                                            className="bg-page px-2 py-1 rounded-lg"
                                            key={state.name}>
                                            {state.name}
                                        </span>
                                    ))}
                                </span>
                            )}
                        </li>
                    </ul>
                    <div className="flex font-normal items-center gap-2">
                        <div className="relative flex items-center justify-center">
                            <LazyLoadImage
                                className="rounded-full object-cover aspect-square h-8"
                                src={`https://flagcdn.com/w80/${country?.code.toLocaleLowerCase()}.png`}
                                alt={`${country?.name} - ${country?.code}`}
                            />
                            <div className="rounded-full absolute w-full h-full object-cover bg-slate-800/5"></div>
                        </div>
                        <div className="">
                            <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                                {country?.name}, {country?.continent.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LazyLoadComponent>
    </div>
)
export const LoadingCountryCard = () => (
    <article className="rounded-lg p-2 pb-3 bg-card flex flex-col gap-2 h-80">
        <div className="rounded-lg overflow-hidden w-full aspect-[3/2] relative">
            <div className="absolute w-full h-full object-cover bg-slate-400 animate-pulse" />
        </div>
        <div className="flex flex-col justify-between h-1/3">
            <div className="bg-slate-200 rounded-md flex gap-2 text-lg font-bold w-72 h-6"></div>
            <div className="flex font-normal items-center gap-2">
                <div className="rounded-full bg-slate-100 aspect-square h-8"></div>
                <span className="w-52 h-5 bg-slate-200 rounded-md"></span>
            </div>
        </div>
    </article>
)
