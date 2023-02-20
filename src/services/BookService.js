import { useGetData } from "../hooks/useGetData";

const BookService = () => {
    const { loading, request, error, clearError } = useGetData();

    const _apiPath = 'books.json';

    const getAllBooks = async () => {
        const res = await request(`${_apiPath}`);
        return res.books;
    }

    const getOneBook = async (id) => {
        const res = await request(`../${_apiPath}`);
        return res.books.find(book => book.id === id);
    }

    return {
		loading,
		error,
		clearError,
		getAllBooks,
		getOneBook
	};
}

export default BookService;
