import React  from 'react';
import './static/css/NavigationBar.css';
import Logo from './static/images/text.jpeg';

const MainNavBar = props => (
    <header className='navbar'>
        <nav className='navbar-options'>
            <div className='navbar-items'>
                <ul>
                    <li ><a><img className="main_logo" src={Logo} alt="logo"></img></a></li>
                    <li><a href='/'>HomePage</a></li>
                    <li><a href='/about_us'> About</a></li>
                    <li><a href='/'>Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default MainNavBar;