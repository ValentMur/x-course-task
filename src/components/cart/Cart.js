import { useState, useEffect } from "react";

import './cart.scss';
import deleteIcon from '../../assets/img/square_minus.svg';
import cartImg from '../../assets/img/cart.svg';

const Cart = (props) => {
    const [sumTotalPrice, setSumTotalprice] = useState(0);
    const {cart} = props;

    useEffect(() => {
        calcTotalSum(cart);
    }, [cart]);

    const calcTotalSum = (arr) => {
        let sum = 0;
        arr.forEach(book => {
            sum += book.totalPrice;
        })
        setSumTotalprice(+(sum.toFixed(2)));
    }
    
    function renderItems(arr) {
        const items = arr.map((item) => {     
            
            return (
                <li className="cart-list__item plain fs16" key={item.id}>
                    <div className="cart-list__book-name">
                        {item.title.length > 35 ? item.title.slice(0, 35) + '...' : item.title}
                    </div>
                    <div className="cart-list__book-count">Count: {item.bookCount}</div>
                    <div className="cart-list__book-price">Price: ${item.totalPrice}</div>
                    <button className="cart-list__book-remove">
                        <img src={deleteIcon}
                            alt="delete icon"
                            onClick={() => {props.onDeleteItem(item.id)}}/>
                    </button>
                </li>
            )
        });
        return items;
    }
    
    const items = renderItems(cart);
    const content = cart.length > 0 ? items: <EmptyContent/>;

    return(
        <div className="cart">
            <div className="cart__panel">
                <button className="button button_orange"
                        disabled={cart.length > 0? false: true}
                        onClick={() => {props.onResetCartState()}}>Purchase
                </button>
            </div>
            <ul className="cart-list">
                {content}
            </ul>
            {
                !cart.length > 0? null: 
                    <div className="cart__total-price title fs18">
                        Total price, ${sumTotalPrice}
                    </div>
            }
        </div>
    )
}

const EmptyContent = () => {
    return (
        <div className="cart-list__empty">
            <img src={cartImg} className="cart__cart-img" alt="cart"/>
            <div className="cart__txt plain fs20">There is nothing in here</div>
        </div>
    )
}


export default Cart;