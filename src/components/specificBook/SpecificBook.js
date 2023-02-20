import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BookService from '../../services/BookService';
import notFound from '../../assets/img/imageNotFound.png';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";


import './specificBook.scss';


const SpecificBook = (props) => {
    const [specificBook, setSpecificBook] = useState({});
    const [bookCount, setBookCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [added, setAdded] = useState(false);
    const {bookId} = useParams();
    const {loading, error, getOneBook, clearError} = BookService();

    useEffect(() => {
        onRequest();
    }, [bookId])

    const onRequest = () => {
        clearError();
        getOneBook(+bookId)
            .then(onBookLoaded)
    }

    const onBookLoaded = (specificBook) => {
        setSpecificBook(specificBook);
        setTotalPrice(specificBook.price);
    }

    const onChangeCount = (e) => {
        let changedValue = +e.target.value;
        if (changedValue > 42) return;
        const calcPrice = +((changedValue*specificBook.price).toFixed(2));
        setBookCount(changedValue);
        setTotalPrice(calcPrice);
    }
    
    const errorMessage = error || specificBook.length === 0 ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    const {author, description, image, price, title, id} = specificBook;
    const btnCondition = (added || (loading || error)) || bookCount <= 0;

    return(
        <div className="specificBook">
            <div className="specificBook__book-cover">
                {errorMessage}
                {spinner}
                {!(loading || error) ? <img className="specificBook__img"
                    src={image || notFound} alt={title}/> : null}
            </div>
            <div className="specificBook__book-info plain fs16">
                <ul>
                    <li>
                        <h3 className="specificBook__book-name title fs18">{title}</h3>
                    </li>
                    <li>
                        <p className="specificBook__book-author">Author: {author}</p>
                    </li>
                    <li>
                        <p className="specificBook__book-level">Level: none</p>
                    </li>
                    <li>
                        <p className="specificBook__book-tags">Tags: none</p>
                    </li>
                </ul>
            </div>
            <div className="specificBook__book-purchase title fs18">
                <div className="specificBook__book-price">Price, $
                    <span>{price}</span>
                </div>
                <div className="specificBook__book-count">Count
                    <input type="number"
                        value={bookCount}
                        min={1}
                        max={42}
                        onChange={onChangeCount}
                        disabled={!(loading || error) ? false : true}/>
                </div>
                <div className="specificBook__book-total">Total Price, $
                    <span>{totalPrice}</span>
                </div>
                <button className="button button_orange"
                    disabled={btnCondition ? true : false}
                    onClick={() => {props.onAddToCart({id, title, bookCount, totalPrice}); setAdded(true)}}>{!added ? 'Add to Cart' : 'Added'}
                </button>
            </div>
            <div className="specificBook__book-description fs16">
                <h4 className="title">Description</h4>
                <p className="plain fs16">{description}</p>
            </div>
        </div>
    )
}

export default SpecificBook;