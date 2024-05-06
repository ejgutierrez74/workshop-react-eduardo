
import { Link } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import logo from "../assets/spacex-logo.png";

export function NavBar() {
    return (
        <nav className="navbar">
            <Link to={"/"}>
                <Image src={logo} width={300} height='auto' />
            </Link>
            <Link to={"/missions"}>
                <li className="nav-list">Missions</li>
            </Link>
            <Link to={"/about"}>
                <li className="nav-list">About</li>
            </Link>
            <div className="rightNav">
                <input type="text" name="search"
                    id="search" placeholder="Search"/>
                    <button className="btn btn-sm">Search</button>
            </div>

        </nav>
    )
}

/*
<nav class="navbar">
    <ul class="nav-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
    
</nav>
*/