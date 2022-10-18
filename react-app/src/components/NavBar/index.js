import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpFormModal from './SignUpModal';
import LoginFormModal from './SignInModal';

function NavBar({ loaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    return (
        <div className='navbar'>
            <div className='nav-left'>
                <NavLink exact to="/" className='home-link'>
                    <div className='logo-div'>
                        Logo goes here
                    </div>
                </NavLink>
            </div>
            <div className='searchbar-div'>

            </div>
            <div className='nav-right'>
                <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
                <SignUpFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />
            </div>
        </div>
    )
}

export default NavBar;
