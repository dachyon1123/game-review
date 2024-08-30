import { useEffect, useState } from "react"

import NewGames from "../components/NewGames";
import YourGames from "../components/YourGames";

import { GameInterface } from "../interfaces/interfaces"

export default function HomePage() {

    const [newGames, setNewGames] = useState<GameInterface[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3002/api/oauth2/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setNewGames(data)
            })
    }, [])

    return (
        <main className="bg-black h-full">
            <YourGames />
            <NewGames games={newGames} />
        </main>
    )
}