import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


import SimilarGames from "../components/SimilarGames";
import Screenshots from "../components/Screenshots";

import { GameInterface, InvolvedCompanies, CompanyInfo } from "../interfaces/interfaces";

import seventyFivePlusRatingSvg from '../assets/svgs/80_100.svg';
import fiftyToSeventyFourRatingSvg from '../assets/svgs/50_74.svg';
import twentyFiveToFortyNineSvg from '../assets/svgs/25_49.svg'
import zeroToTwentyFourSvg from '../assets/svgs/0_24.svg'


export default function GamePage() {

    const [game, setGame] = useState<GameInterface | null>(null);
    const [companyArr, setCompanyArr] = useState<CompanyInfo[]>([]);
    const [releaseDate, setReleaseDate] = useState<string>();
    const [ratingSvg, setRatingSvg] = useState<string>('');

    const { id } = useParams();

    function handleRatingSvg(rating: number) {
        if (Math.round(rating) >= 75) {
            setRatingSvg(seventyFivePlusRatingSvg)
        } else if (Math.round(rating) < 75 && Math.round(rating) >= 50) {
            setRatingSvg(fiftyToSeventyFourRatingSvg)
        } else if (Math.round(rating) < 50 && Math.round(rating) >= 25) {
            setRatingSvg(twentyFiveToFortyNineSvg)
        } else if (Math.round(rating) < 25) {
            setRatingSvg(zeroToTwentyFourSvg)
        }
    }

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
                    let companies;
                    if ('involved_companies' in data[0]) {
                        companies = data[0].involved_companies

                        if (companies.length > 1) {
                            setCompanyArr(
                                companies.map((compObj: InvolvedCompanies) => compObj.company)
                            )
                        } else if (companies.length === 1) {
                            console.log('Length === 1')
                            setCompanyArr([companies[0]])
                        } else {
                            console.log("No companies found")
                        }
                    }
                    handleRatingSvg(data[0].rating)

                    
                }
            })
    }, [id])

    useEffect(() => {
        let unixTimeStamp = game?.first_release_date;

        if (!unixTimeStamp) {
            setReleaseDate('No Release Date Found')
            return
        }

        let dateObj = new Date(unixTimeStamp * 1000);
        let utcString = dateObj.toUTCString();

        setReleaseDate(utcString)
    }, [game])

    useEffect(() => {
        console.log(game?.cover?.game_localization)
    }, [game])

    return (
        <>

            {game ?
                <main className="flex flex-col">
                    <section className="grid grid-cols-7 bg-black text-white pt-10">
                        <div className="col-start-3 mr-4">
                            {game.cover?.image_id ?
                                <img className="" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt="" />
                                :
                                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big`} alt="" />
                            }
                        </div>
                        <div className="col-start-4 col-end-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-end justify-between gap-2">
                                    <h1 className="text-3xl">{game.name}</h1>
                                    <div className="flex gap-2">
                                        <img src={ratingSvg} alt="" />
                                        <p>{Math.round(game.rating)}/100</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-[1px] text-[12px] w-full flex-wrap">
                                    <p className="text-nowrap">Created By:</p>
                                    {
                                        companyArr.length === 1 ?
                                            <p>{companyArr[0].company?.name}</p>
                                            :
                                            companyArr.map((e, index) => {
                                                if (index != companyArr.length - 1) {
                                                    return <p key={index} className="text-nowrap">{e.name},</p>
                                                } else if (companyArr.length === 1) {
                                                    return <p key={index} className="text-nowrap">{e.name}</p>
                                                } else {
                                                    return <p key={index} className="text-nowrap">{e.name}</p>
                                                }
                                            })
                                    }
                                </div>
                                <div className="flex gap-4 pt-2">
                                    {game?.genres?.map((e) => {
                                        return (
                                            <p key={game.id} className="border-[2px] border-slate-300 rounded-sm p-1 text-[12px] text-center min-w-[75px] max-w-[200px]">{e.name}</p>
                                        )
                                    })}
                                </div>
                            </div>


                            <div>
                                <h4 className="text-xl underline underline-offset-8">Summary</h4>
                                <p className="pt-2">
                                    {game.summary}
                                </p>
                            </div>
                            <p className="italic">
                                Release Date: {releaseDate}
                            </p>
                        </div>


                        {game.storyline ?
                            <div className="bg-black text-white col-start-3 col-end-6 pt-6">
                                <h1 className="text-2xl underline underline-offset-8">Storyline</h1>
                                <p className="pt-2.5">
                                    {game.storyline}
                                </p>
                            </div>
                            :
                            <div className="bg-black text-white col-start-3 col-end-6 pt-6">
                               
                            </div>
                        }

                    </section>

                    <section className="flex justify-center bg-black pt-20">
                        <Screenshots game={game} />
                    </section>

                    <section className=" bg-black pt-20">
                        <SimilarGames game={game} />
                    </section>

                </main>
                :
                <p>Loading....</p>}
        </>
    )
}

