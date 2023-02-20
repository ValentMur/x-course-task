import './mobileMenu.scss';
import { Link } from 'react-router-dom';

const MobileMenu = (props) => {
    return (
        <ul className="mobile-menu fs20">
            <li>
                <div className="title fs20">{props.username}</div>
            </li>
            <li>
                <Link to="/x-course-task/cart">Cart</Link>
            </li>
            <li>
                <Link to="/x-course-task" onClick={() => props.onAuthorization("")}>Sign-Out</Link>
            </li>
        </ul>
    )
}

export default MobileMenu;