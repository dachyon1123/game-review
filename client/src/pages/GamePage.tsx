import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

interface GameInterface {
    id: number,
    name: string,
    cover: Cover,
    involved_companies: InvolvedCompanies,
    summary: string,
    genres: Genres[]
}

interface Cover {
    id: number,
    image_id: string,
}

interface Genres {
    id: number,
    name: string
}

interface InvolvedCompanies {
    id: number,
    company: CompanyInfo
}

interface CompanyInfo {
    id: number,
    name: string
}

export default function GamePage() {

    const [game, setGame] = useState<GameInterface | undefined>(undefined);
    const [companyArr, setCompanyArr] = useState<CompanyInfo[]>([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3002/api/oauth2/token/game/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.length > 0) {
                    setGame(data[0])
                    const companies = data[0].involved_companies

                    if (companies.length > 1) {
                        setCompanyArr(
                            companies.map((compObj: InvolvedCompanies) => compObj.company)
                        )
                    } else {
                        console.log('Length === 1')
                        setCompanyArr(companies[0])
                    }
                }
            })
    }, [id])

    useEffect(() => {
        console.log("Genres", game?.genres)
    }, [game])

    return (
        <>

            {game ?
                <main className="flex justify-center bg-black text-white pt-18">
                    <div className="w-1/3 flex justify-end">
                        <img className="" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt="" />
                    </div>
                    <div className="w-2/3 pl-10">
                        <div>
                            <h1 className="text-3xl">{game.name}</h1>
                            <div className="flex gap-2 ml-[1px] text-[12px]">
                                {companyArr.map((e) => {
                                    return (
                                        <h1 className="">Created By: {e.name}</h1>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex gap-4 pt-2">
                            {game?.genres.map((e) => {
                                return (
                                    <p className="border-[2px] border-slate-300 rounded-sm p-1 text-[12px] text-center min-w-[75px] max-w-[200px]">{e.name}</p>
                                )
                            })}
                        </div>
                        
                        <p className="w-1/2 pt-10">
                            {game.summary}
                        </p>
                    </div>
                </main>
                :
                <p>Loading....</p>}
        </>
    )
}

