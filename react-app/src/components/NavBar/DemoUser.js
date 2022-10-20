import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import './DemoUser.css'

const DemoUser = ({ setShowLoginModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginDemoUser = async (e) => {
        e.preventDefault();
        // const demoCredentials = {
        //     email: 'demo@aa.io',
        //     password: 'password'
        // }
        const demoEmail = 'demo@aa.io';
        const demoPassword = 'password'
        let loggedInDemo = await dispatch(login(demoEmail, demoPassword))
        setShowLoginModal(false);
        history.push('/')
    }

    return (
        <div className="demo-user-div">
            <button onClick={loginDemoUser} className='demo-user-button'>Login as demo user</button>
        </div>
    )
}

export default DemoUser;
