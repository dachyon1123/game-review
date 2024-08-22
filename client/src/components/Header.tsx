import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"

interface SearchList {
    id: number,
    name: string,
}



export default function Header() {

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useOutsideAlert(wrapperRef)

    const [search, setSearch] = useState<string>('');
    const [searchList, setSearchList] = useState<SearchList[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchStyle, setSearchStyle] = useState<string>('lg');

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    useEffect(() => {
        fetch('http://localhost:3002/api/oauth2/token/game-search', {
            method: 'POST',
            body: JSON.stringify({ search }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setSearchList(data)
                setIsOpen(true)
            })
    }, [search])

    function useOutsideAlert(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    setIsOpen(false)
                    setSearchStyle('lg')
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
    
        }, [ref])
    }

    function handleSearchClick() {
        setIsOpen(false)
    }

    useEffect(() => {
        if (isOpen) {
            setSearchStyle('none')
        }
    }, [isOpen])

    return (
        <header className="flex flex-col justify-center items-center py-4 bg-black">
            <h1 className="text-white text-3xl flex">Your Games</h1>
            <div className="relative pt-10 w-1/3 text-white" ref={wrapperRef}>
                <input type="search" name="search" id="search" value={search} onChange={handleSearch} className={`bg-gray-800 border-black p-2 rounded-${searchStyle} focus:outline-none w-full h-[40px]`} />
                <ul className="absolute bg-gray-800 w-full">
                    {searchList.length > 0 && isOpen === true &&
                        searchList.map((e) => (
                            <Link to={`/games/${e.id}`}> 
                                <li key={e.id} className="z-10 pl-[2px] py-1 border-t-black border-b-black border-b-[2px] hover:bg-gray-400" onClick={handleSearchClick}>{e.name}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </header>
    )
}