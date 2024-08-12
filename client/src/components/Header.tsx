export default function Header() {
    return (
        <header className="flex justify-evenly items-center py-4 bg-black">
            <h1 className="text-white text-3xl">Your Games</h1>
            <input type="search" name="search" id="search" className="bg-white border-black p-1 focus:outline-none"/>
        </header>
    )
}