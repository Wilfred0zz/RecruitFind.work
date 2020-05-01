import React  from 'react';
import './static/css/NavigationBar.css';

const NavBar = props => (
    <header className='navbar'>
        <nav className='navbar-options'>
            <div></div>
            <div className='navbar-items'>
                <ul>
                    <li><a href='/'>HomePage</a></li>
                    <li><a href='/'> About</a></li>
                    <li><a href='/'>Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default NavBar;