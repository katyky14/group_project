import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpFormModal from './SignUpModal';
import LoginFormModal from './SignInModal';
import ProfileButton from './ProfileButton';
import Searchbar from './Searchbar';
import './Navbar.css'

function NavBar({ loaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const loginButton = () => {

    }


    return (
        <div className='navbar'>
            <div className='nav-left'>
                <NavLink exact to="/" className='home-link'>
                    <div className='logo-div'>
                        Logo goes here
                    </div>
                </NavLink>
            </div>
            <div className='searchbar-container'>
                <Searchbar />
            </div>
            <div className='nav-right'>
                {!sessionUser && (
                    <div className='login-signup'>
                        <div onClick={() => setShowLoginModal(true)} className='user-auth-div'>
                            <p className='user-auth-text'>Log In</p>
                        </div>
                        <div onClick={() => setShowSignUpModal(true)} className='user-auth-div'>
                            <p className='user-auth-text'>Sign Up</p>
                        </div>
                    </div>
                )}
                {sessionUser && (
                    <div>
                        <ProfileButton sessionUser={sessionUser} />
                    </div>
                )}
            </div>
            <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
            <SignUpFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />
        </div>
    )
}

export default NavBar;
