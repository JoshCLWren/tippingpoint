import React from 'react';
import "./main.css";
import LoginButton from './LogInButton'
import LogoutButton from './LogOutButton';
import Profile from './Profile'


const Header = () => {

    return(
        <div className="header">
            <div className="hero-text">
            <div><h1>Trip Calculator</h1></div>
            <div><h2>'The Pivotal Point'</h2></div>
            </div>
            <LoginButton />
            <LogoutButton />
            <Profile />
        </div>

    )
}

export default Header