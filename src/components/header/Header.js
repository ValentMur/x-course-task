import './header.scss';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className="header">
            <h1 className="header__name">
                <Link to="/x-course-task/books" className="header__link">js band store</Link>
                / Valentyn Muratkov
            </h1>
            {props.children}
        </header>
    )
}

export default Header;