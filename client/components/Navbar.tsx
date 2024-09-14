const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="max-w-[1440px] mx-auto flex justify-between text-2xl font-bold">Rick And Morty</div>
            <div className="flex space-x-4">
                <span></span>
            </div>
        </nav>
    );
}

export default Navbar;