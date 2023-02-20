import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../mobileMenu/MobileMenu";

import cart from '../../assets/img/cart.svg';
import avatar from '../../assets/img/avatar.png';
import burgerBtn from '../../assets/img/bars-solid.svg';
import './navigation.scss';

const Navigation = (props) => {
    const [menuDisplay, setMenuDisplay] = useState(false);

    const onBurgerBtn = () => {
        setMenuDisplay(!menuDisplay)
    }

    const clazz = !menuDisplay ? "" : "nav__burger-button_active";

    return (
        <nav className="nav">
            {/* Desktop menu */}
            <ul className="nav__nav-list">
                <li>
                    <Link to="/x-course-task/cart" className="nav__cart-link">
                        <img src={cart} alt="cart icon"/>
                    </Link>
                </li>
                <li>
                    <Link to="/x-course-task" 
                        className="nav__signout-link button" 
                        onClick={() => props.onAuthorization("")}>Sign-Out</Link>
                </li>
                <li>
                    <div className="nav__profile-link">
                        <img src={avatar} alt="user avatar"/>
                        <div className="plain fs18">{props.username}</div>
                    </div>
                </li>
            </ul>
        
            <button className={`nav__burger-button ${clazz}`} onClick={onBurgerBtn}>
                <img src={burgerBtn} alt="menu button"/>
            </button>
            {/* Mobile menu */}
            {menuDisplay ? <MobileMenu username={props.username} onAuthorization={props.onAuthorization}/> : null}
        </nav>
    )
}



export default Navigation;