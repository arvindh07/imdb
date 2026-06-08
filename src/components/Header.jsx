import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <div className="flex px-12 py-3 border-b border-yellow-400 items-center justify-between">
            <h2 className="text-2xl bg-yellow-300 px-4 py-2 rounded-xl font-extrabold tracking-widest">IMDb</h2>
            <div className="flex space-x-4 items-center font-sans">
                <NavLink to="/" className={({ isActive }) =>
                    isActive
                        ? "font-semibold underline underline-offset-4 decoration-yellow-400"
                        : ""
                }>Home</NavLink>
                <NavLink to="/watchlist" className={({ isActive }) =>
                    isActive
                        ? "font-semibold underline underline-offset-4 decoration-yellow-400"
                        : ""
                }>Watchlist</NavLink>
            </div>
        </div>
    )
}

export default Header