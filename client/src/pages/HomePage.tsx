import { useEffect, useState } from "react"



export default function HomePage() {

    const [games, setGames] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/oauth2/token', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            setGames(data);
            console.log(data)
        })
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        console.log(games)
    }, [games])

    return (
        <main>

        </main>
    )
}