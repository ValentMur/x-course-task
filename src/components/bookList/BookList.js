import {useState, useEffect} from 'react';
import { useNavigate, Link} from 'react-router-dom';

import BookService from '../../services/BookService';
import notFound from '../../assets/img/imageNotFound.png';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './bookList.scss';



const BookList = (props) => {
    const [bookList, setBookList] = useState([]);
    const {loading, error, getAllBooks} =BookService();

    const navigate = useNavigate();

    useEffect(() => {
        onRequest();
    }, [])


   const onRequest = () => {
        getAllBooks()
            .then(onBookListLoaded)
    }

    const onBookListLoaded = (bookList) => {
        setBookList(bookList);
    }

    const toSearch = (items, value) => {
        if(value.length === 0) {
            return items;
        }
        return items.filter(item => {
            if(value.length === 1) {
                return item.title[0].toLowerCase() === value.toLowerCase();
            }
            return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
        })
    }

    const toFilter = (items, filter) => {
        switch (filter) {
            case '0-p-15':
                return items.filter(item => item.price < 15 && item.price < 15);
            case '15-p-30':
                return items.filter(item => item.price > 15 && item.price < 30);
            case 'p-30':
                return items.filter(item => item.price > 30);
            default:
                return items;
        }
    }

    function renderItems(arr) {
        const items = arr.map((item) => {     

        let imgStyle = {'objectFit' : 'cover'};
        if (item.image) {
            imgStyle = {'objectFit' : 'unset'}
        }
            
            return (
                <li className="book-label"
                    key={item.id}>
                    <img className="book-label__book-cover" 
                    src={item.image || notFound} 
                    alt={item.title}
                    style={imgStyle}/>
                    <h3 className="book-label__book-name title">
                        {item.title.length > 35 ? item.title.slice(0, 35) + '...' : item.title}
                    </h3>
                    <p className="book-label__book-author plain">
                        {item.author.length > 25 ? item.author.slice(0, 25) + '...' : item.author}
                    </p>
                    <div className="book-label__footer">
                        <div className="book-label__price title fs20">{item.price}$</div>
                        <button className="button button_orange" 
                            onClick={() => navigate(`${item.id}`)}>View</button>
                    </div>
                </li>
            )
        });
        return items;
    }

    const {searchValue, filterValue} = props;
    const itemsAfterSearch = toSearch(bookList, searchValue);
    const itemsAfterFilter = toFilter(itemsAfterSearch, filterValue)
    const itemsForRender = renderItems(itemsAfterFilter);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <ul className="book-list">
            {itemsForRender}
            {errorMessage}
            {spinner}
        </ul>
    )
}

export default BookList;