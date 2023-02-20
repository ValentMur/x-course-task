import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './signIn.scss';
import avatar from '../../assets/img/avatar.png';

const SignIn = (props) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        props.onAuthorization(username)
        navigate("/x-course-task/books");
    }

    return (
        <div className="sign-in">
            <div className="sign-in__avatar">
                <img src={avatar} alt="user avatar"/>
            </div>

            <form className="sign-in__form" onSubmit = {onSubmit}>
                <label htmlFor="username" className="title">Username</label>
                <input className=" plain fs18"
                    type="text"
                    id="username"
                    placeholder="type Username"
                    name="username"
                    value={username} 
                    onChange={e => setUsername(e.target.value.trim())}
                    maxLength={16}
                    minLength={4}/>
                <button type="submit"
                    className="button button_orange button_sign-in"
                    disabled={username.length > 3 && username.length < 16 ? false: true}>Sign-In
                </button>
            </form>
        </div>
    )
}

export default SignIn;