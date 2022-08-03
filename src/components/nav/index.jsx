import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/home">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav