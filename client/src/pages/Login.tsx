
export default function LoginPage() {

    function oAuth() {
        fetch('http://localhost:3000/oauth2/token', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    return (
        <main className="flex flex-col justify-center items-center">
            <h1>Welcome! Please Login!</h1>
            <button className="btn btn-wide" onClick={oAuth}>Login</button>

        </main>
    )
}