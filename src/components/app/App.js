import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LocalStorageService, LS_KEYS } from "../../services/LocalStorage";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import SignIn from "../signIn/SignIn";
import SpecificBook from "../specificBook/SpecificBook";
import Cart from "../cart/Cart";
import Footer from "../footer/Footer";
import BookListPage from "../pages/BookListPage";
import Page404 from "../pages/Page404";


const App = () => {

	const [authorization, setAuthorization] = useState(
		LocalStorageService.get(LS_KEYS.AUTHORIZATION) || ""
	);
	const [cartList, setCartList] = useState(
		LocalStorageService.get(LS_KEYS.CART) || []
	 );

	useEffect(() => LocalStorageService.set(LS_KEYS.CART, cartList), [cartList]);

	useEffect(() => LocalStorageService.set(LS_KEYS.AUTHORIZATION, authorization), [authorization]);	

	const onAuthorization = (username) => {
		setAuthorization(username);
	}

	const onAddToCart = (newBook) => {
		setCartList(cartList => {
			const updatedList = [...cartList, newBook];
			const oldItemIndex = cartList.findIndex(book => book.id === newBook.id);
			if (oldItemIndex >= 0) updatedList.splice(oldItemIndex, 1);
			return updatedList;
		});
	}
	
	const onDeleteItem = (id) => {
		setCartList(cartList => {
			const updatedList = [...cartList];
			const itemIndex = cartList.findIndex(book => (book.id === id));
			updatedList.splice(itemIndex, 1);
			return updatedList;
		})
	}

	const onResetCartState = () => {
		setCartList([]);
	}

	return (
		
			<div className="app">
				<Header>
					{authorization ? <Navigation 
						username={authorization} 
						onAuthorization={onAuthorization}/> : null}
				</Header>
				<main>
					<Routes>
						<Route path="/x-course-task" 
							element={<SignIn onAuthorization={onAuthorization}/>}/>
					
						<Route path="/x-course-task/books"
							element={authorization ? <BookListPage/> : <Navigate to="/x-course-task"/>}/>

						<Route path="/x-course-task/books/:bookId"
							element={authorization 
							? <SpecificBook onAddToCart={onAddToCart}/> 
							: <Navigate to="/x-course-task"/>}	/>

						<Route path="/x-course-task/cart" 
							element={authorization 
							? <Cart cart={cartList} onDeleteItem={onDeleteItem} onResetCartState={onResetCartState}/> 
							: <Navigate to="/x-course-task"/>}/>
						
						<Route path="*" element={<Page404/>}/>
					</Routes>
				</main>
				{authorization ? <Footer/> : null}
			</div>
		
	)
}

export default App;
