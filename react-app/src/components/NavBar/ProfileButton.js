import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ sessionUser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const loggingOut = async (e) => {
        e.preventDefault();
        let loggedOut = await dispatch(logout());
        if (loggedOut) {
            history.push('/')
        };
    };

    return (
        <>
            <button onClick={openMenu} className="profile-dropdown">
                <div>
                    <i className="fas fa-user-circle" />
                </div>
                <div>profile button</div>
            </button>
            {showMenu && sessionUser && (
                <ul className="profile-details">
                    <li className="profile-details-li">
                        <div>{sessionUser.firstname}</div>
                    </li>
                    <li className="profile-details-li">
                        <NavLink to='/products/new' className='new-product-link'>Sell on ktsy</NavLink>
                    </li>
                    <li className="profile-details-li">
                        <div className="signout-div" onClick={loggingOut}>Sign out</div>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ProfileButton;
