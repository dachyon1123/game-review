import { GameInterface } from "../interfaces/interfaces";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';



interface newGamesInterface {
    games: GameInterface[] | null;
}

export default function NewGames({ games }: newGamesInterface) {
    console.log(games); // Debugging: Check games data

    return (
        <>
            <Swiper
                slidesPerView={9}
                spaceBetween={0}
                className="bg-slate-700 mx-32"
            >
                {games ?
                    games.map((game) => (
                        <SwiperSlide className="my-auto py-4">
                            <div className="flex flex-col items-center group relative">
                                <img src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${game?.cover?.image_id}.jpg`} alt={game.name} className="max-w-[150px]" />
                                <h1 className="text-white text-[12px] text-center justify truncate max-w-[100px]">{game.name}</h1>
                                <div className="text-white bg-slate-700 z-10 hidden group-hover:block absolute bottom-0 text-center text-wrap text-[12px]">{game.name}</div>
                            </div>
                        </SwiperSlide>

                    ))
                    :
                    <p>No games</p>
                }
            </Swiper>
        </>
    )

}


// <Link to={`/games/${game.id}`} className="" key={game.id}>
//     <h3 className="text-white text-[12px]">{game.name}</h3>
// </Link>