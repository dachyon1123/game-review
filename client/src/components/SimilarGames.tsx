import { useEffect, useState } from "react";
import { GameInterface } from "../interfaces/interfaces";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


interface SimilarGamesProps {
    game: GameInterface | null,
}

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


export default function SimilarGames({ game }: SimilarGamesProps) {
    const [similarGamesList, setSimilarGamesList] = useState<GameInterface[]>([])

    const similarGameIds = game?.similar_games;

    useEffect(() => {
        fetch('http://localhost:3002/api/oauth2/token/game/', {
            method: 'POST',
            body: JSON.stringify(similarGameIds),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSimilarGamesList(data)
            })
    }, [game])

    // useEffect(() => {
    //     console.log(similarGamesList)
    // }, [similarGamesList])

    return (
        <>
            {game ?
                <Carousel
                    responsive={responsive}
                    className="flex">
                    {similarGamesList.map((game) => {
                        return (
                                <Link to={`/games/${game.id}`} className="flex flex-col justify-center gap-2 px-10" key={game.id}>
                                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover?.image_id}.jpg`} alt="" />
                                    <h3 className="text-white text-xl text-center pt-2">{game.name}</h3>
                                </Link>
                        )
                    })}
                </Carousel>
                :
                <p>No games</p>
            }
        </>
    )
}